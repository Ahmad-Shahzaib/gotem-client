import React, { useEffect, useRef, useState } from 'react';
import CustomNotice from '@/components/UI/CustomNotice';
import { updateUser } from '@/http/userAPI';
import VerificationSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/VerificationSettingsForm';

const BillingSettings = ({ user }) => {
	const form = useRef();
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		files: [],
		selfyFiles: [],
	});

	useEffect(() => {
		setFormValue((prevState) => ({
			...prevState,
			files: user.files,
			selfyFiles: user.selfyFiles,
		}));
	}, [user]);

	const handleSubmit = async () => {
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				if (key === 'uploaded_files') {
					formValue[key].forEach((item) => {
						data.append('uploaded_files', item.file);
					});
				} else if (key === 'uploaded_selfyFiles') {
					formValue[key].forEach((item) => {
						data.append('uploaded_selfyFiles', item.file);
					});
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else {
					data.append(key, formValue[key]);
				}
			});

			await updateUser(data);
			CustomNotice({
				content: `Verification files was updated`,
				type: 'success',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<div className="ls p-32 bordered">
			<h6>Your Verification files</h6>
			<p>Update your verification files</p>
			<hr />
			<VerificationSettingsForm
				form={form}
				formValue={formValue}
				setFormValue={setFormValue}
				fetching={fetching}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default BillingSettings;
