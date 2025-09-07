import axios from "axios"

interface Response {
    status: string
    ready?: boolean
    browser_instances?: Record<string, string>
}

export async function wakeUpServer() {
    try {
        const res = await axios.get<Response>(import.meta.env.VITE_BACKEND_HOST)

        if (res.data.status === 'ok' && res.data.browser_instances?.['https://playwright-browser-instance-1.onrender.com/'] === 'Running' && res.data.browser_instances?.['https://playwright-browser-instance.onrender.com/'] === 'Running') {
            return { success: true, message: "Server is running and ready" }
        }

        return { success: false, message: "Server is not running" }
        // const res = await Promise.all([
        //     axios.get<Response>(import.meta.env.VITE_BACKEND_HOST), 
        //     axios.get<Response>(import.meta.env.VITE_BROWSER_URL_1),
        //     axios.get<Response>(import.meta.env.VITE_BROWSER_URL_2),
        // ])

        // if (res.some(r => r.data?.status !== "ok")) {
        //     return { success: false, message: "Server is not running" }
        // }

        // return new Promise<{ success: boolean; message: string }>((resolve) => {
        //     const timeInter = setInterval(async () => {
        //       try {
        //         console.log('pinging browser instances')
        //         const browserRes = await Promise.all([
        //           axios.get<Response>(import.meta.env.VITE_BROWSER_URL_1),
        //           axios.get<Response>(import.meta.env.VITE_BROWSER_URL_2),
        //         ])

        //         console.log(browserRes[0].data)
        //         console.log(browserRes[1].data)
      
        //         if (browserRes[0].data?.ready && browserRes[1].data?.ready) {
        //           clearInterval(timeInter)
        //           resolve({ success: true, message: "Server is running and ready" })
        //         }
        //       } catch {
                
        //       }
        //     }, 5000)
        // })
    } catch (err) {
        return { success: false, message: "Failed to wake up server" }
    }
}