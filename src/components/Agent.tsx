import { Activity, Chromium, SquareX } from "lucide-react"
import { useAgentContext } from "../context/AgentContext"
import { useEffect, useRef, useState } from "react"
import type { Message } from "../types"

export default function Agent() {
    const context = useAgentContext()
    const scrollDown = useRef<HTMLDivElement>(null)
    // const [showVid, setShowVid] = useState(false)
    const [isAborted, setIsAborted] = useState(false)
    // const videos = ['/assets/v1.mp4', '/assets/v2.mp4']

    // const handleEnded = () => {
    //     context?.setCurrentIndVideo(prev => (prev + 1) % videos.length)
    // }

    function getSimpleDateTime(): string {
        const now = new Date()
      
        const date = now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
      
        const time = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      
        return `${date}, ${time}`
    }

    function handleAbort () {
        if (context?.abortControllerRef.current) {
            context.abortControllerRef.current.abort()
            context.abortControllerRef.current = null
            context?.setMessages(prev => [...prev, { type: 'abort', data: 'Agent aborted' } as Message])
            setIsAborted(true)
        }
    }
      
    // useEffect(() => {
    //     if (context?.serverState.success) setShowVid(true)
    // }, [context?.serverState.success])
      
    useEffect(() => {
        scrollDown.current?.scrollIntoView({ behavior: "smooth" })
    }, [context?.messages])

  return (
    <div className="w-full h-[87vh] px-5 md:px-10 flex relative items-center justify-center">
        {/* {!showVid && <div className="fixed z-30 inset-0 bg-black/80 flex flex-col items-center justify-center gap-5">
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
            <p className="text-sm text-neutral-300">{context?.serverState.message}</p>
            </div>} */}
        <div className="w-full h-full flex flex-col md:flex-row overflow-hidden items-center justify-center gap-2 md:gap-3 mt-1 md:mt-3">
            <div className="w-full shadow-lg flex flex-col items-start justify-start rounded-md h-full relative border border-neutral-800">
                <div className="p-2 w-full text-center border-b border-neutral-800">
                    <p className="p-1 text-xs rounded-md bg-neutral-800/70">{context?.browserInstanceUrl ? context?.browserInstanceUrl.length < 150 ? context?.browserInstanceUrl : context?.browserInstanceUrl.slice(0, 150) + '...' : 'blank:page'}</p>
                </div>
                {/* browser ss */}
                <div className="w-full p-2 overflow-hidden flex-1 flex items-center justify-center bg-neutral-800/40">
                    {!context?.screenshot && <img src="/assets/br.png" alt="browser image" className="w-[70%] md:w-[35%] rounded-md object-cover my-auto mx-auto h-auto" />}
                    {context?.screenshot && <img src={`data:image/png;base64,${context?.screenshot}`} alt="" className="w-full mx-auto rounded-md h-auto object-cover" />}
                </div>
                <div className="w-full flex items-center justify-between p-2.5 z-10 border-t border-neutral-800">
                    <p className="text-xs text-neutral-400 rounded-md flex items-center justify-center gap-1"><Chromium className="w-3 h-3" /> Browser Instance</p>
                    <div className="flex items-center justify-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${context?.browserInstanceState === 'active' ? 'bg-green-500' : context?.browserInstanceState === 'init' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <p className="text-xs text-neutral-400">{context?.browserInstanceState === 'init' ? 'Initializing' : context?.browserInstanceState === 'init_done' ? 'Initialized' : context?.browserInstanceState === 'active' ? 'Active' : 'Ended'}</p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[50%] shadow-lg flex relative h-full flex-col bg-black rounded-md items-start justify-start overflow-hidden gap-2">
                <div className="w-full h-full text-xs flex flex-col mask-b-from-95% mask-t-from-95% items-start justify-start gap-2 overflow-x-hidden overflow-y-auto p-5">
                    {context?.messages.length > 0 && context?.messages.map((msg, index) => {
                        if (msg.type === 'browser_init')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className=" text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="md:text-sm font-semibold text-orange-500 flex items-center gap-1 w-full"><Chromium className="w-3 h-3" /> {msg.data}</p>
                                </div>
                            )
                        
                        if (msg.type === 'browser_init_done')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm font-semibold text-green-500 flex items-center gap-1 w-full"><Chromium className="w-3 h-3" /> {msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'agent_start')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm font-semibold text-blue-500 flex items-center gap-1 w-full"><Activity className="w-3 h-3" /> {msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'iteration')
                            return (
                                <div key={index} className="flex text-xs flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-white italic flex items-center gap-1">Iteration: {msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'thought')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start w-full">
                                    <p className="text-xs font-semibold text-neutral-300">Agent Thought:</p> 
                                    <p className="text-sm text-cyan-300 flex items-start justify-start gap-1">{msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'tool_call')
                            return (
                                <div key={index} className="flex flex-col items-start text-sm mb-2 justify-start w-full">
                                    <p className="text-xs font-semibold text-neutral-300">Executing Tool:</p> 
                                    <p className="text-yellow-300">Tool Name: {msg.data.name}</p>
                                    <p className="text-yellow-300">Tool Args:</p>
                                    <p className="text-yellow-300 text-xs flex items-start justify-start gap-1 p-2 rounded-md bg-neutral-800/40">{JSON.stringify(msg.data.args, null, 2)}</p>
                                </div>
                            )

                        if (msg.type === 'tool_response')
                            return (
                                <div key={index} className="flex flex-col items-start text-sm mb-2 justify-start w-full">
                                    <p className="text-xs font-semibold text-neutral-300">Tool Response:</p> 
                                    <p className="text-green-500 text-xs flex items-start whitespace-pre-wrap break-words justify-start gap-1 p-2 rounded-md bg-neutral-800/70 max-w-full overflow-x-auto">
                                        {typeof msg.data === 'string' 
                                            ? msg.data 
                                            : JSON.stringify(msg.data, null, 2)}</p>
                                </div>
                            )

                        if (msg.type === 'text_output')
                            return (
                                <div key={index} className="flex flex-col items-start text-sm mb-2 justify-start w-full">
                                    <p className="text-xs font-semibold text-neutral-300">Final Output:</p> 
                                    <p className="text-sm text-white/90 p-2 rounded-md bg-neutral-800/40 flex items-center gap-1">{msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'json_output')
                            return (
                                <div key={index} className="flex flex-col items-start text-sm mb-2 justify-start w-full">
                                    <p className="text-xs font-semibold text-neutral-300">JSON Output:</p> 
                                    <p className="text-xs text-white/90 p-2 rounded-md bg-neutral-800/60 flex items-center gap-1 overflow-x-auto whitespace-pre-wrap">{JSON.stringify(msg.data, null, 2)}</p>
                                </div>
                            )

                        if (msg.type === 'result_output')
                            return (
                                <div key={index} className="flex flex-col items-start text-sm mb-2 justify-start w-full">
                                    <p className="text-xs font-semibold text-neutral-300">Result Output:</p> 
                                    <p className="text-xs text-white/90 p-2 rounded-md bg-neutral-800/60 flex items-center gap-1">{msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'cancelled')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm text-red-500 rounded-md bg-neutral-800/40 flex items-center gap-1">Cancelled</p>
                                </div>
                            )
                        
                        if (msg.type === 'done')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm text-green-500 rounded-md bg-neutral-800/40 flex items-center gap-1">Task completed successfully</p>
                                </div>
                            )

                        if (msg.type === 'error')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm text-red-500 rounded-md bg-neutral-800/40 flex items-center gap-1">Error: {msg.data}</p>
                                    <p className="text-xs text-neutral-300 italic">Try again later, or if the problem persists, open an issue on GitHub</p>
                                </div>
                            )

                        if (msg.type === 'error_output')
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm text-red-500 rounded-md bg-neutral-800/40 flex items-center gap-1">Error: {msg.data}</p>
                                </div>
                            )

                        if (msg.type === 'abort') 
                            return (
                                <div key={index} className="flex flex-col items-start mb-2 justify-start gap-1 w-full">
                                    <p className="text-xs text-neutral-300">{getSimpleDateTime()}</p> 
                                    <p className="text-sm text-red-500 rounded-md bg-neutral-800/40 flex items-center gap-1">Agent aborted!</p>
                                </div>
                            )
                    })}
                    <div ref={scrollDown}></div>
                </div>
                <div className="w-full h-10 px-2 text-xs flex items-center justify-between bg-neutral-700/50">
                    <button 
                        disabled={isAborted} 
                        onClick={() => handleAbort()} 
                        className="bg-red-600/70 hover:cursor-pointer hover:bg-red-600/90 text-white rounded-md px-2 py-1 flex items-center gap-1">
                            <SquareX className="w-3 h-3" /> Abort
                    </button>
                    <p className="text-neutral-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Agent Actions</p>
                </div>
            </div>
        </div>
    </div>
  )
}
