import { Box } from "@mui/material";

export default function MainLayout({ children }) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				minHeight: "100vh",
			}}>
			{children}
		</Box>
	);
}
