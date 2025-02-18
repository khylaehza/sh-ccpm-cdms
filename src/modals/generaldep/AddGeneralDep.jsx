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

	const handlePdfChange = (event, field) => {
		console.log('sample', event, field);
		setPdfFiles({ ...pdfFiles, [field]: event.target.files[0] });
	};

	const { addItem } = useData();

	const form = useFormik({
		initialValues: {
			created_at: moment().format(),
			project_name: '',
			project_briefing: null,
			costing: null,
			quotation: null,
			client_po: null,
			pur_of_raw_materials: null,
			dr: null,
			sl: null,
			cr: null,
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
