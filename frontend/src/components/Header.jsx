import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import logo64 from "../assets/logo_192.png";

export default function Header() {
	return (
		<AppBar
			position="fixed"
			color="inherit"
			elevation={0}
			sx={{
				borderBottom: "1px solid #eaeaea",
				backgroundColor: "#fff",
			}}>
			<Toolbar
				sx={{
					minHeight: 70,
					display: "flex",
					alignItems: "center",
					px: 3,
					gap: 1.5,
				}}>
				<Box
					component="img"
					src={logo64}
					alt="Logo"
					sx={{
						height: 80,
						cursor: "pointer",
					}}
				/>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 300,
						color: "#1a1a1a",
					}}>
					SEO{" "}
					<Box component="span" sx={{ color: "#1976d2" }}>
						Audit
					</Box>{" "}
					Tool
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
