import React, { useState } from 'react';
import { CusPrimButton, CusModal } from '../../shared';
import { GeneralDepForm } from '../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../DataContext';
import moment from 'moment';

const AddGeneralDep = () => {
	const [showAddGeneralDep, setAddGeneralDep] = useState(false);
	const [pdfFiles, setPdfFiles] = useState({});

	const handlePdfChange = (event) => {
		const { name, files } = event.target;
		if (files.length > 0) {
			setPdfFiles((prevFiles) => ({
				...prevFiles,
				[name]: files[0],
			}));
		}
	};

	const { addItem } = useData();

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
			sl: null,
			sl_date: '',
			cr: null,
			cr_date: '',
			cr_amt: '',
		},
		onSubmit: (values, actions) => {
			addItem(values, 'generalDep', null, pdfFiles);
			actions.resetForm();
			setPdfFiles({});
			setAddGeneralDep(false);
		},
	});

	return (
		<div>
			<CusPrimButton
				label={'ADD PROJECT'}
				color={'black'}
				text={'white'}
				w='36'
				onClick={() => setAddGeneralDep(true)}
			/>
			<CusModal
				btnLabel={'Add'}
				content={
					<GeneralDepForm
						form={form}
						handleFileUpload={handlePdfChange}
					/>
				}
				title={'Add General Department Data'}
				setOpen={setAddGeneralDep}
				open={showAddGeneralDep}
				form={form}
			/>
		</div>
	);
};

export default AddGeneralDep;
