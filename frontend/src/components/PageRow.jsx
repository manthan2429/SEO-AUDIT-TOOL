import { useState } from "react";
import {
	TableRow,
	TableCell,
	IconButton,
	Collapse,
	Box,
	Typography,
	Grid,
	Chip,
	Paper,
	Stack,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import IssueBadge from "./IssueBadge";

const PageRow = ({ page }) => {
	const [open, setOpen] = useState(false);

	const issues = JSON.parse(page.issues || "[]");

	const getStatusColor = (status) => {
		if (status === 200) return "success";
		if (status >= 300 && status < 400) return "warning";
		return "error";
	};

	return (
		<>
			<TableRow
				sx={{
					transition: "0.2s",
					"&:hover": {
						backgroundColor: "#f5f7fa",
					},
				}}>
				<TableCell width={60}>
					<IconButton onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>

				<TableCell>
					<Typography fontWeight={500}>{page.url}</Typography>
				</TableCell>

				<TableCell>
					<Chip
						label={page.status_code}
						color={getStatusColor(page.status_code)}
						size="small"
					/>
				</TableCell>

				<TableCell>
					<Chip
						label={`${issues.length} Issues`}
						color={issues.length ? "error" : "success"}
						size="small"
						variant="outlined"
					/>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={4} sx={{ p: 0 }}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ p: 3, bgcolor: "#fafafa" }}>
							<Typography variant="subtitle1" fontWeight="bold" mb={1}>
								Issues
							</Typography>

							<Stack direction="row" spacing={1} flexWrap="wrap">
								{issues.length ? (
									issues.map((issue) => (
										<IssueBadge key={issue} issue={issue} />
									))
								) : (
									<Chip label="No Issues Found" color="success" />
								)}
							</Stack>

							<Typography variant="subtitle1" fontWeight="bold" mt={3} mb={1}>
								Page Metrics
							</Typography>

							<Grid container spacing={2}>
								{Object.entries(page).map(([key, value]) => {
									if (key === "issues" || key === "url") return null;

									return (
										<Grid item xs={6} md={3} key={key}>
											<Paper
												elevation={0}
												sx={{
													p: 2,
													borderRadius: 2,
													border: "1px solid #eee",
													textAlign: "center",
												}}>
												<Typography variant="caption" color="text.secondary">
													{key.replaceAll("_", " ").toUpperCase()}
												</Typography>

												<Typography fontWeight="bold">
													{String(value)}
												</Typography>
											</Paper>
										</Grid>
									);
								})}
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default PageRow;
