import React from 'react';
import { Pagination } from 'rsuite';

const CustomPagination = ({ limit, total, activePage, setActivePage }) => {
	return (
		<Pagination
			prev
			next
			size="md"
			maxButtons={6}
			ellipsis
			boundaryLinks
			total={total}
			limit={limit}
			activePage={activePage}
			onChangePage={setActivePage}
		/>
	);
};

export default CustomPagination;
