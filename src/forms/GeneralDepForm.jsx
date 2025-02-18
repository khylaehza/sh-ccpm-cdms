import React from 'react';
import { CusInput } from '../shared';

const GeneralDepForm = ({ form, handleFileUpload }) => {
	return (
		<div className='mt-6 flex flex-col gap-4'>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='project_name'
					label={'Project Name'}
					value={form.values.project_name}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.project_name}
					touch={form.touched.project_name}
				/>
			</div>

			<div className='text-black grid grid-cols-1'>
				<CusInput
					name='project_briefing'
					label={'Project Briefing'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>

			<div className='text-black grid grid-cols-1'>
				<CusInput
					name='costing'
					label={'Costing'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>
			<div className='text-black grid grid-cols-1'>
				<CusInput
					name='quotation'
					label={'Quotation'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>

			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='client_po'
					label={'Client PO'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='pur_of_raw_materials'
					label={'Purchase of Raw Materials'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>

			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='dr'
					label={'DR'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='sl'
					label={'SL'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>
			<div className='text-black grid grid-cols-1 gap-3'>
				<CusInput
					name='cr'
					label={'CR'}
					type='file'
					onChange={handleFileUpload}
				/>
			</div>
		</div>
	);
};

export default GeneralDepForm;
