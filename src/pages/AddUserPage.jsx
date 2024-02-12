import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function AddUserPage() {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	console.log(" =>", user.length);

	const [inputUser, setInputUser] = useState({
		id: 1,
		picture: "",
		firstName: "",
		lastName: "",
		gender: "",
		birthDay: "",
	});

	const handleSave = (e) => {
		e.preventDefault();
		alert(JSON.stringify(inputUser));
	};

	return (
		<section className="h-[92vh] max-w-[60rem] mx-auto">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl text-gray-600 font-normal">Create new User</h1>
				<button
					onClick={() => navigate(`/`)}
					className="bg-blue-600 px-8 py-2 mt-4 mb-8 text-white rounded-lg cursor-pointer transition hover:bg-blue-600/90 hover:scale-110"
				>
					HOME
				</button>
			</div>

			<form className="flex flex-col items-center justify-around gap-4">
				<div className="flex items-center justify-around gap-4">
					<div className="flex flex-col items-center justify-center gap-4 my-4">
						<div className="w-40 h-40 rounded-full border border-gray-500"></div>
						<button className="bg-blue-600 px-4 py-2 text-white cursor-pointer rounded-lg transition hover:bg-blue-600/90 hover:scale-110">
							Upload Profile Picture
						</button>
						<button className="bg-red-600 px-4 py-2 text-white cursor-pointer rounded-lg transition hover:bg-red-600/90 hover:scale-110">
							Delet Picture
						</button>
					</div>

					<div className="flex flex-col gap-4 w-[40rem] ml-10">
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<label className="text-gray-400 font-semibold">
									First Name
								</label>
								<input
									name="firstName"
									value={inputUser.firstName}
									type="text"
									placeholder="Please enter First name"
									className="border border-gray-700 px-3 py-2 rounded-lg outline-none w-full"
									onChange={(e) =>
										setInputUser({
											...inputUser,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-gray-400 font-semibold">Last Name</label>
								<input
									name="lastName"
									value={inputUser.lastName}
									type="text"
									placeholder="Please enter Last name"
									className="border border-gray-700 px-3 py-2 rounded-lg outline-none"
									onChange={(e) =>
										setInputUser({
											...inputUser,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<label className="text-gray-400 font-semibold">Gender</label>
								<select
									name="gender"
									value={inputUser.gender}
									onChange={(e) =>
										setInputUser({
											...inputUser,
											[e.target.name]: e.target.value,
										})
									}
									className="border border-gray-700 px-3 py-2 rounded-lg outline-none text-gray-400"
								>
									<option value="">-- Please select Gender --</option>

									<option value="male">male</option>
									<option value="female">female</option>
								</select>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-gray-400 font-semibold">Birthday</label>
								<input
									placeholder="DD/MM/YYYY"
									type="date"
									name="birthDay"
									value={inputUser.birthDay}
									onChange={(e) =>
										setInputUser({
											...inputUser,
											[e.target.name]: e.target.value,
										})
									}
									className="border border-gray-700 px-3 py-2 rounded-lg outline-none text-gray-400"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-20 mr-10 w-full text-end">
					<button
						type="reset"
						className="uppercase w-44 px-3 py-2 rounded-lg text-white bg-gray-600 transition hover:bg-gray-400 hover:scale-110 mr-4"
					>
						cancel
					</button>
					<button
						type="submit"
						onClick={handleSave}
						className="uppercase w-44 px-3 py-2 rounded-lg text-white bg-green-600 transition hover:bg-green-400 hover:scale-110"
					>
						save
					</button>
				</div>
			</form>
		</section>
	);
}
