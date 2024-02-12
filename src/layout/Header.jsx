import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="bg-blue-600 flex items-center justify-between h-[8vh] py-2 px-10 z-50">
			<h1 className="font-medium text-xl text-white ">User Management</h1>

			<Link to={"/"} className="relative flex items-center justify-center ">
				<h1 className="font-medium z-10 text-2xl text-gray-600">D</h1>
				<div className="absolute bg-white h-10 w-10 rounded-full border border-black/70"></div>
			</Link>
		</header>
	);
}
