import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "error",
	});

	const showSnackbar = (message, severity = "error") => {
		setSnackbar({
			open: true,
			message,
			severity,
		});
	};

	const closeSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	return (
		<SnackbarContext.Provider value={{ snackbar, showSnackbar, closeSnackbar }}>
			{children}
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = () => useContext(SnackbarContext);
