export const addLocalStorage = (user) => {
	localStorage.setItem("USER", user);
};

export const getLocalStorage = () => localStorage.getItem("USER");

export const removeLocalStorage = () => localStorage.removeItem("USER");
