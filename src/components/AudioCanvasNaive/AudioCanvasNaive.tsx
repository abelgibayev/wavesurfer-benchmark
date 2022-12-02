
import { FC, useEffect, useRef, useState } from "react";
import WaveSurfer from 'wavesurfer.js'

interface Props {
  url: string;
}

export const AudioCanvasNaive: FC<Props> = ({ url }) => {
  const waveRef = useRef<WaveSurfer>()
  const container = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState({ startTime: (new Date()).getTime(), timerValue: 0 })

  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (container.current && !waveRef.current) {
        waveRef.current = WaveSurfer.create({
          container: container.current,
          waveColor: 'violet',
          progressColor: 'purple',
        });
  
        waveRef.current.on('ready', () => {
          clearInterval(interval)
          setIsLoading(false)
        })

        setTimer(() => ({ startTime: (new Date()).getTime(), timerValue: 0 }))
        interval = setInterval(() => setTimer(value => ({
          ...value,
          timerValue: (new Date()).getTime() - value.startTime
        })), 1)
        waveRef.current.load(url)
        setIsLoading(true)
      }
  }, [url])


  return <> 
    <div>
      Ready to play audio: {timer.timerValue} ms
    </div>
    <div ref={container} />
    <button onClick={() => waveRef.current?.play()}>
      play
    </button>
    <button onClick={() => waveRef.current?.pause()}>
      pause
    </button>
  </>
}