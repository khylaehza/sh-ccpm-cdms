import React, { useState } from 'react';
import { CusModal } from '../../shared';
import { UsersForm } from '../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../DataContext';

const EditUsers = ({ curRow, setEditUser, showEditUser }) => {
	const [imageFile, setImageFile] = useState(null);

	const PASS_REGEX =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_()]).{8,}$/;

	const OnImgChange = (event) => {
		setImageFile(event.target.files[0]);
	};

	const { editItem } = useData();

	const editForm = useFormik({
		initialValues: {
			name: curRow.name,
			role: curRow.role,
			department: curRow.department,
			uname: curRow.uname,
			pass: '',
			conpass: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required.'),
			role: Yup.string().required('Role is required.'),
			department: Yup.string().required('Department is required.'),
			pass: Yup.string().matches(
				PASS_REGEX,
				'Password must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character.'
			),
			conpass: Yup.string().oneOf(
				[Yup.ref('pass'), null],
				'Passwords must match.'
			),
		}),
		onSubmit: (value, actions) => {
			const itemId = curRow.key;
			const updatedItem = value;
			const tableName = 'users';
			const newImageFile = imageFile;
			const existingImageUrl = imageFile ? curRow.image : null;

			editItem(
				tableName,
				itemId,
				updatedItem,
				newImageFile,
				existingImageUrl
			);

			actions.resetForm();
			setImageFile(null);
			setEditUser(false);
		},
	});

	return (
		<div>
			<CusModal
				btnLabel={'Edit'}
				content={
					<UsersForm
						form={editForm}
						handleImage={OnImgChange}
					/>
				}
				title={'Edit User'}
				setOpen={setEditUser}
				setImageFile={setImageFile}
				open={showEditUser}
				form={editForm}
			/>
		</div>
	);
};

export default EditUsers;
