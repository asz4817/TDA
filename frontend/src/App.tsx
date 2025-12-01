import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import ContactUs from "./pages/ContactUs";
import TXDC from "./pages/TXDC2026";
import Registration from "./pages/Registration";
import DownloadForms from "./components/DownloadForms";
import Login from "./pages/Login";
import Mailout from "./pages/Mailout";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route index element={<HomePage />} />
			<Route path="/DownloadForms" element={<DownloadForms />} />
			<Route path="/contactUs" element={<ContactUs />} />
			<Route path="/txdc2026" element={<TXDC />} />
			<Route path="/txdc2026/register" element={<Registration />} />
			<Route path="/login" element={<Login />} />
			<Route path="/mailout" element={<Mailout />} />

		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
