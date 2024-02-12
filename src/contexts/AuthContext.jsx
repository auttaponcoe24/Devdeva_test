import { createContext, useContext, useState } from "react";
import { mockUser } from "../lib/mockUser";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState([] | null);
	const [loadUser, setLoadUser] = useState(true);

	const fetchUser = () => {
		try {
			setUser(mockUser);
		} catch (err) {
			console.log(err);
			setLoadUser(false);
		} finally {
			setLoadUser(false);
		}
	};

	const deleteUser = (userId) => {
		try {
			setUser(user.filter((item) => item.id !== userId));
			console.log("delete UserId :", userId);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AuthContext.Provider value={{ user, fetchUser, loadUser, deleteUser }}>
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
