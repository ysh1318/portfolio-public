import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import type { MediaSlot } from '../lib/media'

interface LoopMediaProps {
  slot: MediaSlot
  aspect?: string
  opacity?: number
  hoverPlay?: boolean
  rounded?: string
  className?: string
  startTime?: number
  endTime?: number
  crossfadeDuration?: number
  objectPosition?: string
  objectFit?: 'cover' | 'contain'
}

const DISABLE_VIDEOS_FOR_DEV = false

export default function LoopMedia({
  slot,
  aspect,
  opacity = 1,
  hoverPlay = false,
  rounded = 'rounded-2xl',
  className = '',
  startTime = 0,
  endTime,
  crossfadeDuration,
  objectPosition = 'object-center',
  objectFit = 'cover',
}: LoopMediaProps) {
  const [videoFailed, setVideoFailed] = useState(DISABLE_VIDEOS_FOR_DEV)
  const [imageFailed, setImageFailed] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A')
  const [duration, setDuration] = useState(0)
  const [fadeTriggered, setFadeTriggered] = useState(false)
  const [playlistIndex, setPlaylistIndex] = useState(0)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const videoRefA = useRef<HTMLVideoElement>(null)
  const videoRefB = useRef<HTMLVideoElement>(null)
  const ratio = aspect ?? slot.aspect
  const playlist = slot.path.split('|')
  const isImage = /\.(png|jpe?g|webp|gif|avif)$/i.test(playlist[0])

  // Do not request decorative video bytes until the media is close to view.
  // This prevents below-the-fold loops from competing with the page's first render.
  useEffect(() => {
    if (isImage || DISABLE_VIDEOS_FOR_DEV) return

    const container = mediaContainerRef.current
    if (!container || !('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [isImage, slot.path])

  useEffect(() => {
    if (DISABLE_VIDEOS_FOR_DEV) return
    setVideoFailed(false)
    setImageFailed(false)
    setActiveVideo('A')
    setFadeTriggered(false)
    setDuration(0)
    setPlaylistIndex(0)
  }, [slot.path])

  useEffect(() => {
    if (crossfadeDuration && crossfadeDuration > 0) return
    const video = videoRefA.current
    if (!video || videoFailed || imageFailed || !shouldLoad) return

    const seekToStart = () => {
      if (startTime > 0 && video.currentTime < startTime) video.currentTime = startTime
    }

    video.addEventListener('loadedmetadata', seekToStart)
    if (video.readyState >= 1) seekToStart()
    return () => video.removeEventListener('loadedmetadata', seekToStart)
  }, [slot.path, startTime, crossfadeDuration, videoFailed, imageFailed, shouldLoad])

  const onLoadedMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
    setDuration(event.currentTarget.duration)
  }

  const handleTimeUpdateCrossfade = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (!duration || !crossfadeDuration || videoFailed || imageFailed || fadeTriggered) return

    if (video.currentTime >= duration - crossfadeDuration) {
      setFadeTriggered(true)
      const targetVideoRef = activeVideo === 'A' ? videoRefB : videoRefA
      const currentVideoRef = activeVideo === 'A' ? videoRefA : videoRefB
      const nextActive = activeVideo === 'A' ? 'B' : 'A'
      const nextVideo = targetVideoRef.current

      if (!nextVideo) return
      nextVideo.currentTime = startTime
      nextVideo.play().then(() => {
        setActiveVideo(nextActive)
        window.setTimeout(() => {
          const previousVideo = currentVideoRef.current
          if (previousVideo) {
            previousVideo.pause()
            previousVideo.currentTime = startTime
          }
          setFadeTriggered(false)
        }, crossfadeDuration * 1000)
      }).catch(() => setFadeTriggered(false))
    }
  }

  const handleTimeUpdateSingle = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (endTime && video.currentTime >= endTime) {
      video.currentTime = startTime
      video.play().catch(() => {})
    }
  }

  if (isImage) {
    return (
      <img
        aria-hidden="true"
        alt={slot.label}
        className={`${ratio} ${rounded} ${className} object-${objectFit} ${objectPosition}`}
        style={{ opacity }}
        src={playlist[0]}
        loading="lazy"
        decoding="async"
      />
    )
  }

  const imagePath = playlist[playlistIndex].replace(/\.mp4$/, '.webp')
  const frameClassName = `${ratio} ${rounded} ${className}`
  const videoClassName = `w-full h-full object-${objectFit} ${objectPosition}`

  if (videoFailed && imageFailed) {
    return (
      <div
        aria-hidden="true"
        className={`media-placeholder ${frameClassName} overflow-hidden flex items-center justify-center`}
        style={{ opacity }}
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 px-3 text-center leading-relaxed drop-shadow">
          {slot.label}
        </span>
      </div>
    )
  }

  if (videoFailed) {
    return (
      <img
        aria-hidden="true"
        alt={slot.label}
        className={`${ratio} ${rounded} ${className} object-${objectFit} ${objectPosition}`}
        style={{ opacity }}
        src={imagePath}
        loading="lazy"
        decoding="async"
        onError={() => setImageFailed(true)}
      />
    )
  }

  if (crossfadeDuration && crossfadeDuration > 0) {
    return (
      <div ref={mediaContainerRef} aria-hidden="true" className={`${frameClassName} overflow-hidden`} style={{ opacity }}>
        {shouldLoad && (
          <>
            <video
              ref={videoRefA}
              tabIndex={-1}
              className={`absolute inset-0 ${videoClassName} transition-opacity ease-in-out`}
              style={{ opacity: activeVideo === 'A' ? 1 : 0, transitionDuration: `${crossfadeDuration * 1000}ms` }}
              src={slot.path}
              autoPlay={activeVideo === 'A' && !hoverPlay}
              preload="none"
              muted
              playsInline
              onLoadedMetadata={onLoadedMetadata}
              onTimeUpdate={activeVideo === 'A' ? handleTimeUpdateCrossfade : undefined}
              onError={() => setVideoFailed(true)}
            />
            <video
              ref={videoRefB}
              tabIndex={-1}
              className={`absolute inset-0 ${videoClassName} transition-opacity ease-in-out`}
              style={{ opacity: activeVideo === 'B' ? 1 : 0, transitionDuration: `${crossfadeDuration * 1000}ms` }}
              src={slot.path}
              autoPlay={activeVideo === 'B' && !hoverPlay}
              preload="none"
              muted
              playsInline
              onLoadedMetadata={onLoadedMetadata}
              onTimeUpdate={activeVideo === 'B' ? handleTimeUpdateCrossfade : undefined}
              onError={() => setVideoFailed(true)}
            />
          </>
        )}
      </div>
    )
  }

  return (
    <div ref={mediaContainerRef} aria-hidden="true" className={frameClassName} style={{ opacity }}>
      {shouldLoad && (
        <video
          ref={videoRefA}
          tabIndex={-1}
          className={videoClassName}
          src={playlist[playlistIndex]}
          autoPlay={!hoverPlay}
          preload="none"
          loop={playlist.length === 1 && !endTime && !hoverPlay}
          muted
          playsInline
          onMouseEnter={(event) => hoverPlay && event.currentTarget.play()}
          onMouseLeave={(event) => hoverPlay && event.currentTarget.pause()}
          onTimeUpdate={handleTimeUpdateSingle}
          onPlay={(event) => {
            if (startTime > 0 && event.currentTarget.currentTime < startTime) event.currentTarget.currentTime = startTime
          }}
          onEnded={playlist.length > 1 ? () => setPlaylistIndex((previous) => (previous + 1) % playlist.length) : undefined}
          onError={() => setVideoFailed(true)}
        />
      )}
    </div>
  )
}
