import React from "react";

export default function Button({ children, backgroundColor, onclick }) {
	return (
		<button onClick={onclick} className={`${backgroundColor} `}>
			{children}
		</button>
	);
}
