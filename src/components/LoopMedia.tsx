import { useState, useEffect, useRef } from 'react'
import type { MediaSlot } from '../lib/media'

interface LoopMediaProps {
  slot: MediaSlot
  /** Tailwind aspect-ratio class; defaults to the slot's own ratio. */
  aspect?: string
  /** 0–1. Matches the opacity called for in the design spec. */
  opacity?: number
  /** Only play on hover (used for project-card cover loops). */
  hoverPlay?: boolean
  rounded?: string
  className?: string
  /** Custom loop start time in seconds (for programmatic trimming). */
  startTime?: number
  /** Custom loop end time in seconds (for programmatic trimming). */
  endTime?: number
  /** Crossfade duration in seconds between loop transitions. */
  crossfadeDuration?: number
  /** CSS/Tailwind class for video alignment, e.g., 'object-bottom'. Defaults to 'object-center'. */
  objectPosition?: string
  /** object-fit CSS property; defaults to 'cover'. */
  objectFit?: 'cover' | 'contain'
}

/**
 * Renders a looping decorative video for a given media slot.
 * Supports standard looping, startTime/endTime trimming, and smooth crossfaded loops.
 */
// Set this to true to stop all video playback and CPU/GPU utilization during development.
// Set back to false to enable production video loops.
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
  const ratio = aspect ?? slot.aspect

  // Crossfade state
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A')
  const videoRefA = useRef<HTMLVideoElement>(null)
  const videoRefB = useRef<HTMLVideoElement>(null)
  const [duration, setDuration] = useState<number>(0)
  const [fadeTriggered, setFadeTriggered] = useState(false)

  // Playlist support
  const playlist = slot.path.split('|')
  const [playlistIndex, setPlaylistIndex] = useState(0)

  // Reset error/crossfade states whenever the slot path changes
  useEffect(() => {
    if (DISABLE_VIDEOS_FOR_DEV) return // keep videos disabled
    setVideoFailed(false)
    setImageFailed(false)
    setActiveVideo('A')
    setFadeTriggered(false)
    setDuration(0)
    setPlaylistIndex(0)
  }, [slot.path])

  // Single-video trim initial seek
  useEffect(() => {
    if (crossfadeDuration && crossfadeDuration > 0) return
    const video = videoRefA.current
    if (!video || videoFailed || imageFailed) return

    const handleLoadedMetadata = () => {
      if (startTime > 0 && video.currentTime < startTime) {
        video.currentTime = startTime
      }
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    if (video.readyState >= 1 && startTime > 0 && video.currentTime < startTime) {
      video.currentTime = startTime
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [slot.path, startTime, crossfadeDuration, videoFailed, imageFailed])

  const onLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration)
  }

  // Crossfade transition timeupdate check
  const handleTimeUpdateCrossfade = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (!duration || !crossfadeDuration || videoFailed || imageFailed) return

    const triggerTime = duration - crossfadeDuration
    if (video.currentTime >= triggerTime && !fadeTriggered) {
      setFadeTriggered(true)

      const targetVideoRef = activeVideo === 'A' ? videoRefB : videoRefA
      const currentVideoRef = activeVideo === 'A' ? videoRefA : videoRefB
      const nextActive = activeVideo === 'A' ? 'B' : 'A'

      const nextVideo = targetVideoRef.current
      if (nextVideo) {
        nextVideo.currentTime = startTime
        nextVideo.play().then(() => {
          setActiveVideo(nextActive)
          setTimeout(() => {
            const prevVideo = currentVideoRef.current
            if (prevVideo) {
              prevVideo.pause()
              prevVideo.currentTime = startTime
            }
            setFadeTriggered(false)
          }, crossfadeDuration * 1000)
        }).catch(() => {
          setFadeTriggered(false)
        })
      }
    }
  }

  // Single-video trim timeupdate check
  const handleTimeUpdateSingle = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (endTime && video.currentTime >= endTime) {
      video.currentTime = startTime
      video.play().catch(() => {})
    }
  }

  const handlePlaySingle = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (startTime > 0 && video.currentTime < startTime) {
      video.currentTime = startTime
    }
  }

  // If the slot is already an image format, render directly — skip all video logic
  const isImage = /\.(png|jpe?g|webp|gif|avif)$/i.test(playlist[0])
  if (isImage) {
    return (
      <img
        aria-hidden="true"
        alt={slot.label}
        className={`${ratio} ${rounded} ${className} object-${objectFit} ${objectPosition}`}
        style={{ opacity }}
        src={playlist[0]}
      />
    )
  }
  // Fallback image path for regular video slots
  const imagePath = playlist[playlistIndex].replace(/\.mp4$/, '.webp')

  if (videoFailed && imageFailed) {
    const isAbsoluteOrFixed = className.includes('absolute') || className.includes('fixed')
    return (
      <div
        aria-hidden="true"
        className={`media-placeholder ${ratio} ${rounded} ${className} ${isAbsoluteOrFixed ? '' : 'relative'} overflow-hidden flex items-center justify-center`}
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
        onError={() => setImageFailed(true)}
      />
    )
  }


  // RENDER DUAL CROSSFADE VIDEO IF PROP IS ACTIVE
  if (crossfadeDuration && crossfadeDuration > 0) {
    const isAbsoluteOrFixed = className.includes('absolute') || className.includes('fixed')
    return (
      <div
        aria-hidden="true"
        className={`${ratio} ${rounded} ${className} ${isAbsoluteOrFixed ? '' : 'relative'} overflow-hidden`}
        style={{ opacity }}
      >
        <video
          ref={videoRefA}
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity ease-in-out ${objectPosition}`}
          style={{
            opacity: activeVideo === 'A' ? 1 : 0,
            transitionDuration: `${crossfadeDuration * 1000}ms`,
          }}
          src={slot.path}
          autoPlay={activeVideo === 'A' && !hoverPlay}
          muted
          playsInline
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={activeVideo === 'A' ? handleTimeUpdateCrossfade : undefined}
          onError={() => setVideoFailed(true)}
        />
        <video
          ref={videoRefB}
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity ease-in-out ${objectPosition}`}
          style={{
            opacity: activeVideo === 'B' ? 1 : 0,
            transitionDuration: `${crossfadeDuration * 1000}ms`,
          }}
          src={slot.path}
          autoPlay={activeVideo === 'B' && !hoverPlay}
          muted
          playsInline
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={activeVideo === 'B' ? handleTimeUpdateCrossfade : undefined}
          onError={() => setVideoFailed(true)}
        />
      </div>
    )
  }

  const handleEnded = () => {
    setPlaylistIndex((prev) => (prev + 1) % playlist.length)
  }

  // RENDER STANDARD VIDEO (OR SINGLE-TRIM VIDEO)
  return (
    <video
      ref={videoRefA}
      aria-hidden="true"
      tabIndex={-1}
      className={`${ratio} ${rounded} ${className} object-${objectFit} ${objectPosition}`.trim()}
      style={{ opacity }}
      src={playlist[playlistIndex]}
      autoPlay={!hoverPlay}
      loop={playlist.length === 1 && !endTime && !hoverPlay}
      muted
      playsInline
      onMouseEnter={(e) => hoverPlay && e.currentTarget.play()}
      onMouseLeave={(e) => hoverPlay && e.currentTarget.pause()}
      onTimeUpdate={handleTimeUpdateSingle}
      onPlay={handlePlaySingle}
      onEnded={playlist.length > 1 ? handleEnded : undefined}
      onError={() => setVideoFailed(true)}
    />
  )
}



