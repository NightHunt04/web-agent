import type { Message } from "../types"
  
export async function runAgent(
    payload: Record<string, any>,
    onMessage: (msg: Message) => void,
    signal?: AbortSignal
) {
    const res = await fetch(import.meta.env.VITE_BACKEND_HOST + "/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
    })

    if (!res.ok) {
        onMessage({ type: "error", data: res.statusText })
    }
  
    if (!res.body) throw new Error("ReadableStream not supported")
  
    const reader = res.body.getReader()
    const decoder = new TextDecoder("utf-8")
    let buffer = ""
  
    try {
      while (true) {
          const { value, done } = await reader.read()
          if (done) break
      
          buffer += decoder.decode(value, { stream: true })
          const parts = buffer.split("\n")
          buffer = parts.pop() || ""
      
          for (const part of parts) {
              if (!part.trim()) continue
              try {
                  const msg: Message = JSON.parse(part)
                  onMessage(msg)
              } catch (err) {
                  console.error("Failed to parse stream chunk:", part, err)
              }
          }
      }
    } catch (err: any) {
        console.log('error aa gya')
      return { type: "error", data: err.message }
    } finally {
      reader.releaseLock()
    }
}
  