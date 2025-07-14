"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState, useRef } from "react"
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

const thumbnails = [
  "/thumbnails/thumbnail_1.png",
  "/thumbnails/thumbnail_2.png",
  "/thumbnails/thumbnail_3.png",
  "/thumbnails/thumbnail_6.png",
  "/thumbnails/thumbnail_4.png",
  "/thumbnails/thumbnail_7.png",
  "/thumbnails/thumbnail_8.png",
]

const videoUrls = [
  "/videos/corousel_vid1.mp4",
  "/videos/corousel_vid2.mp4",
  "/videos/corousel_vid3.mp4",
  "/videos/corousel_vid4.mp4",
  "/videos/corousel_vid6.mp4",
  "/videos/corousel_vid_1.mp4",
  "/videos/corousel_vid8.mp4",
].map(url => ({
  high: url,
  low: url.replace('.mp4', '-low.mp4')
}));

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
    videoUrls: { high: string; low: string }[]
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
                alt={`keyword_${i} ${imgUrl}`}
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
  const controls = useAnimation()
  const [isBuffering, setIsBuffering] = useState(true);
  const [isMobile] = useState(() => window.innerWidth < 768);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cards = useMemo(() => thumbnails, [])

  const preloadVideo = (index: number) => {
    const video = new Audio();
    video.preload = 'metadata';
    video.src = isMobile ? videoUrls[index].low : videoUrls[index].high;
  };
  
  const handleClick = (imgUrl: string, index: number) => {
    setActiveImg(imgUrl)
    setActiveIndex(index)
    setIsCarouselActive(false)
    setIsPlaying(true) // Set playing to true immediately
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setActiveIndex(null)
    setIsCarouselActive(true)
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing the modal
    const video = e.currentTarget as HTMLVideoElement;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
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
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <video
                ref={videoRef}
                src={isMobile ? 
                  videoUrls[activeIndex % videoUrls.length].low : 
                  videoUrls[activeIndex % videoUrls.length].high
                }
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
                }}
                playsInline
                autoPlay
                preload="auto"
                onClick={handleVideoClick}
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                controls={false}
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => {
                  setIsBuffering(false);
                  // Preload next video
                  const nextIndex = (activeIndex + 1) % videoUrls.length;
                  preloadVideo(nextIndex);
                }}
                onError={(e) => {
                  console.error('Video Error:', e);
                  setIsBuffering(false);
                }}
              />
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
          videoUrls={videoUrls}
        />
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel };