import axios from "axios"

interface Response {
    status: string
}

export async function wakeUpServer() {
    try {
        const res = await Promise.all([
            axios.get<Response>(import.meta.env.VITE_BACKEND_HOST), 
            axios.get<Response>(import.meta.env.VITE_BROWSER_URL_1),
            axios.get<Response>(import.meta.env.VITE_BROWSER_URL_2),
        ])

        if (res[0].data.status !== 'ok' || res[1].data.status !== 'ok' || res[2].data.status !== 'ok') 
            return { success: false, message: "Server is not running" }
        return { success: true, message: "Server is running" }
    } catch (err) {
        return { success: false, message: "Failed to wake up server" }
    }
}