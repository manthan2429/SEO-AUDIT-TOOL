import { Box, Toolbar } from "@mui/material";
import Header from "../components/Header.jsx";

export default function MainLayout({ children }) {
	return (
		<Box>
			<Header />
			<Toolbar />

			<Box
				sx={{
					minHeight: "calc(100vh - 70px)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					p: 2,
				}}>
				{children}
			</Box>
		</Box>
	);
}
