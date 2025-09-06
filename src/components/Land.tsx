import Balancer from "react-wrap-balancer"
import { Globe, ClipboardCheck, Database, Sparkles } from "lucide-react"

function Land() {
  return (
    <div className='w-full flex flex-col items-center justify-start p-5 gap-5'>
      <div className="flex flex-col items-center justify-center w-full mt-10 gap-14">
        {/* Title + Demo */}
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl font-extrabold">Web Agent</h1>
          <Balancer>
            <p className="text-sm text-center text-neutral-400">
              Simple autonomous <span className="text-neutral-200 font-medium">web browsing agent</span> example
            </p>
          </Balancer>
          <div className="flex items-center justify-center gap-2 mt-2 md:mt-5 w-full md:w-[50%] border border-neutral-800 rounded-lg">
            <video
              src="/assets/demo.mp4"
              preload="auto"
              autoPlay
              loop
              muted
              controls={false}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* What is this */}
        <div className="w-full flex flex-col items-center justify-center gap-6 mt-10">
          <p className="text-2xl font-bold text-neutral-200">What is this?</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
            
            <div className="flex flex-col items-center text-center gap-5 p-4 border border-neutral-800 rounded-lg">
              <Globe className="w-7 h-7 text-neutral-200" />
              <Balancer>
                <p className="text-sm text-neutral-400">
                  A simple autonomous <span className="text-neutral-200 font-medium">web browsing agent</span>.
                </p>
              </Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-5 p-4 border border-neutral-800 rounded-lg">
              <ClipboardCheck className="w-7 h-7 text-neutral-200" />
              <Balancer>
                <p className="text-sm text-neutral-400">
                  Takes a <span className="text-neutral-200 font-medium">task prompt</span>, runs in the browser, and completes it.
                </p>
              </Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-5 p-4 border border-neutral-800 rounded-lg">
              <Database className="w-7 h-7 text-neutral-200" />
              <Balancer>
                <p className="text-sm text-neutral-400">
                  Can scrape <span className="text-neutral-200 font-medium">structured data</span> if a JSON schema is given.
                </p>
              </Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-5 p-4 border border-neutral-800 rounded-lg">
              <Sparkles className="w-7 h-7 text-neutral-200" />
              <Balancer>
                <p className="text-sm text-neutral-400">
                  Minimal, simple, and purely for <span className="font-medium text-neutral-200">demonstration</span>.
                </p>
              </Balancer>
            </div>

          </div>
        </div>

        {/* How does it work */}
        <div className="w-full flex flex-col items-center justify-center gap-6 mt-10">
          <p className="text-2xl font-bold text-neutral-200">How does it work?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            
            <div className="flex flex-col items-center text-center gap-2 p-4 border border-neutral-800 rounded-lg">
              <video src="/assets/s1.mp4" preload="auto" controls={false} autoPlay loop muted className="w-full rounded-md h-auto object-contain"></video>
              {/* <ClipboardList className="w-8 h-8 text-neutral-200" /> */}
              <p className="font-medium text-neutral-200 mt-5">1. Enter a Task</p>
              <Balancer><p className="text-sm text-neutral-400">Describe what you want the agent to do.</p></Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-2 p-4 border border-neutral-800 rounded-lg">
              <video src="/assets/s2.mp4" preload="auto" controls={false} autoPlay loop muted className="w-full rounded-md h-auto object-contain"></video>
              {/* <Key className="w-8 h-8 text-neutral-200" /> */}
              <p className="font-medium text-neutral-200 mt-5">2. Provide Gemini API Key</p>
              <Balancer><p className="text-sm text-neutral-400">Your key is private, not stored, only used for the session.</p></Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-2 p-4 border border-neutral-800 rounded-lg">
              <video src="/assets/s3.mp4" preload="auto" controls={false} autoPlay loop muted className="w-full rounded-md h-auto object-contain"></video>
              {/* <FileJson className="w-8 h-8 text-neutral-200" /> */}
              <p className="font-medium text-neutral-200 mt-5">3. (Optional) Add JSON Schema</p>
              <Balancer><p className="text-sm text-neutral-400">Scrape data in your desired structured format.</p></Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-2 p-4 border border-neutral-800 rounded-lg">
              <video src="/assets/s4.mp4" preload="auto" controls={false} autoPlay loop muted className="w-full rounded-md h-auto object-contain"></video>
              {/* <SlidersHorizontal className="w-8 h-8 text-neutral-200" /> */}
              <p className="font-medium text-neutral-200 mt-5">4. (Optional) Configure Model</p>
              <Balancer><p className="text-sm text-neutral-400">Choose low, medium, or high reasoning depth.</p></Balancer>
            </div>

            <div className="flex flex-col items-center text-center gap-2 p-4 border border-neutral-800 rounded-lg md:col-span-2">
              <video src="/assets/s5.mp4" preload="auto" controls={false} autoPlay loop muted className="w-full rounded-md h-auto object-contain"></video>
              {/* <PlayCircle className="w-8 h-8 text-neutral-200" /> */}
              <p className="font-medium text-neutral-200 mt-5">5. Run the Agent</p>
              <Balancer><p className="text-sm text-neutral-400">Watch it browse, complete the task, and return results.</p></Balancer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Land