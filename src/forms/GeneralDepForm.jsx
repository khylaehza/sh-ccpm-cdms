import React, { useMemo } from 'react';
import { CusInput } from '../shared';

const GeneralDepForm = ({
	form,
	handleFileUpload,
	role,
	department,
	resetCounter,
}) => {
	const isAdmin = role === 'super admin' && department === 'general';
	const isGeneral = department === 'general' && role != 'super admin';
	const isFinance = department === 'finance';
	const isMarketing = department === 'marketing';
	const isProductDevelopment = department === 'product development';
	const isProductActivation = department === 'product and activation';

	const visibleFieldCount = useMemo(() => {
		let projectNameSpan = 8;

		if (isAdmin) projectNameSpan = 8;
		if (isGeneral) projectNameSpan = 2;
		if (isFinance) projectNameSpan = 2;
		if (isMarketing) projectNameSpan = 3;
		if (isProductActivation) projectNameSpan = 1;
		if (isProductDevelopment) projectNameSpan = 1;

		return projectNameSpan;
	}, [
		isAdmin,
		isGeneral,
		isMarketing,
		isFinance,
		isProductDevelopment,
		isProductActivation,
	]);

	const colClass = useMemo(() => {
		switch (visibleFieldCount) {
			case 2:
				return 'grid-cols-2';
			case 3:
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
						placeholder={'CE# Client 2025'}
					/>
				</div>
			</div>

			{/* Row 2 */}
			<div className={`grid ${colClass} gap-4 min-w-max`}>
				{/* Project Briefing */}
				{!isProductActivation &&
					!isGeneral &&
					!isFinance &&
					!isProductDevelopment && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='project_briefing'
								label='Project Brief'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
				{!isProductActivation &&
					!isGeneral &&
					!isFinance &&
					!isMarketing && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='costing'
								label='Costing Form'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
								placeholder={'0'}
							/>
						</div>
					)}

				{/* Quotation */}
				{!isFinance &&
					!isProductActivation &&
					!isProductDevelopment &&
					!isGeneral &&
					!isFinance && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='quotation'
								label='Cost Estimate'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
								label='CE #'
								value={form.values.quotation_text}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.quotation_text}
								touch={form.touched.quotation_text}
							/>
						</div>
					)}

				{/* Client PO */}
				{!isFinance &&
					!isProductDevelopment &&
					!isProductActivation && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='client_po'
								label='Client P.O'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
								placeholder={'0'}
							/>
							<CusInput
								name='costing_specifies'
								label='Specifics'
								value={form.values.costing_specifies}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.costing_specifies}
								touch={form.touched.costing_specifies}
							/>
						</div>
					)}

				{/* Raw Materials */}
				{/* !isProductActivation &&
					!isGeneral &&
					!isFinance &&
					!isMarketing &&
					!isProductDevelopment && (
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
					) */}

				{/* DR */}
				{!isProductDevelopment &&
					!isGeneral &&
					!isFinance &&
					!isMarketing && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='dr'
								label='Delivery Receipt'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
							<CusInput
								name='dr_amt'
								label='Total Amount'
								value={form.values.dr_amt}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.dr_amt}
								touch={form.touched.dr_amt}
								type='number'
								placeholder={'0'}
							/>
						</div>
					)}

				{/* SL */}
				{!isProductDevelopment &&
					!isProductActivation &&
					!isGeneral &&
					!isMarketing && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='sl'
								label='Sales Invoice'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
				{!isProductDevelopment &&
					!isProductActivation &&
					!isFinance &&
					!isMarketing && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='cr'
								label='Collection Receipt'
								type='file'
								onChange={handleFileUpload}
								resetTrigger={resetCounter}
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
								placeholder={'0'}
							/>
						</div>
					)}
				{/* total amt of approved pr */}
				{!isGeneral &&
					!isMarketing &&
					!isProductDevelopment &&
					!isProductActivation && (
						<div className='col-span-1 min-w-[80px] max-w-[180px] flex flex-col gap-2'>
							<CusInput
								name='approved_amt'
								label='Approved P.R Total Amt'
								value={form.values.approved_amt}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.approved_amt}
								touch={form.touched.approved_amt}
								type='number'
								placeholder={'0'}
							/>
							<CusInput
								name='approved_date'
								label='Date'
								value={form.values.approved_date}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.approved_date}
								touch={form.touched.approved_date}
								type='date'
							/>
						</div>
					)}
			</div>
		</div>
	);
};

export default GeneralDepForm;
