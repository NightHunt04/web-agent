import { createContext, useContext, useRef, useState } from "react"
import type { Message, ServerState } from "../types"

interface AgentContextType {
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    screenshot: string
    setScreenshot: React.Dispatch<React.SetStateAction<string>>
    streamDone: boolean
    setStreamDone: React.Dispatch<React.SetStateAction<boolean>>
    browserInstanceState: 'init' | 'init_done' | 'active' | 'end'
    setBrowserInstanceState: React.Dispatch<React.SetStateAction<'init' | 'init_done' | 'active' | 'end'>>
    browserInstanceUrl: string
    setBrowserInstanceUrl: React.Dispatch<React.SetStateAction<string>>
    flag: boolean
    setFlag: React.Dispatch<React.SetStateAction<boolean>>
    goBack: boolean
    setGoBack: React.Dispatch<React.SetStateAction<boolean>>
    serverState: ServerState
    setServerState: React.Dispatch<React.SetStateAction<ServerState>>
    abortControllerRef: React.RefObject<AbortController | null>
    currentIndVideo: number
    setCurrentIndVideo: React.Dispatch<React.SetStateAction<number>>
    videoRef: React.RefObject<HTMLVideoElement | null>
}

const AgentContext = createContext<AgentContextType | null>(null)

export const AgentContextProvider = ({children}: {children: React.ReactNode}) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [screenshot, setScreenshot] = useState('')
    const [streamDone, setStreamDone] = useState(false)
    const [browserInstanceState, setBrowserInstanceState] = useState<'init' | 'init_done' | 'active' | 'end'>('end')
    const [browserInstanceUrl, setBrowserInstanceUrl] = useState('')
    const [flag, setFlag] = useState(false)
    const [goBack, setGoBack] = useState(false)
    const [serverState, setServerState] = useState<ServerState>({success: false, message: 'Waking up server...'})
    const abortControllerRef = useRef<AbortController | null>(null)
    const [currentIndVideo, setCurrentIndVideo] = useState(0)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    return (
        <AgentContext value={{
            messages, setMessages, 
            screenshot, setScreenshot, 
            streamDone, setStreamDone,
            browserInstanceState, setBrowserInstanceState,
            browserInstanceUrl, setBrowserInstanceUrl,
            flag, setFlag,
            goBack, setGoBack,
            serverState, setServerState,
            abortControllerRef,
            currentIndVideo, setCurrentIndVideo,
            videoRef
        }}>
            {children}
        </AgentContext>
    )
}

export function useAgentContext() {
    const context = useContext(AgentContext)
    if (!context) {
        throw new Error("useAgentContext must be used within an AgentContextProvider")
    }
    return context
}