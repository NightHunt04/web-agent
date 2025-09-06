export default function Docs() {
  return (
    <div className="w-full flex flex-col px-5 py-3 gap-3 md:px-10 items-center justify-center">
        <div className="flex flex-col items-start justify-start w-full gap-1">
            <p className="text-xl font-bold">Documentation (short & high lvl, i tried..)</p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-5 md:gap-16">
            <div className="w-full flex items-start justify-start flex-col gap-5">
                <div className="w-full">
                    <p className="font-semibold text-blue-500 text-lg">What is Web Agent?</p>
                    <p className="text-neutral-300 text-sm">Web Agent consists of LLM along with headless browser and tools to execute some operations on that browser. You can think of it as a virtual assistant which can perform tasks on the web.</p>
                </div>

                <div className="w-full text-sm text-neutral-300">
                    <p className="font-semibold text-blue-500 text-lg">How it works?</p>
                    <p className="mb-3">There are different logic through which this can be made. There are two main parts, one is LLM which generates the plan and decides what tool to use and other is the browser on which that plan is executed.</p>
                    <p className="mb-3">In this, <a href="https://langchain-ai.github.io/langgraph/concepts/why-langgraph/" target="_blank" className="text-blue-500 underline hover:underline">langgraph</a> is used to orchestrate the LLM and browser. This allows the iterative process of generating the plan and executing it. Check out the docs of <a href="https://langchain-ai.github.io/langgraph/" target="_blank" className="text-blue-500 underline hover:underline">langgraph</a> for more.</p>
                    <p className="mb-3">Through langgraph, a simple graph has been created (a graph represents the flow of the program). This graph has two main parts, one is LLM part which calls the LLM along with a state passed to the LLM which contains the information regarding the task and actions it took earlier to make the agent more persistent and other is tool part where we define the tools which performs some actions on the browser.</p>
                    <p className="mb-2 mt-5 italic text-center">Below is the graph representing the flow of the web agent.</p>
                    <div className="w-full flex flex-col md:flex-row items-start justify-start mt-1 gap-3">
                        <img src="/assets/graph.png" alt="graph" className="w-72 mx-auto md:mx-0 h-auto object-cover rounded-md" />
                        <div className="w-full flex flex-col items-start justify-start gap-4">
                            <p><span className="font-semibold text-green-500">model_node:</span> This node calls the LLM and passes the state to it, state such as previous actions i.e. tools, tool response, page state i.e. DOM's current interactive elements, etc.</p>
                            <p><span className="font-semibold text-green-500">tool_node:</span> This node calls the tools as per the LLM's response from model_node, the response consists of which tool to be called, arguments for that tool and from that data we write a logic to programmatically call that tool along with those args in this node.</p>
                            <p><span className="font-semibold text-green-500">output_node:</span> This node is the final node which is called if the LLM decides that it's task is finished, it just prints the final response of the LLM that could be in JSON format or just a summary or something else.</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-full flex items-start justify-start flex-col gap-2">
                <div className="w-full text-sm text-neutral-300">
                    <p className="font-semibold text-blue-500 text-lg">How is the browser being controlled?</p>
                    <p className="mb-2">This is using <a href="https://playwright.dev/python/docs/intro" target="_blank" className="text-blue-500 underline hover:underline">Playwright</a> to control the browser. In this platform, a deployed instance of a headless chromium browser is used via a secured WebSocket connection.</p>
                    <p className="mb-2">Now as the connection has been established (in the provided repo, you can either connect to a ws (WebSocket) endpoint or can use it locally with headless or without headless mode of chromium, edge or firefox), we can control the browser through the WebSocket connection. This can be done by using the Playwright's provided apis to perform actions on the browser.</p>
                    <p className="mb-2">In this platform, once the user is connected to a browser instance through WebSocket connection, at every iteration of task, a screenshot is taken and sent via stream in base64, so the page you see is the actual page of the browser as an image but not the actual html of the page. </p>
                    <p className="mb-2">Under the hood, Playwright communicates with browsers using their native debugging protocols. For Chromium-based browsers, it uses the Chrome DevTools Protocol (CDP). CDP is a JSON-based protocol: the client sends commands encoded as JSON messages over a WebSocket, the browser executes those commands, and then responds with JSON messages (or emits events). This allows Playwright to control and automate browser behavior.</p>
                    <p className="mb-2">The commands and json message over WebSocket is abstracted by Playwright's apis and we don't need to worry about it. So, now we only write the tools i.e. methods which takes some agrs or no args and uses Playwright's apis to perform actions on the browser. These tools are then given as a list to the LLM telling it that it can use these tools to perform actions on the browser. We also define the way the LLM must respond in order to extract the tool which is to be called and the args which are to be passed. Tool node does the job of calling the tool as per the LLM's response.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
