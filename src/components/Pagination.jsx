import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import UserList from "./UserList";

export default function Pagination({ data }) {
	// console.log("first====", data);

	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 4;

	const endOffset = itemOffset + itemsPerPage;
	// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		// console.log(
		// 	`User requested page number ${event.selected}, which is offset ${newOffset}`
		// );
		setItemOffset(newOffset);
	};
	return (
		<div className="">
			{currentItems.map((user, index) => (
				<div
					key={user.id}
					className="grid grid-cols-1 md:grid-cols-6 py-4 px-4"
				>
					<UserList user={user} indexItem={index} />
				</div>
			))}

			<div className="fixed bottom-0 right-0">
				<ReactPaginate
					breakLabel="..."
					nextLabel=">"
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					pageCount={pageCount}
					previousLabel="< "
					renderOnZeroPageCount={null}
					containerClassName="pagination"
					pageLinkClassName="page-num"
					previousLinkClassName="page-num"
					nextLinkClassName="page-num"
					activeLinkClassName="active"
				/>
			</div>
		</div>
	);
}
