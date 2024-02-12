import React from "react";
import { useParams } from "react-router-dom";

export default function EditUserPage() {
	const { userId } = useParams();
	return (
		<section>
			<h1>EditUserPage</h1>
			<h2>userId : {userId}</h2>
		</section>
	);
}
