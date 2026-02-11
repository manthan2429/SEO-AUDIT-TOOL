import { Snackbar, Alert } from "@mui/material";
import { useSnackbar } from "../context/SnackbarContext";

export default function GlobalSnackbar() {
	const { snackbar, closeSnackbar } = useSnackbar();

	return (
		<Snackbar
			open={snackbar.open}
			autoHideDuration={3000}
			onClose={closeSnackbar}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}>
			<Alert
				severity={snackbar.severity}
				onClose={closeSnackbar}
				variant="filled">
				{snackbar.message}
			</Alert>
		</Snackbar>
	);
}
