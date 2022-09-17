import React, { useState } from 'react';
import { Button, Uploader } from 'rsuite';
import NoticeModal from '@/components/Modals/NoticeModal';

const CustomUploaderFiles = ({
	name,
	fileList,
	disabled,
	single,
	multiple,
	setFormValue,
	draggable,
	children,
	setFormError,
	errorMsg,
	confirmNodal = false,
	accept,
}) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [imgToDelete, setImgToDelete] = useState(null);
	const [deletedImages, setDeletedImages] = useState([]);

	const chooseImage = (value) => {
		let isWrongFormat;
		let arrTypes = accept.replaceAll(/\s/g, '').split(',');

		isWrongFormat = value.some((file) => !arrTypes.includes(file.blobFile.type));

		setFormError({});
		if (isWrongFormat) {
			setFormError((prev) => ({
				...prev,
				[name]: errorMsg,
			}));
			setUploadedFiles((prevState) => [...prevState]);
			return true;
		}

		if (single) {
			setFormValue((prevState) => ({
				...prevState,
				['uploaded_' + name]: [value[value.length - 1].blobFile],
			}));
			setUploadedFiles([value[value.length - 1]]);
		} else {
			const filesToUpload = value.map((val) => val.blobFile);
			setFormValue((prevState) => ({
				...prevState,
				['uploaded_' + name]: filesToUpload,
			}));
			setUploadedFiles(value);
		}
	};

	const deleteUploadedFile = (imgToDelete, delImages = []) => {
		if (imgToDelete.type === 'uploaded') {
			const filterArr = uploadedFiles.filter((file) => file.fileKey !== imgToDelete.id);
			const filesToUpload = filterArr.map((val) => val.blobFile);
			setUploadedFiles(filterArr);
			setFormValue((prevState) => ({
				...prevState,
				['uploaded_' + name]: filesToUpload,
			}));
		} else {
			setFormValue((prevState) => ({
				...prevState,
				[name]: prevState[name].filter((file) => file.id !== imgToDelete.id),
				toDelete: {
					...prevState.toDelete,
					[name]: [...delImages],
				},
			}));
		}

		confirmNodal && closeModal();
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => setShowModal(false);

	return (
		<>
			{confirmNodal && (
				<NoticeModal
					showModal={showModal}
					closeModal={closeModal}
					handler={() => deleteUploadedFile(imgToDelete)}
				/>
			)}
			{(uploadedFiles.length > 0 || fileList.length > 0) && (
				<ul className="list-unstyled">
					{fileList.length > 0 &&
						fileList.map((file) => (
							<li key={file.id}>
								<a
									target="_blank"
									href={process.env.NEXT_PUBLIC_API_URL + file.name}
									rel="noreferrer"
								>
									{file.name.split('/').pop()}
								</a>
								<Button
									className="btn-icon btn-delete"
									onClick={() => {
										const deleteFiles = { type: 'exect', id: file.id };
										const delImages = [...deletedImages, file.id];
										setImgToDelete(deleteFiles);
										setDeletedImages(delImages);
										confirmNodal
											? openModal()
											: deleteUploadedFile(deleteFiles, delImages);
									}}
								>
									<i className="ico ico-Trash" />
								</Button>
							</li>
						))}
					{uploadedFiles.map((file) => (
						<li key={file.fileKey}>
							<a
								target="_blank"
								href={URL.createObjectURL(file.blobFile)}
								rel="noreferrer"
							>
								{file.name}
							</a>
							<Button
								className="btn-icon btn-delete"
								onClick={() => {
									const deleteFiles = { type: 'uploaded', id: file.fileKey };
									setImgToDelete(deleteFiles);
									confirmNodal ? openModal() : deleteUploadedFile(deleteFiles);
								}}
							>
								<i className="ico ico-Trash" />
							</Button>
						</li>
					))}
				</ul>
			)}
			<Uploader
				action={'/'}
				fileListVisible={false}
				autoUpload={false}
				fileList={uploadedFiles}
				multiple={multiple}
				disabled={disabled}
				draggable={draggable}
				accept={accept}
				onChange={(val) => chooseImage(val)}
			>
				{children}
			</Uploader>
		</>
	);
};

export default CustomUploaderFiles;
