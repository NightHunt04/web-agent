import { Route, Routes } from "react-router-dom"
import Land from "./components/Land"
import Prompt from "./components/Prompt"
import Header from "./components/Header"
import Agent from "./components/Agent"
import Docs from "./components/Docs"
import Repo from "./components/Repo"
import { useAgentContext } from "./context/AgentContext"
import { useEffect } from "react"
import { wakeUpServer } from "./utils/wakeUpServer"

function App() {
    const context = useAgentContext()
    const coldStart = async () => {
        const { success, message } = await wakeUpServer()
        context?.setServerState({success, message})
    }

    useEffect(() => {
        console.log(`Humpty Dumpty sat on a wall, \nHumpty Dumpty had a great fall, \nAll the king's horses and all the king's men couldn't put Humpty together again.`)
        coldStart()
    }, [])

  return (
    <div className='min-h-screen w-full bg-neutral-900 font-kode text-white flex flex-col items-center justify-start'>
      <Header />

      <div className="flex-1 w-full flex items-start justify-center">
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/agent/:uuid" element={<Agent />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/repo" element={<Repo />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
