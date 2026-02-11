import { Backdrop, CircularProgress } from "@mui/material";
import { useLoader } from "../context/LoaderContext";

export default function Loader() {
	const { loading } = useLoader();

	return (
		<Backdrop open={loading} sx={{ zIndex: 9999 }}>
			<CircularProgress color="blue" />
		</Backdrop>
	);
}
