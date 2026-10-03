import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC =
  '/hero.mp4';
const FRAME_CACHE_MAX = 90;
const FRAME_CACHE_MIN = 24;
const FRAME_CACHE_WIDTH = 960;

function waitForVideoEvent(video: HTMLVideoElement, eventName: 'loadedmetadata', timeoutMs: number) {
  return new Promise<void>((resolve, reject) => {
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      resolve();
      return;
    }

    const timeout = window.setTimeout(() => finish(new Error('Video metadata timed out.')), timeoutMs);
    const onReady = () => finish();
    const onError = () => finish(new Error('Video metadata could not be loaded.'));

    function finish(error?: Error) {
      window.clearTimeout(timeout);
      video.removeEventListener(eventName, onReady);
      video.removeEventListener('error', onError);
      if (error) reject(error);
      else resolve();
    }

    video.addEventListener(eventName, onReady, { once: true });
    video.addEventListener('error', onError, { once: true });
  });
}

function seekVideo(video: HTMLVideoElement, time: number) {
  return new Promise<void>((resolve, reject) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && Math.abs(video.currentTime - time) < 0.005) {
      resolve();
      return;
    }

    const timeout = window.setTimeout(() => finish(new Error('A hero frame seek timed out.')), 5000);
    const onSeeked = () => finish();
    const onError = () => finish(new Error('The hero video could not seek to a frame.'));

    function finish(error?: Error) {
      window.clearTimeout(timeout);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      if (error) reject(error);
      else resolve();
    }

    video.addEventListener('seeked', onSeeked, { once: true });
    video.addEventListener('error', onError, { once: true });
    try {
      video.currentTime = time;
    } catch (error) {
      finish(error instanceof Error ? error : new Error('The hero video could not seek.'));
    }
  });
}

function drawCover(
  context: CanvasRenderingContext2D,
  source: CanvasImageSource,
  width: number,
  height: number,
  pixelRatio: number,
) {
  let sourceWidth = 0;
  let sourceHeight = 0;

  if (source instanceof HTMLVideoElement) {
    sourceWidth = source.videoWidth;
    sourceHeight = source.videoHeight;
  } else if (source instanceof HTMLImageElement) {
    sourceWidth = source.naturalWidth;
    sourceHeight = source.naturalHeight;
  } else if (source instanceof HTMLCanvasElement) {
    sourceWidth = source.width;
    sourceHeight = source.height;
  } else if (source instanceof ImageBitmap) {
    sourceWidth = source.width;
    sourceHeight = source.height;
  }

  if (!sourceWidth || !sourceHeight) return;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);

  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  context.drawImage(source, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

export default function ScrollVideo() {
  const visibleVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const cacheReadyRef = useRef(false);
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const [hasVideoFrame, setHasVideoFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);

  useEffect(() => {
    const visibleVideo = visibleVideoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!visibleVideo || !canvas || !context) return;

    let disposed = false;
    let extractionVideo: HTMLVideoElement | null = null;
    let cacheStartTimer = 0;
    let animationFrame = 0;
    let lastDrawnFrame = -1;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const updateTargetProgress = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current = scrollableDistance > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableDistance))
        : 0;
    };

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(viewportWidth * pixelRatio);
      canvas.height = Math.round(viewportHeight * pixelRatio);
      lastDrawnFrame = -1;
    };

    const render = () => {
      smoothedProgressRef.current +=
        (targetProgressRef.current - smoothedProgressRef.current) * 0.12;

      const frames = framesRef.current;
      if (cacheReadyRef.current && frames.length > 0) {
        const frameIndex = Math.min(
          frames.length - 1,
          Math.max(0, Math.round(smoothedProgressRef.current * (frames.length - 1))),
        );
        if (frameIndex !== lastDrawnFrame) {
          drawCover(context, frames[frameIndex], viewportWidth, viewportHeight, pixelRatio);
          lastDrawnFrame = frameIndex;
        }
      } else if (Number.isFinite(visibleVideo.duration) && visibleVideo.duration > 0 && !visibleVideo.seeking) {
        const targetTime = smoothedProgressRef.current * Math.max(0, visibleVideo.duration - 0.05);
        if (Math.abs(visibleVideo.currentTime - targetTime) > 0.04) {
          try {
            visibleVideo.currentTime = targetTime;
          } catch {
            // Keep the loaded first frame visible if a browser refuses a seek.
          }
        }
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const extractFrameCache = async () => {
      extractionVideo = document.createElement('video');
      extractionVideo.muted = true;
      extractionVideo.playsInline = true;
      extractionVideo.preload = 'auto';
      extractionVideo.src = VIDEO_SRC;
      extractionVideo.load();

      const createdFrames: ImageBitmap[] = [];
      try {
        await waitForVideoEvent(extractionVideo, 'loadedmetadata', 20000);
        if (disposed) return;

        const duration = extractionVideo.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;

        const frameCount = Math.max(
          FRAME_CACHE_MIN,
          Math.min(FRAME_CACHE_MAX, Math.round(duration * 12)),
        );
        const usableDuration = Math.max(0, duration - 0.05);
        const resizeFactor = Math.min(1, FRAME_CACHE_WIDTH / extractionVideo.videoWidth);
        const resizeWidth = Math.max(1, Math.round(extractionVideo.videoWidth * resizeFactor));
        const resizeHeight = Math.max(1, Math.round(extractionVideo.videoHeight * resizeFactor));

        for (let index = 0; index < frameCount; index += 1) {
          if (disposed) break;
          const time = frameCount === 1 ? 0 : (usableDuration * index) / (frameCount - 1);
          await seekVideo(extractionVideo, time);
          if (disposed) break;
          const frame = await createImageBitmap(extractionVideo, {
            resizeWidth,
            resizeHeight,
            resizeQuality: 'high',
          });
          createdFrames.push(frame);
        }

        if (disposed) {
          createdFrames.forEach((frame) => frame.close());
          return;
        }

        if (createdFrames.length > 0) {
          framesRef.current = createdFrames;
          cacheReadyRef.current = true;
          setCacheReady(true);
          lastDrawnFrame = -1;
        }
      } catch {
        createdFrames.forEach((frame) => frame.close());
        // The visible video remains the seek-driven fallback when frame extraction is unavailable.
      }
    };

    const onVisibleVideoData = () => {
      setHasVideoFrame(true);
      window.clearTimeout(cacheStartTimer);
      cacheStartTimer = window.setTimeout(() => {
        if (!disposed) void extractFrameCache();
      }, 300);
    };

    visibleVideo.addEventListener('loadeddata', onVisibleVideoData);
    if (visibleVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) onVisibleVideoData();

    updateTargetProgress();
    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      updateTargetProgress();
      resizeCanvas();
    });
    resizeObserver.observe(document.documentElement);
    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.clearTimeout(cacheStartTimer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', resizeCanvas);
      visibleVideo.removeEventListener('loadeddata', onVisibleVideoData);
      resizeObserver.disconnect();
      framesRef.current.forEach((frame) => frame.close());
      framesRef.current = [];
      if (extractionVideo) {
        extractionVideo.pause();
        extractionVideo.removeAttribute('src');
        extractionVideo.load();
      }
    };
  }, []);

  const posterVisible = !hasVideoFrame && !cacheReady;
  const videoVisible = hasVideoFrame && !cacheReady;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
      <img
        src="/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${posterVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <video
        ref={visibleVideoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${cacheReady ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
