import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5,
		},
	},
});

root.render(
	<QueryClientProvider client={queryClient}>
		<React.StrictMode>
			<BrowserRouter>
				<UserContextProvider>
					<App />
				</UserContextProvider>
			</BrowserRouter>
		</React.StrictMode>
	</QueryClientProvider>
);
