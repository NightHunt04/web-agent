import { ArrowLeftIcon, MoveRightIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useAgentContext } from '../context/AgentContext'

export default function Header() {
    const context = useAgentContext()

    useEffect(() => {
        const endpoint = location.href.split('/')[3]
        if (endpoint === "prompt" || endpoint === "agent" || endpoint === "docs" || endpoint === "repo")
            context?.setFlag(true)
        else context?.setFlag(false)
        
        if (endpoint === "agent" || endpoint === "docs" || endpoint === "repo")
            context?.setGoBack(true)
        else context?.setGoBack(false)
    }, [location.href])

  return (
    <div className="w-full py-3 mt-2 px-5 md:px-10 flex items-center justify-between">
        <a href="/">
            <img src="/assets/CS_Rectangle_8.svg" alt="logo" className="w-7 h-7 md:w-8 md:h-8 object-cover" />
        </a>

        <div className="flex items-center text-sm justify-center gap-1 md:gap-3">
            {context?.goBack && <a href="/" className="px-2 py-1 hover:cursor-pointer flex items-center gap-1 hover:underline transition-all text-sm"><ArrowLeftIcon className="w-4 h-4" />Go back</a>}
            <a href="/docs" className="px-2 py-1 hover:cursor-pointer hover:underline transition-all text-sm">Docs</a>
            <a href="/repo" className="px-2 py-1 hover:cursor-pointer hover:underline transition-all text-sm">Repo</a>
            {!context?.flag && <a href="/prompt" className='px-2 py-1 bg-green-500/40 rounded-md flex items-center gap-1 hover:cursor-pointer hover:bg-green-500/60 transition-all'>Get Started<MoveRightIcon className="mt-0.5 w-4 h-4" /></a>}
        </div>
    </div>
  )
}
