// export enum MessageType {
//     BROWSER_INIT = "browser_init",
//     AGENT_START = "agent_start",
//     ITERATION = "iteration",
//     THOUGHT = "thought",
//     TOOL_CALL = "tool_call",
//     TOOL_RESPONSE = "tool_response",
//     SCREENSHOT = "screenshot",
//     TEXT_OUTPUT = "text_output",
//     JSON_OUTPUT = "json_output",
//     RESULT_OUTPUT = "result_output",
//     ERROR_OUTPUT = "error_output",
//     CANCELLED = "cancelled",
//     ERROR = "error",
//     DONE = "done"
// }

export interface ServerState {
    success: boolean
    message: string
}

export interface Message {
    type: "browser_init" | "browser_init_done" | "agent_start" | "iteration" | "thought" | "tool_call" | "tool_response" | "screenshot" | "text_output" | "json_output" | "result_output" | "error_output" | "cancelled" | "error" | "done" | "abort" | "url"
    data: any
}