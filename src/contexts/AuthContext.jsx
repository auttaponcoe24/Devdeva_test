import { createContext, useContext, useState } from "react";
import { mockUser } from "../lib/mockUser";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(mockUser);

	const deleteUser = (indexItem, userId) => {
		try {
			user.splice(indexItem, 1);
			setUser((user) => user.filter((item) => item.id !== userId));
			// console.log("indexItem :", indexItem);
			// console.log("UserId :", userId);
		} catch (err) {
			console.log(err);
		}
	};

	const addUser = async (input) => {
		try {
			user.push(input);
			// setUser([...user, user.push(input)]);
		} catch (err) {
			console.log(err);
		}
	};

	const editUser = async (userId, input) => {
		try {
			// const newUser = await user.filter((user) => user.id != userId);
			const newUser = user.reduce((acc, user) => {
				if (user.id != userId) acc.push(user);
				else acc.push({ ...user, ...input });
				return acc;
			}, []);
			setUser(newUser);
			console.log("newUser", newUser);
			console.log("userId =>", userId);
			console.log("input =>", input);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AuthContext.Provider value={{ user, deleteUser, addUser, editUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error("AuthContext must be used within an AuthContextProvider");
	}
	return context;
}
