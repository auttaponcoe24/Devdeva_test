import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { nanoid } from "nanoid";
import Loading from "../components/Loading";
import axios from "axios";

export default function EditUserPage() {
	const navigate = useNavigate();
	const { user, editUser } = useAuthContext();
	// console.log("user=>", user);

	const fileEl = useRef(null);
	const [file, setFile] = useState(null);
	// if (file) console.log("fileUrl=>", URL.createObjectURL(file));
	const [loadImage, setLoadImage] = useState(false);
	const { userId } = useParams();

	const userCurrent = user.find((user) => user.id == userId);
	// console.log("userCurrent=>", userCurrent);

	const [inputUser, setInputUser] = useState({
		id: userCurrent.id,
		picture: userCurrent.picture,
		firstName: userCurrent.firstName,
		lastName: userCurrent.lastName,
		gender: userCurrent.gender,
		birthDay: userCurrent.birthDay,
	});
	// console.log("first---", userCurrent.firstName);

	const uploadImage = async () => {
		try {
			setLoadImage(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "efbwqtwg");
			const res = await axios.post(
				"https://api.cloudinary.com/v1_1/dnwtwyaim/image/upload",
				formData
			);
			// console.log("first", res);
			// console.log("+++", formData);
			// console.log("---", file);

			setInputUser({ ...inputUser, picture: res.data.url });
		} catch (err) {
			console.log(err);
		} finally {
			setLoadImage(false);
		}
	};

	const handleSave = async (e) => {
		let text = "Save Confirm";

		if (confirm(text) === true) {
			try {
				e.preventDefault();
				// alert(JSON.stringify(inputUser));
				if (inputUser.firstName === "" || inputUser.lastName === "") {
					alert("First Name Or Last Name is Empty");
					return navigate(`/`);
				} else {
					// await uploadImage();
					// await new Promise((resolve) => setTimeout(resolve, 5000));
					// await editUser(inputUser);
					if (file) {
						setLoadImage(true);
						const formData = new FormData();
						formData.append("file", file);
						formData.append("upload_preset", "efbwqtwg");
						const res = await axios.post(
							"https://api.cloudinary.com/v1_1/dnwtwyaim/image/upload",
							formData
						);
						if (res.data.url) {
							inputUser.picture = res.data.url;
						}
						await editUser(userCurrent.id, inputUser);
					} else if (!file) {
						await editUser(userCurrent.id, inputUser);
					}
				}
			} catch (err) {
				console.log(err);
			} finally {
				setLoadImage(false);
				navigate(`/`);
			}
		} else {
			navigate(`/`);
		}
	};

	return (
		<section className="h-[92vh] max-w-[60rem] mx-auto">
			{loadImage && <Loading />}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl text-gray-600 font-normal">
					Edit User: {userCurrent.firstName}
				</h1>
				<button
					onClick={() => navigate(`/`)}
					className="bg-blue-600 px-8 py-2 mt-4 mb-8 text-white rounded-lg cursor-pointer transition hover:bg-blue-600/90 hover:scale-110"
				>
					HOME
				</button>
			</div>

			<form
				onSubmit={handleSave}
				className="flex flex-col items-center justify-around gap-4"
			>
				<div className="flex items-center justify-around gap-4">
					<div className="flex flex-col items-center justify-center gap-4 my-4">
						<input
							type="file"
							className="hidden"
							ref={fileEl}
							onChange={(e) => {
								if (e.target.files[0]) {
									setFile(e.target.files[0]);
								}
							}}
						/>

						{file ? (
							<>
								<div
									// className="cursor-pointer w-[200px] h-[350px] border shadow-sd flex items-center justify-center p-4"
									onClick={() => fileEl.current.click()}
								>
									<div className="w-40 h-40 rounded-full border border-gray-500 object-cover overflow-hidden">
										<img
											src={URL.createObjectURL(file)}
											className="w-full h-full object-center"
											alt=""
										/>
									</div>
								</div>
								<button
									// onClick={() => fileEl.current.click()}
									onClick={uploadImage}
									type="button"
									className="bg-blue-600 px-4 py-2 text-white cursor-pointer rounded-lg transition hover:bg-blue-600/90 hover:scale-110"
								>
									Upload Profile Picture
								</button>
								<button
									type="button"
									onClick={() => {
										fileEl.current.value = "";
										setFile(null);
									}}
									className="bg-red-600 px-4 py-2 text-white cursor-pointer rounded-lg transition hover:bg-red-600/90 hover:scale-110"
								>
									Delete Picture
								</button>
							</>
						) : (
							<>
								<div onClick={() => fileEl.current.click()}>
									<div className="w-40 h-40 rounded-full border border-gray-500 object-cover overflow-hidden">
										<img src={userCurrent.picture} alt="" />
									</div>
								</div>
								<button
									onClick={() => fileEl.current.click()}
									type="button"
									className="bg-blue-600 px-4 py-2 text-white cursor-pointer rounded-lg transition hover:bg-blue-600/90 hover:scale-110"
								>
									Edit Profile Picture
								</button>
							</>
						)}
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
									placeholder={userCurrent.firstName}
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
									placeholder={userCurrent.lastName}
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
									className="border border-gray-700 px-3 py-2 rounded-lg outline-none "
								>
									<option
										value=""
										label="-- Please select Gender --"
										className="text-gray-400"
										disabled
									>
										-- Please select Gender --
									</option>

									<option value="Male">MALE</option>
									<option value="Female">FEMALE</option>
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
									className="border border-gray-700 px-3 py-2 rounded-lg outline-none text-gray-900"
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
						// onClick={handleSave}
						className="uppercase w-44 px-3 py-2 rounded-lg text-white bg-green-600 transition hover:bg-green-400 hover:scale-110"
					>
						save
					</button>
				</div>
			</form>
		</section>
	);
}
