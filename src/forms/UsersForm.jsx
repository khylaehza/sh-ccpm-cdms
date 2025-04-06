import React from 'react';

import { CusInput, CusSelect } from '../shared';
const UsersForm = ({ form, handleImage }) => {
	return (
		<div className='mt-6 flex flex-col gap-4'>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='name'
					label={'Name'}
					value={form.values.name}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.name}
					touch={form.touched.name}
				/>
			</div>

			<div className='text-black grid grid-cols-2 gap-3'>
				<CusInput
					name='role'
					label={'Role'}
					value={form.values.role}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.role}
					touch={form.touched.role}
					placeholder={'e.g. Admin'}
				/>
				<CusSelect
					name='department'
					label={'Department'}
					value={form.values.department}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.department}
					touch={form.touched.department}
					options={[
						{ value: 'General', label: 'General' },
						{ value: 'Finance', label: 'Finance' },
						{ value: 'Marketing', label: 'Marketing' },
						{
							value: 'Product Development',
							label: 'Product Development',
						},
						// {
						// 	value: 'Inventory and Purchasing',
						// 	label: 'Inventory and Purchasing',
						// },
						{
							value: 'Product and Activation',
							label: 'Product and Activation',
						},
					]}
				/>
			</div>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='uname'
					label={'Username'}
					value={form.values.uname}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.uname}
					touch={form.touched.uname}
				/>
			</div>
			<div className='text-black grid grid-cols-2 gap-3'>
				<CusInput
					name='pass'
					label={'Password'}
					value={form.values.pass}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.pass}
					touch={form.touched.pass}
					placeholder={'•••••••••'}
					type='password'
				/>
				<CusInput
					name='conpass'
					label={'Confirm Password'}
					value={form.values.conpass}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.conpass}
					touch={form.touched.conpass}
					placeholder={'•••••••••'}
					type='password'
				/>
			</div>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='image'
					label={'Image'}
					value={form.values.image}
					onChange={handleImage}
					onBlur={form.handleBlur}
					error={form.errors.image}
					touch={form.touched.image}
					type='file'
				/>
			</div>
		</div>
	);
};

export default UsersForm;
