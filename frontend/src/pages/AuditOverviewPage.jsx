import {
	Box,
	Card,
	CardContent,
	Fade,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAudit } from "../api/auditApi";
import PageTable from "../components/PageTable";
import useApi from "../hooks/useApi.js";

// Icons
import DescriptionIcon from "@mui/icons-material/Description";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import HttpIcon from "@mui/icons-material/Http";
import TitleIcon from "@mui/icons-material/Title";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PremiumSkeleton } from "../components/PremiumSkeleton";

export default function AuditOverviewPage() {
	const { id } = useParams();
	const { request, data: audit, loading } = useApi(getAudit);

	useEffect(() => {
		if (id) {
			request(id);
		}
	}, [id]);

	const MetricCard = ({ title, value, icon }) => (
		<Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
			<CardContent>
				<Box display="flex" alignItems="center" gap={2}>
					<Box color="primary.main">{icon}</Box>

					<Box>
						<Typography color="text.secondary" variant="body2">
							{title}
						</Typography>

						<Typography variant="h5" fontWeight="bold">
							{value}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);

	const MetricCardSkeleton = () => (
		<Card
			sx={{
				borderRadius: 3,
				height: "100%",
				background: "transparent",
			}}>
			<CardContent>
				<Box display="flex" alignItems="center" gap={2}>
					<PremiumSkeleton
						variant="circular"
						width={60}
						height={40}
						animation="wave"
					/>

					<Box width="100%">
						<PremiumSkeleton width="60%" height={20} animation="wave" />
						<PremiumSkeleton width="60%" height={32} animation="wave" />
					</Box>
				</Box>
			</CardContent>
		</Card>
	);

	const PageTableSkeleton = () => {
		return (
			<TableContainer component={Paper} sx={{ borderRadius: 3 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Page URL</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Issues</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{Array.from({ length: 6 }).map((_, index) => (
							<TableRow key={index}>
								<TableCell>
									<PremiumSkeleton variant="circular" width={28} height={28} />
								</TableCell>

								<TableCell>
									<PremiumSkeleton width="80%" height={20} />
								</TableCell>

								<TableCell>
									<PremiumSkeleton width={60} height={28} />
								</TableCell>

								<TableCell>
									<PremiumSkeleton width={80} height={28} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<Grid
			item
			xs={12}
			sm={10}
			alignItems={"center"}
			justifyContent={"center"}
			mt={5}>
			<Typography variant="h4" fontWeight="bold" mb={4}>
				Audit Overview
			</Typography>
			{loading ? (
				<>
					<Grid container spacing={3}>
						{Array.from({ length: 9 }).map((_, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<MetricCardSkeleton />
							</Grid>
						))}
					</Grid>

					<Box mt={5}>
						<PageTableSkeleton />
					</Box>
				</>
			) : audit ? (
				<Fade in timeout={500}>
					<Box>
						<Typography mb={3}>
							Audited URL: <b>{audit?.url}</b>
						</Typography>

						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={3}>
								<MetricCard
									title="Missing Titles"
									value={audit.summary.missing_titles}
									icon={
										<Box
											sx={{
												color:
													audit.summary.missing_titles > 0
														? "error.main"
														: "success.main",
											}}>
											<TitleIcon fontSize="large" />
										</Box>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MetricCard
									title="Multiple H1"
									value={audit.summary.multiple_h1}
									icon={
										<Box
											sx={{
												color:
													audit.summary.multiple_h1 > 0
														? "error.main"
														: "success.main",
											}}>
											<TitleIcon fontSize="large" />
										</Box>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MetricCard
									title="Noindex Pages"
									value={audit.summary.noindex_pages}
									icon={
										<Box
											sx={{
												color:
													audit.summary.noindex_pages > 0
														? "error.main"
														: "success.main",
											}}>
											<VisibilityOffIcon fontSize="large" />
										</Box>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MetricCard
									title="Non 200 Pages"
									value={audit.summary.non_200_pages}
									icon={
										<Box
											sx={{
												color:
													audit.summary.non_200_pages > 0
														? "error.main"
														: "success.main",
											}}>
											<HttpIcon fontSize="large" />
										</Box>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MetricCard
									title="Title Length Invalid"
									value={audit.summary.title_length_invalid}
									icon={
										<Box
											sx={{
												color:
													audit.summary.title_length_invalid > 0
														? "error.main"
														: "success.main",
											}}>
											<FormatSizeIcon fontSize="large" />
										</Box>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MetricCard
									title="Meta Description Invalid"
									value={audit.summary.meta_description_invalid}
									icon={
										<Box
											sx={{
												color:
													audit.summary.meta_description_invalid > 0
														? "error.main"
														: "success.main",
											}}>
											<DescriptionIcon fontSize="large" />
										</Box>
									}
								/>
							</Grid>
						</Grid>

						<Box mt={5}>
							<PageTable pages={audit.pages} />
						</Box>
					</Box>
				</Fade>
			) : null}
		</Grid>
	);
}
