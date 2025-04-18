import React, { useMemo } from 'react';
import { CusInput } from '../shared';

const GeneralDepForm = ({ form, handleFileUpload, department }) => {
	const isFinance = department === 'finance';
	const isProductDevelopment = department === 'product development';
	const isProductActivation = department === 'product and activation';

	const visibleFieldCount = useMemo(() => {
		let projectNameSpan = 8;

		if (isFinance) projectNameSpan = 7; // project briefing
		if (isProductActivation) projectNameSpan = 2;
		if (isProductDevelopment) projectNameSpan = 4;

		return projectNameSpan; // At least 1 visible field
	}, [isFinance, isProductDevelopment, isProductActivation]);

	const colClass = useMemo(() => {
		switch (visibleFieldCount) {
			case 2:
				return 'grid-cols-2';
			case 4:
				return 'grid-cols-3';
			case 7:
				return 'grid-cols-7';
			case 8:
				return 'grid-cols-8';
			case 9:
				return 'grid-cols-9';

			default:
				return 'grid-cols-1';
		}
	}, [visibleFieldCount]);

	const colSpanClass = useMemo(
		() => `col-span-${visibleFieldCount}`,
		[visibleFieldCount]
	);

	return (
		<div className='mt-6 overflow-x-auto pb-5'>
			{/* Row 1 */}
			<div className={`grid ${colClass} min-w-max mb-4`}>
				<div className={`${colSpanClass}`}>
					<CusInput
						name='project_name'
						label='Project Name'
						value={form.values.project_name}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						error={form.errors.project_name}
						touch={form.touched.project_name}
					/>
				</div>
			</div>

			{/* Row 2 */}
			<div className={`grid ${colClass} gap-4 min-w-max`}>
				{/* Project Briefing */}
				{!isProductActivation && (
					<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
						<CusInput
							name='project_briefing'
							label='Project Briefing'
							type='file'
							onChange={handleFileUpload}
						/>
						<CusInput
							name='project_briefing_date'
							label='Date'
							value={form.values.project_briefing_date}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.project_briefing_date}
							touch={form.touched.project_briefing_date}
							type='date'
						/>
					</div>
				)}

				{/* Costing */}
				{!isProductDevelopment && !isProductActivation && (
					<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
						<CusInput
							name='costing'
							label='Costing'
							type='file'
							onChange={handleFileUpload}
						/>
						<CusInput
							name='costing_date'
							label='Date'
							value={form.values.costing_date}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.costing_date}
							touch={form.touched.costing_date}
							type='date'
						/>
						<CusInput
							name='costing_amt'
							label='Total Amount'
							value={form.values.costing_amt}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.costing_amt}
							touch={form.touched.costing_amt}
							type='number'
						/>
					</div>
				)}

				{/* Quotation */}
				{!isFinance &&
					!isProductActivation &&
					!isProductDevelopment && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='quotation'
								label='Quotation'
								type='file'
								onChange={handleFileUpload}
							/>
							<CusInput
								name='quotation_date'
								label='Date'
								value={form.values.quotation_date}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.quotation_date}
								touch={form.touched.quotation_date}
								type='date'
							/>
							<CusInput
								name='quotation_text'
								label='Quotation 1'
								value={form.values.quotation_text}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.quotation_text}
								touch={form.touched.quotation_text}
							/>
						</div>
					)}

				{/* Client PO */}
				<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
					<CusInput
						name='client_po'
						label='Client PO'
						type='file'
						onChange={handleFileUpload}
					/>
					<CusInput
						name='client_date'
						label='Date'
						value={form.values.client_date}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						error={form.errors.client_date}
						touch={form.touched.client_date}
						type='date'
					/>
					<CusInput
						name='client_qty'
						label='Items Quantity'
						value={form.values.client_qty}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						error={form.errors.client_qty}
						touch={form.touched.client_qty}
						type='number'
					/>
					<CusInput
						name='costing_specifies'
						label='Specifies'
						value={form.values.costing_specifies}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						error={form.errors.costing_specifies}
						touch={form.touched.costing_specifies}
					/>
				</div>

				{/* Raw Materials */}
				{!isProductActivation && (
					<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
						<CusInput
							name='pur_of_raw_materials'
							label='Raw Materials'
							type='file'
							onChange={handleFileUpload}
						/>
						<CusInput
							name='purchase_date'
							label='Date'
							value={form.values.purchase_date}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.purchase_date}
							touch={form.touched.purchase_date}
							type='date'
						/>
						<CusInput
							name='purchase_amt'
							label='Total Amount'
							value={form.values.purchase_amt}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.purchase_amt}
							touch={form.touched.purchase_amt}
							type='number'
						/>
					</div>
				)}

				{/* DR */}
				{!isProductDevelopment && (
					<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
						<CusInput
							name='dr'
							label='DR'
							type='file'
							onChange={handleFileUpload}
						/>
						<CusInput
							name='dr_date'
							label='Date'
							value={form.values.dr_date}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.dr_date}
							touch={form.touched.dr_date}
							type='date'
						/>
					</div>
				)}

				{/* SL */}
				{!isProductDevelopment && !isProductActivation && (
					<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
						<CusInput
							name='sl'
							label='SL'
							type='file'
							onChange={handleFileUpload}
						/>
						<CusInput
							name='sl_date'
							label='Date'
							value={form.values.sl_date}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.sl_date}
							touch={form.touched.sl_date}
							type='date'
						/>
					</div>
				)}

				{/* CR */}
				{!isProductDevelopment && !isProductActivation && (
					<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
						<CusInput
							name='cr'
							label='CR'
							type='file'
							onChange={handleFileUpload}
						/>
						<CusInput
							name='cr_date'
							label='Date'
							value={form.values.cr_date}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.cr_date}
							touch={form.touched.cr_date}
							type='date'
						/>
						<CusInput
							name='cr_amt'
							label='Total Amount'
							value={form.values.cr_amt}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.cr_amt}
							touch={form.touched.cr_amt}
							type='number'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default GeneralDepForm;
