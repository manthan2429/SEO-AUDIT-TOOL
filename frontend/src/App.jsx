import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

import { injectRefs } from "./api/axios";
import GlobalSnackbar from "./components/GlobalSnackbar";
import Loader from "./components/Loader";
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import { SnackbarProvider, useSnackbar } from "./context/SnackbarContext";

function AppContent() {
	const loader = useLoader();
	const snackbar = useSnackbar();

	useEffect(() => {
		injectRefs(loader, snackbar);
	}, [loader, snackbar]);

	return (
		<>
			<AppRoutes />
			<GlobalSnackbar />
			<Loader />
		</>
	);
}

function App() {
	return (
		<LoaderProvider>
			<SnackbarProvider>
				<AppContent />
			</SnackbarProvider>
		</LoaderProvider>
	);
}

export default App;
