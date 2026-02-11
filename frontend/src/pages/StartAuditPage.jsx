import {
	Box,
	Button,
	Card,
	CardContent,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { startAudit } from "../api/auditApi";
import logo192 from "../assets/logo_512.png";
import useApi from "../hooks/useApi.js";

export default function StartAuditPage() {
	const [url, setUrl] = useState("");
	const navigate = useNavigate();
	const { request, loading } = useApi(startAudit);

	const handleStartAudit = async () => {
		if (!url) return;

		const res = await request(url);

		if (res) {
			navigate(`/audit/${res.data.audit_id}`);
		}
	};

	return (
		<Box alignItems="center" justifyContent="center">
			<Card
				sx={{
					width: "100%",
					maxWidth: 450,
					borderRadius: 3,
					boxShadow: 4,
				}}>
				<CardContent sx={{ p: 4, textAlign: "center" }}>
					<Box
						mb={2}
						sx={{
							display: "flex",
							justifyContent: "center",
						}}>
						<Box
							sx={{
								width: 100,
								height: 100,
								borderRadius: "50%",
								backgroundColor: "lightblue",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<img
								src={logo192}
								alt="SEO Tool Logo"
								style={{ width: 100, height: 100 }}
							/>
						</Box>
					</Box>

					<Typography variant="h5" fontWeight="bold" gutterBottom>
						SEO Audit Tool
					</Typography>

					<Typography color="text.secondary" mb={3}>
						Enter website URL to analyze navigation structure and SEO health.
					</Typography>

					{loading ? (
						<>
							<Skeleton height={56} />
							<Skeleton height={40} sx={{ mt: 2 }} />
						</>
					) : (
						<>
							<TextField
								fullWidth
								label="Website URL"
								placeholder="https://example.com"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								sx={{ mb: 3 }}
							/>

							<Button
								variant="contained"
								fullWidth
								size="large"
								onClick={handleStartAudit}
								disabled={loading}>
								Run Audit
							</Button>
						</>
					)}
				</CardContent>
			</Card>
		</Box>
	);
}
