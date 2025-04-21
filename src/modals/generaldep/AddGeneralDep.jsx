import React, { useState } from 'react';
import { CusPrimButton, CusModal } from '../../shared';
import { GeneralDepForm } from '../../forms';
import { useFormik } from 'formik';
import { useData } from '../../DataContext';
import moment from 'moment';

const AddGeneralDep = () => {
	const [showAddGeneralDep, setAddGeneralDep] = useState(false);
	const [pdfFiles, setPdfFiles] = useState({});
	const [resetCounter, setResetCounter] = useState(0);

	const handlePdfChange = (event) => {
		const { name, files } = event.target;
		if (files.length > 0) {
			setPdfFiles((prevFiles) => ({
				...prevFiles,
				[name]: files[0],
			}));
		}
	};

	const { addItem, curUser } = useData();

	// const validationSchema = Yup.object().shape({
	// 	created_at: Yup.string().required('Created date is required'),

	// 	project_name: Yup.string().required('Project name is required.'),
	// 	project_briefing: Yup.mixed().required('Project brief is required'),
	// 	project_briefing_date: Yup.date().required('Project date is required'),

	// 	costing: Yup.mixed().required('Costing file is required'),
	// 	costing_date: Yup.date().required('Costing date is required'),
	// 	costing_amt: Yup.number()
	// 		.typeError('Amount must be a number')
	// 		.required('Costing amount is required'),

	// 	quotation: Yup.mixed().required('CE file is required'),
	// 	quotation_date: Yup.date().required('CE Date is required'),
	// 	quotation_text: Yup.string().required('CE # is required'),

	// 	client_po: Yup.mixed().required('Client PO file is required'),
	// 	client_date: Yup.date().required('Client PO date is required'),
	// 	client_qty: Yup.number()
	// 		.typeError('Quantity must be a number')
	// 		.required('Items quantity is required'),
	// 	costing_specifies: Yup.string().required('Specifics are required'),

	// 	pur_of_raw_materials: Yup.mixed().required('Purchase file is required'),
	// 	purchase_date: Yup.date().required('Purchase date is required'),
	// 	purchase_amt: Yup.number()
	// 		.typeError('Amount must be a number')
	// 		.required('Purchase amount is required'),

	// 	dr: Yup.mixed().required('DR file is required'),
	// 	dr_date: Yup.date().required('DR date is required'),
	// 	dr_amt: Yup.number()
	// 		.typeError('Amount must be a number')
	// 		.required('DR amount is required'),

	// 	sl: Yup.mixed().required('SL file is required'),
	// 	sl_date: Yup.date().required('SL date is required'),

	// 	ct: Yup.string().required('CT field is required'),

	// 	cr: Yup.mixed().required('CR file is required'),
	// 	cr_date: Yup.date().required('CR date is required'),
	// 	cr_amt: Yup.number()
	// 		.typeError('Amount must be a number')
	// 		.required('CR amount is required'),

	// 	approved_amt: Yup.number()
	// 		.typeError('Amount must be a number')
	// 		.required('Approved amount is required'),
	// 	approved_date: Yup.date().required('Approved date is required'),
	// });

	const form = useFormik({
		initialValues: {
			created_at: moment().format(),
			project_name: '',
			project_briefing: null,
			project_briefing_date: '',
			costing: null,
			costing_date: '',
			costing_amt: '',
			quotation: null,
			quotation_date: '',
			quotation_text: '',
			client_po: null,
			client_date: '',
			client_qty: '',
			costing_specifies: '',
			pur_of_raw_materials: null,
			purchase_date: '',
			purchase_amt: '',
			dr: null,
			dr_date: '',
			dr_amt: '',
			sl: null,
			sl_date: '',
			ct: '',
			cr: null,
			cr_date: '',
			cr_amt: '',
			approved_amt: '',
			approved_date: '',
		},
		// validationSchema,
		onSubmit: (values, actions) => {
			addItem(values, 'generalDep', null, pdfFiles);
			actions.resetForm();
			setPdfFiles({});
			setAddGeneralDep(false);
			setResetCounter((c) => c + 1);
		},
	});

	return (
		<div>
			<CusPrimButton
				label={'ADD PROJECT'}
				color={'black'}
				text={'white'}
				w='full'
				onClick={() => setAddGeneralDep(true)}
			/>
			<CusModal
				btnLabel={'Add'}
				content={
					<GeneralDepForm
						form={form}
						handleFileUpload={handlePdfChange}
						department={curUser?.department.toLowerCase()}
						role={curUser?.role.toLowerCase()}
						resetCounter={resetCounter}
					/>
				}
				title={'Add Project'}
				setOpen={setAddGeneralDep}
				open={showAddGeneralDep}
				form={form}
			/>
		</div>
	);
};

export default AddGeneralDep;
