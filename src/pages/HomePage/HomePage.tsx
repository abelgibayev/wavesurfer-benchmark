import { AudioCanvas } from "../../components/AudioCanvas";
import { AudioCanvasNaive } from "../../components/AudioCanvasNaive";
import './HomePage.css'

export const HomePage = () => {

  return <div className="wrapper">
    <div>
      With pre-coding peaks
    {/* <AudioCanvas url="https://ia801201.us.archive.org/30/items/242892MshahenSteadyLateNightRain/242892__mshahen__steady-late-night-rain.ogg" /> */}
    <AudioCanvas url={"https://audio-poc-bucket.s3.eu-central-1.amazonaws.com/sample.ogg"} peaksUrl={"https://audio-poc-bucket.s3.eu-central-1.amazonaws.com/sample.json"} />
    </div>
    <div>
      Naive
    {/* <AudioCanvas url="https://ia801201.us.archive.org/30/items/242892MshahenSteadyLateNightRain/242892__mshahen__steady-late-night-rain.ogg" /> */}
    <AudioCanvasNaive url={"https://audio-poc-bucket.s3.eu-central-1.amazonaws.com/sample.ogg"} />
    </div>
  </div>
}