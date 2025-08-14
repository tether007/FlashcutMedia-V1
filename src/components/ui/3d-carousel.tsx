"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}



const videoUrls = [
  "/videos/corousel_vid1.mp4",
  "/videos/corousel_vid_2.mp4",
  "/videos/corousel_vid3.mp4",
  "/videos/corousel_vid4.mp4",
  "/videos/corousel_vid6.mp4",
  "/videos/corousel_vid_1.mp4",
  "/videos/corousel_vid8.mp4"
].map(url => ({
  url,
  fallback: url.replace('.mp4', '-fallback.mp4')
}));

const customThumbnails = [
 "/thumbnails/thumbnail_1.png",
  "/thumbnails/thumbnail_2.png",
  "/thumbnails/thumbnail_3.png",
  "/thumbnails/thumbnail_6.png",
  "/thumbnails/thumbnail_4.png",
  "/thumbnails/thumbnail_7.png",
  "/thumbnails/thumbnail_8.png",

]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    videoUrls,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
    videoUrls: string[]
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 900 : 1300
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`face-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <img
                src={imgUrl}
                alt={`thumbnail_${i}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set());
  const controls = useAnimation()
  
  // Use custom thumbnails only
  const cards = useMemo(() => customThumbnails, [])

  // Preload videos for smoother playback
  useEffect(() => {
    const preloadVideo = (src: string) => {
      if (preloadedVideos.has(src)) return;
      
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = src;
      video.load();
      
      video.addEventListener('canplaythrough', () => {
        setPreloadedVideos(prev => new Set([...prev, src]));
      });
    };

    // Preload first 3 videos for better initial experience
    videoUrls.slice(0, 3).forEach(video => preloadVideo(video.url));
  }, []);

  useEffect(() => {
    console.log("Cards loaded:", cards)
  }, [cards])

  const handleClick = (imgUrl: string, index: number) => {
    setActiveImg(imgUrl)
    setActiveIndex(index)
    setIsCarouselActive(false)
    setVideoLoaded(false)
    setIsPlaying(false) // Start with paused state until loaded
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setActiveIndex(null)
    setIsCarouselActive(true)
    setVideoLoaded(false)
    setIsPlaying(false)
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = e.currentTarget as HTMLVideoElement;
    
    if (!videoLoaded) return; // Don't allow interaction until loaded
    
    if (video.paused) {
      video.play().catch(console.error);
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setVideoLoaded(true);
    
    // Auto-play once loaded
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(console.error);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error('Video failed to load:', e);
    setVideoLoaded(true); // Still allow interaction
  };

  return (
    <div className="relative">
      <AnimatePresence mode="sync">
        {activeImg && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            transition={transitionOverlay}
          >
            <motion.div
              className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] overflow-hidden"
              style={{ aspectRatio: "9/16" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <video
                key={`video-${activeIndex}`}
                src={videoUrls[activeIndex % videoUrls.length].url}
                className="w-full h-full object-contain rounded-xl bg-black"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "250px",
                  maxHeight: "450px",
                  objectFit: "contain",
                  background: "black",
                  display: "block",
                  margin: "0 auto",
                  opacity: videoLoaded ? 1 : 0.7,
                  transition: "opacity 0.3s ease"
                }}
                playsInline
                muted={false}
                preload="auto"
                onClick={handleVideoClick}
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                controls={false}
              />
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
          videoUrls={videoUrls.map(v => v.url)}
        />
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel };