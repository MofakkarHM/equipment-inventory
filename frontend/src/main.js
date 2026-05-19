import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
// create the cache - one instance for the whole app
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30000, //data stays fresh for 30 seconds
            retry: 2, // retry failed requests twice before showing error
        },
    },
});
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(App, {}), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }) }));
