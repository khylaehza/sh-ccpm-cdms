import React from 'react';
import bg from '../assets/cdms-login-bg.jpg';
import logo from '../assets/cdms-logo.png';
import { CusInput, CusPrimButton } from '../shared';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const LoginPage = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const form = useFormik({
		initialValues: {
			email: '',
			pass: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Username is required.'),
			pass: Yup.string().required('Password is required.'),
		}),
		onSubmit: (value, actions) => {
			// const matchedLibrarian = librarian.find(
			// 	(lib) => lib.email === value.email && lib.pass === value.pass
			// );

			// if (matchedLibrarian) {
			// 	setError('');
			console.log(value);
			navigate('registration');
			// } else {
			// 	setError('Incorrect email or password.');
			// }

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
						Please enter your Email and Password
					</div>
					<form
						className='w-full px-24 flex gap-2 flex-col'
						onSubmit={form.handleSubmit}
					>
						<CusInput
							name={'email'}
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.email}
							touch={form.touched.email}
							placeholder={'E-mail'}
							type={'email'}
							color='white'
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
									/>
								</svg>
							}
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
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
									/>
								</svg>
							}
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
