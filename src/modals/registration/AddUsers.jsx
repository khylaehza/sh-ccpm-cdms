import React, { useState } from 'react';
import { CusPrimButton, CusModal } from '../../shared';
import { UsersForm } from '../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../DataContext';
import moment from 'moment';

const AddUsers = () => {
	const [showAddUsers, setAddUsers] = useState(false);
	const [imageFile, setImageFile] = useState(null);

	const PASS_REGEX =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_()]).{8,}$/;

	const OnImgChange = (event) => {
		setImageFile(event.target.files[0]);
	};
	const { addItem } = useData();

	// const generateUsername = (uname, department) => {
	// 	const prefixes = {
	// 		General: 'GE',
	// 		Finance: 'FI',
	// 		Marketing: 'MA',
	// 		'Product Development': 'PD',
	// 		'Inventory and Purchasing': 'IP',
	// 		'Product and Activation': 'PA',
	// 	};
	// 	return prefixes[department]
	// 		? `${prefixes[department]}_${uname}`
	// 		: uname;
	// };

	const form = useFormik({
		initialValues: {
			name: '',
			role: '',
			department: '',
			uname: '',
			pass: '',
			conpass: '',
			created_at: moment().format(),
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required.'),
			role: Yup.string().required('Role is required.'),
			department: Yup.string().required('Department is required.'),
			pass: Yup.string()
				.matches(
					PASS_REGEX,
					'Password must be at least 8 characters, with one uppercase, one lowercase, one number, and one special character.'
				)
				.required('Password is required.'),
			conpass: Yup.string()
				.oneOf([Yup.ref('pass'), null], 'Passwords must match.')
				.required('Confirm Password is required.'),
		}),
		onSubmit: (values, actions) => {
			const modifiedValues = {
				...values,
			};

			addItem(modifiedValues, 'users', imageFile);

			actions.resetForm();
			setImageFile(null);
			setAddUsers(false);
		},
	});

	return (
		<div>
			<CusPrimButton
				label={'ADD USER'}
				color={'black'}
				text={'white'}
				w='36'
				onClick={() => setAddUsers(true)}
			/>
			<CusModal
				btnLabel={'Add'}
				content={
					<UsersForm
						form={form}
						handleImage={OnImgChange}
					/>
				}
				title={'Add User'}
				setOpen={setAddUsers}
				open={showAddUsers}
				form={form}
				user={true}
			/>
		</div>
	);
};

export default AddUsers;
