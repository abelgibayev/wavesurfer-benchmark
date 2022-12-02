import { FC, useEffect, useRef, useState } from "react";
import WaveSurfer from 'wavesurfer.js'

interface Props {
  url: string;
  peaksUrl: string;
}

export const AudioCanvas: FC<Props> = ({ url, peaksUrl }) => {
  const waveRef = useRef<WaveSurfer>()
  const container = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState({ startTime: (new Date()).getTime(), timerValue: 0 })

  useEffect(() => {
    
      let peaks: any;
      let interval: NodeJS.Timeout;
      try {
        setTimer(() => ({ startTime: (new Date()).getTime(), timerValue: 0 }))
        fetch(peaksUrl).then(res => res.json()).then(value => {
          peaks = value
          if (container.current && !waveRef.current) {
            waveRef.current = WaveSurfer.create({
              container: container.current,
              waveColor: 'violet',
              progressColor: 'purple',
              backend: 'MediaElementWebAudio'
            });
      
            waveRef.current.on('ready', () => {
              clearInterval(interval)
              setIsLoading(false)
              waveRef.current?.play()
            })
      
            let max = peaks.data[0]
      
            for (let i = 0; i < peaks.data.length; ++i) {
              max = max < peaks.data[i] ? peaks.data[i] : max
            }
      
            const normalizedPeaks = peaks.data.map((el: number) => el / max)
      
            const myAudio = new Audio(url);
            myAudio.crossOrigin = 'anonymous';

            interval = setInterval(() => setTimer(value => ({
              ...value,
              timerValue: (new Date()).getTime() - value.startTime
            })), 1)
            waveRef.current.load(myAudio, normalizedPeaks)
            setIsLoading(true)
          }
        })
      } catch {}
  }, [url, peaksUrl])


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