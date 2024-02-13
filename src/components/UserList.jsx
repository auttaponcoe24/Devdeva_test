import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import dayjs from "dayjs";
import profileBlank from "../assets/imgs/profile-blank.png";

export default function UserList({ user, indexItem }) {
	// console.log(user);
	const navigate = useNavigate();
	const { deleteUser } = useAuthContext();

	return (
		<>
			<div className="grid items-center justify-center">
				<div className="bg-blue-500 w-16 h-16 rounded-full overflow-hidden object-cover">
					<img
						src={user.picture || profileBlank}
						alt="profile"
						className="w-full h-full"
					/>
				</div>
			</div>
			<div className="flex items-center justify-center">{user.firstName}</div>
			<div className="flex items-center justify-center">{user.lastName}</div>
			<div className="flex items-center justify-center">{user.gender}</div>
			<div className="flex items-center justify-center">
				{dayjs(user.birthDay).format("DD MMM YYYY")}
			</div>
			<div className="flex items-center justify-center gap-2">
				<button
					onClick={() => navigate(`/edit-user/${user.id}`)}
					className="px-4 py-2 w-full rounded-lg bg-orange-300 text-white hover:bg-orange-400 hover:text-gray-900 hover:scale-110 transition"
				>
					Edit
				</button>
				<button
					onClick={() => deleteUser(indexItem, user.id)}
					className="px-4 py-2 w-full rounded-lg bg-red-500 text-white hover:bg-red-300 hover:text-gray-900 hover:scale-110 transition"
				>
					Delete
				</button>
			</div>
		</>
	);
}
