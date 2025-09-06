import { useEffect, useState } from "react"
import { JsonEditor } from "./JsonEditor"
import { useAgentContext } from "../context/AgentContext"
import { runAgent } from "../utils/runAgent"
import { useNavigate } from "react-router-dom"
import type { Message } from "../types"
import { CirclePlay } from 'lucide-react'

export default function Prompt() {
    const context = useAgentContext()
    const navigate = useNavigate()
    const [schema, setSchema] = useState('{\n\t"type": "object", \n\t"properties": {}, \n\t"required": []\n}')
    const [model, setModel] = useState('gemini-2.5-flash')
    const [prompt, setPrompt] = useState('')
    const [apiKey, setApiKey] = useState('AIzaSyB2W2bz6nZuLtYfaiMpOwqNOAI-fAH_CTo')
    const [temperature, setTemperature] = useState(0.4)
    const [maxTokens, setMaxTokens] = useState(19334)
    const [reasoningEfforts, setReasoningEfforts] = useState('disable')
    const [waitBetweenActions, setWaitBetweenActions] = useState(0)
    const [showVid, setShowVid] = useState(false)
    const videos = ['/assets/v1.mp4', '/assets/v2.mp4']

    const handleEnded = () => {
        context?.setCurrentIndVideo(prev => (prev + 1) % videos.length)
    }

    const startAgent = async () => {
        const uuid = crypto.randomUUID()
        context?.setMessages([])
        const abortConroller = new AbortController()
        context.abortControllerRef.current = abortConroller

        const payload = {
            uuid,
            prompt,
            scraper_schema: schema === '{\n\t"type": "object", \n\t"properties": {}, \n\t"required": []\n}' ? null : schema,
            api_key: apiKey,
            model,
            temperature,
            reasoning_efforts: reasoningEfforts,
            max_tokens: maxTokens,
            wait_between_actions: waitBetweenActions
        }

        navigate(`/agent/${uuid}`)

        runAgent(payload, msg => {
            if (msg.type === 'screenshot') context?.setScreenshot(msg.data)
            else context?.setMessages(prev => [...prev, msg as Message])

            // browser related
            if (msg.type === 'browser_init') context?.setBrowserInstanceState('init')
            if (msg.type === 'browser_init_done') context?.setBrowserInstanceState('init_done')
            if (msg.type === 'done' || msg.type === 'error' || msg.type === 'abort') context?.setBrowserInstanceState('end')
            else context?.setBrowserInstanceState('active')

            // browser instance url
            if (msg.type === 'url' && msg.data) context?.setBrowserInstanceUrl(msg.data)
        }, abortConroller.signal)
    }

    useEffect(() => {
        if (context?.serverState.success) setShowVid(false)
    }, [context?.serverState.success])

  return (
    <div className="w-full h-full flex flex-col items-center relative justify-center">
        <div className="w-full h-full mt-10 px-5 md:px-10 flex flex-col md:flex-row mb-10 items-start justify-between gap-5">
            <div className="w-full h-full flex flex-col items-start justify-start gap-7">   
                <div className="w-full">
                    <p className="font-semibold">Write the task which is to be performed by the agent</p>
                    <textarea 
                        rows={6}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full mt-1 resize-none border border-neutral-800 rounded-md text-sm outline-none p-4"
                        placeholder="e.g. Go to youtube, search for jethalal ep 01, play the video of ep 01"
                    ></textarea>
                </div>
                <div className="w-full">
                    <p className="mb-1 font-semibold">Your Gemini API key</p>
                    <p className="text-xs italic text-red-400/70">Your Gemini API key won't be stored in backend or misused or exposed anywhere guaranteed**</p>
                    <input 
                        type="password"
                        id="gemini_api_key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)} 
                        className="w-full mt-1 border border-neutral-800 rounded-md text-sm outline-none p-4" 
                        placeholder="Enter your Gemini API key" 
                    />
                </div>
                <div className="w-full">
                    <p className="font-semibold">Scraper response schema</p>
                    <p className="text-xs italic text-neutral-400 mb-1">This schema will be used to return the scraped data in the given JSON format (leave it as it is if you don't know what it is)</p>
                    <JsonEditor initialJson={schema} onChange={setSchema}  />
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start gap-3">
                <div className="w-full">
                    <p className="font-semibold">Gemini model configuration <span className="text-green-500">(optional)</span></p>
                    <p className="text-xs italic text-neutral-400 mb-1">You can configure the model here or may keep it as default</p>

                    <div className="w-full mt-3 text-sm flex flex-col items-start justify-start gap-3">
                        <div className="w-full">
                            <p>Model Selection</p>
                                <select 
                                    name="model" 
                                    id="model" 
                                    className="w-full hover:cursor-pointer mt-1 border bg-neutral-900 border-neutral-800 rounded-md text-sm outline-none p-4"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                >
                                    <option className="hover:cursor-pointer" value="gemini-2.5-flash" selected>gemini-2.5-flash (recommended)</option>
                                    <option className="hover:cursor-pointer" value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
                                    <option className="hover:cursor-pointer" value="gemini-2.5-pro">gemini-2.5-pro</option>
                                    <option className="hover:cursor-pointer" value="gemini-2.0-flash">gemini-2.0-flash</option>
                                </select>
                        </div>

                        <div className="w-full">
                            <p>Reasoning efforts</p>
                                <select   
                                    className="w-full hover:cursor-pointer mt-1 border bg-neutral-900 border-neutral-800 rounded-md text-sm outline-none p-4"
                                    value={reasoningEfforts}
                                    onChange={(e) => setReasoningEfforts(e.target.value)}
                                >
                                    <option className="hover:cursor-pointer" value="disable" selected>disable (recommended)</option>
                                    <option className="hover:cursor-pointer" value="low">low</option>
                                    <option className="hover:cursor-pointer" value="medium">medium</option>
                                    <option className="hover:cursor-pointer" value="high">high</option>
                                </select>
                        </div>

                        <div className="w-full flex items-center justify-between gap-3">
                            <div className="w-full">
                                <p>Temperature</p>
                                <input 
                                    type="number" 
                                    value={temperature}
                                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                    className="w-full mt-1 border bg-neutral-900 border-neutral-800 rounded-md text-sm outline-none p-4" 
                                />
                            </div>
                            <div className="w-full">
                                <p>Max tokens</p>
                                <input 
                                    type="number" 
                                    value={maxTokens}
                                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                                    className="w-full mt-1 border bg-neutral-900 border-neutral-800 rounded-md text-sm outline-none p-4" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <p>Wait between actions (in seconds) <span className="text-green-500">(optional)</span></p>
                    <p className="text-xs italic text-neutral-400">This is the time in seconds the agent will wait after performing an action each iteration</p>
                    <input 
                        type="number" 
                        value={waitBetweenActions}
                        onChange={(e) => setWaitBetweenActions(parseInt(e.target.value))}
                        className="w-full mt-1 border bg-neutral-900 border-neutral-800 rounded-md text-sm outline-none p-4" 
                    />
                </div>
                <button onClick={startAgent} className="w-full md:w-[30%] mt-5 px-4 py-3 flex items-center gap-2 text-center rounded-md hover:cursor-pointer hover:bg-green-500/90 transition-all bg-green-500/70 font-semibold text-white"><CirclePlay className="w-4 h-4" /> Run Agent</button>
            </div>
        </div>

        {showVid && <div className="fixed inset-0 bg-black/50 z-30 flex flex-col items-center gap-5 justify-center backdrop-blur-sm">
            <video 
                src={videos[context?.currentIndVideo ?? 0]} 
                key={videos[context?.currentIndVideo ?? 0]}
                preload="auto" 
                autoPlay
                muted 
                controls={false}
                onEnded={handleEnded} 
                ref={context?.videoRef}
                className="w-[80%] md:w-[500px] rounded-md h-auto object-cover"></video>
            <p className="text-xs italic text-center max-w-[85%] md:max-w-[500px] text-neutral-400">(video has nothing to do with anything, just to not make you bored if server is taking time to respond)</p>
            <p className="text-neutral-300 text-center text-sm">{context?.serverState.message}</p>
        </div>}
    </div>
  )
}
