import React from 'react';
import { Button, Form } from 'rsuite';
import CustomField from '@/components/UI/CustomField';

const ProposalChat = ({ user = {} }) => {
	return (
		<div>
			{Object.keys(user).length > 0 && (
				<Form>
					<CustomField
						label={`Chat with ${user?.firstName} ${user?.lastName}`}
						placeholder="Message"
						name="bio"
						accepter="textarea"
						rows={5}
					/>
					<Button className="rs-btn-main">send message</Button>
				</Form>
			)}
		</div>
	);
};

export default ProposalChat;
