import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";

export default function HomePage() {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	return (
		<main className="h-[92vh] max-w-[60rem] mx-auto relative">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl text-gray-600 font-normal">User List</h1>
				<button
					onClick={() => navigate(`/add-user`)}
					className="bg-blue-600 px-8 py-2 mt-4 mb-8 text-white rounded-lg cursor-pointer transition hover:bg-blue-600/90 hover:scale-110"
				>
					Add +
				</button>
			</div>
			<div className="grid grid-cols-6 bg-gray-200 py-2 px-4 justify-items-center">
				<div className="col-span-1">Profile picture</div>
				<div className="col-span-1">First name</div>
				<div className="col-span-1">Last name</div>
				<div className="col-span-1">Gender</div>
				<div className="col-span-1">Birthday</div>
				<div className="col-span-1">Action</div>
			</div>

			{/* <div className="mt-4"> */}
			{/* {user.map((user, index) => (
					<div key={user.id} className="grid grid-cols-6 py-4 px-4">
						<UserList user={user} indexItem={index} />
					</div>
				))} */}
			<Pagination data={user} />
			{/* </div> */}
		</main>
	);
}
