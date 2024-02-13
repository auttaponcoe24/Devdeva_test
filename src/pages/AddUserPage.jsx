import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { nanoid } from "nanoid";
import axios from "axios";
import Loading from "../components/Loading";

export default function AddUserPage() {
	const navigate = useNavigate();
	const { user, addUser } = useAuthContext();
	// console.log("user=>", user);

	const fileEl = useRef(null);
	const [file, setFile] = useState(null);
	// if (file) console.log("fileUrl=>", URL.createObjectURL(file));
	const [loadImage, setLoadImage] = useState(false);

	const [inputUser, setInputUser] = useState({
		id: nanoid(),
		picture: "",
		firstName: "",
		lastName: "",
		gender: "",
		birthDay: "",
	});

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
					// await addUser(inputUser);

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
						await addUser(inputUser);
					} else if (!file) {
						await addUser(inputUser);
					}
					// alert(JSON.stringify(inputUser));
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
			<div className="flex flex-col md:flex-row  md:items-center mt-4 md:justify-between">
				<h1 className="text-2xl text-gray-600 font-normal text-center">
					Create new User
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
				<div className="flex flex-col md:flex-row items-center justify-around gap-4">
					<div className="flex flex-col items-center justify-center gap-4 md:my-4">
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
									<div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-500 object-cover overflow-hidden">
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
									<div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-500 object-cover overflow-hidden"></div>
								</div>
								<button
									onClick={() => fileEl.current.click()}
									type="button"
									className="bg-blue-600 px-4 py-2 text-white cursor-pointer rounded-lg transition hover:bg-blue-600/90 hover:scale-110"
								>
									Choose Profile Picture
								</button>
							</>
						)}
					</div>

					<div className="flex flex-col md:gap-4 md:w-[40rem] mx-10 md:ml-10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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

				<div className="mt-10 md:mt-20 mr-10 w-full text-end">
					<button
						type="reset"
						className="uppercase w-44 px-3 py-2 rounded-lg text-white bg-gray-600 transition hover:bg-gray-400 hover:scale-110 mr-4"
					>
						cancel
					</button>
					<button
						type="submit"
						className="uppercase w-44 px-3 py-2 rounded-lg text-white bg-green-600 transition hover:bg-green-400 hover:scale-110"
					>
						save
					</button>
				</div>
			</form>
		</section>
	);
}
