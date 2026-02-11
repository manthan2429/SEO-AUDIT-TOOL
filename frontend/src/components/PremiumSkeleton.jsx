import { styled, Skeleton } from "@mui/material";

export const PremiumSkeleton = styled(Skeleton)(() => ({
	borderRadius: 8,
	"&::after": {
		animationDuration: "1.2s",
	},
}));
