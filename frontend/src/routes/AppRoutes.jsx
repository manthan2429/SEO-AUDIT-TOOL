import { BrowserRouter, Routes, Route } from "react-router-dom";

import StartAuditPage from "../pages/StartAuditPage";
import AuditOverviewPage from "../pages/AuditOverviewPage";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path="/" element={<StartAuditPage />} />
					<Route path="/audit/:id" element={<AuditOverviewPage />} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
};

export default AppRoutes;
