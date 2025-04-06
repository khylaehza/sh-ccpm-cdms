import React, { useState, useEffect } from 'react';
import bg from '../assets/cdms-login-bg.jpg';
import logo from '../assets/cdms-logo.png';
import { CusInput, CusPrimButton } from '../shared';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';

const LoginPage = () => {
	const navigate = useNavigate();
	const { users, setCurUser, curUser } = useData();
	const [error, setError] = useState('');

	useEffect(() => {
		const storedUser = localStorage.getItem('curUser');
		if (storedUser) {
			const user = JSON.parse(storedUser);
			setCurUser(user);
			navigate('/projects');
		}
	}, [navigate, setCurUser]);

	const form = useFormik({
		initialValues: {
			uname: '',
			pass: '',
		},
		validationSchema: Yup.object({
			uname: Yup.string().required('Username is required.'),
			pass: Yup.string().required('Password is required.'),
		}),
		onSubmit: (values, actions) => {
			const matchedUser = users.find(
				(user) =>
					user.uname === values.uname && user.pass === values.pass
			);

			localStorage.setItem('curUser', JSON.stringify(matchedUser));

			if (matchedUser) {
				setError('');
				setCurUser(matchedUser);

				if (matchedUser.role === 'Super Admin') {
					navigate('/registration');
				} else {
					navigate('/projects');
				}
			} else {
				setError('Incorrect username or password.');
			}

			actions.resetForm();
		},
	});

	return (
		<div className='bg-white w-screen h-screen flex '>
			<div
				className='flex items-center justify-center w-1/2 h-full bg-contain bg-no-repeat'
				style={{ backgroundImage: `url(${bg})` }}
			>
				<img
					src={logo}
					alt='Logo'
					className='w-auto h-48'
				/>
			</div>

			<div className='bg-white p-24 w-1/2 h-screen'>
				<div className='h-full flex bg-primary rounded-2xl p-12 items-center justify-center flex-col gap-1'>
					<div className='text-2xl font-bold'>Login</div>
					<div className='text-md mt-2'>
						Please enter your Username and Password
					</div>
					<form
						className='w-full px-24 flex gap-2 flex-col'
						onSubmit={form.handleSubmit}
					>
						{/* <CusInput
							name={'email'}
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.email}
							touch={form.touched.email}
							placeholder={'E-mail'}
							type={'email'}
							color='white'
						/> */}

						<CusInput
							name={'uname'}
							value={form.values.uname}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.uname}
							touch={form.touched.uname}
							placeholder={'Username'}
							color='white'
						/>

						<CusInput
							name={'pass'}
							value={form.values.pass}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.pass}
							touch={form.touched.pass}
							placeholder={'Password'}
							type={'password'}
							color='white'
						/>
						<div className='flex mt-1'>
							<CusPrimButton
								label={'LOGIN'}
								text={'white'}
								type='submit'
								color='secondary'
							/>
						</div>
						{error && (
							<div className='text-red-500 text-xs text-left'>
								{error}
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
