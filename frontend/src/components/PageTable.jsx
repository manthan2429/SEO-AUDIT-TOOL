import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@mui/material";

import PageRow from "./PageRow";

const PageTable = ({ pages }) => {
	return (
		<Paper sx={{ mt: 4, mb: 3, borderRadius: 3 }}>
			<Table sx={{ tableLayout: "fixed", borderRadius: 3 }}>
				<TableHead
					sx={{
						backgroundColor: "lightgray",
					}}>
					<TableRow>
						<TableCell />
						<TableCell>Page URL</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Issue Count</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{pages.map((page) => (
						<PageRow key={page.url} page={page} />
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

export default PageTable;
