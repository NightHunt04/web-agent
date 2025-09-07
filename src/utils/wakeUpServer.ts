import axios from "axios"

interface Response {
    status: string
    ready?: boolean
}

export async function wakeUpServer() {
    try {
        const res = await Promise.all([
            axios.get<Response>(import.meta.env.VITE_BACKEND_HOST), 
            axios.get<Response>(import.meta.env.VITE_BROWSER_URL_1),
            axios.get<Response>(import.meta.env.VITE_BROWSER_URL_2),
        ])

        if (res.some(r => r.data?.status !== "ok")) {
            return { success: false, message: "Server is not running" }
        }

        return new Promise<{ success: boolean; message: string }>((resolve) => {
            const timeInter = setInterval(async () => {
              try {
                console.log('pinging browser instances')
                const browserRes = await Promise.all([
                  axios.get<Response>(import.meta.env.VITE_BROWSER_URL_1),
                  axios.get<Response>(import.meta.env.VITE_BROWSER_URL_2),
                ])

                console.log(browserRes[0].data)
                console.log(browserRes[1].data)
      
                if (browserRes[0].data?.ready && browserRes[1].data?.ready) {
                  clearInterval(timeInter)
                  resolve({ success: true, message: "Server is running and ready" })
                }
              } catch {
                
              }
            }, 5000)
        })
    } catch (err) {
        return { success: false, message: "Failed to wake up server" }
    }
}