"use client"
import { useSelectedIndex } from "codehike/utils/selection"

type SlideContentProps = {
  images: { url: string; alt: string; title: string }[][]
  audios: { url: string; alt: string; title: string }[][]
  assets: { url: string; alt: string; title: string }[][]
}

export const SlideContent = (props: SlideContentProps) => {
  const [selectedIndex] = useSelectedIndex()

  const images = props.images[selectedIndex]
  const audios = props.audios[selectedIndex]
  const assets = props.assets[selectedIndex]

  return (
    <div className="flex flex-col">
      <div className="mb-8 grid flex-1 grid-cols-1 flex-col justify-between gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <img
            key={image.url + index}
            src={image.url}
            style={{ animationDelay: `${index * 0.5}s` }}
            className="motion-translate-y-in-100 mb-2 aspect-video h-[264px] object-contain opacity-0"
          />
        ))}
      </div>
      <div className="mb-8 grid flex-1 grid-cols-1 flex-col justify-between gap-4 md:grid-cols-2">
        {audios.map((audio, index) => (
          <audio
            controls
            className="motion-translate-y-in-100 mb-2 mt-2 opacity-0"
          >
            <source
              type="audio/ogg"
              key={audio.url + index}
              src={audio.url}
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          </audio>
        ))}
      </div>
      <div className="mb-8 grid flex-1 grid-cols-1 flex-col justify-between gap-4 md:grid-cols-2">
        {assets.map((asset, index) => (
          <button
            key={asset.url + index}
            className="motion-translate-y-in-100 mb-2 rounded bg-secondary transition duration-500 hover:bg-secondary/75 active:bg-secondary/50"
            onClick={() => window.open(asset.url, "_blank")}
          >
            <p>Download: {asset.url}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
