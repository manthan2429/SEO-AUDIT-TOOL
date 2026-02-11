import { Chip } from "@mui/material";
import { getIssueSeverity } from "../utils/issueSeverity";

const IssueBadge = ({ issue }) => {
	const severity = getIssueSeverity(issue);

	return (
		<Chip label={issue} color={severity} size="small" sx={{ mr: 1, mb: 1 }} />
	);
};

export default IssueBadge;
