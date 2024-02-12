import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import AddUserPage from "../pages/AddUserPage";
import EditUserPage from "../pages/EditUserPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "add-user", element: <AddUserPage /> },
			{ path: "edit-user/:userId", element: <EditUserPage /> },
		],
	},
]);

export default function Route() {
	return <RouterProvider router={router} />;
}
