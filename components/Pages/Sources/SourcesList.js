import React from 'react';
import { MWT_Row } from '@/components/UI/Grid';
import SourcesItem from '@/components/Pages/Sources/SourcesItem';

const SourcesList = ({ users }) => {
	return (
		<MWT_Row className="c-mb-15">
			{users.map((user) => (
				<SourcesItem key={user.id} user={user} />
			))}
		</MWT_Row>
	);
};

export default SourcesList;
