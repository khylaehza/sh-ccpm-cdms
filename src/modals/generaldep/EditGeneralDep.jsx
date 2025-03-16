import React, { useState, useEffect } from 'react';
import { CusModal } from '../../shared';
import { GeneralDepForm } from '../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../DataContext';

const EditGeneralDep = ({ curRow, setEditGeneralDep, showEditGeneralDep }) => {
	const [pdfFiles, setPdfFiles] = useState({});
	const [fileNames, setFileNames] = useState({});

	useEffect(() => {
		// Initialize existing file names
		setFileNames({
			project_briefing: curRow.project_briefing
				? curRow.project_briefing.split('/').pop()
				: '',
			costing: curRow.costing ? curRow.costing.split('/').pop() : '',
			quotation: curRow.quotation
				? curRow.quotation.split('/').pop()
				: '',
			client_po: curRow.client_po
				? curRow.client_po.split('/').pop()
				: '',
			pur_of_raw_materials: curRow.pur_of_raw_materials
				? curRow.pur_of_raw_materials.split('/').pop()
				: '',
			dr: curRow.dr ? curRow.dr.split('/').pop() : '',
			sl: curRow.sl ? curRow.sl.split('/').pop() : '',
			cr: curRow.cr ? curRow.cr.split('/').pop() : '',
		});
	}, [curRow]);

	const handlePdfChange = (event) => {
		const { name, files } = event.target;
		if (files.length > 0) {
			setPdfFiles((prev) => ({
				...prev,
				[name]: files[0],
			}));

			// Update displayed file name
			setFileNames((prev) => ({
				...prev,
				[name]: files[0].name,
			}));
		}
	};

	const { editItem } = useData();

	const editForm = useFormik({
		initialValues: {
			created_at: curRow.created_at,
			project_name: curRow.project_name,
			project_briefing: curRow.project_briefing,
			costing: curRow.costing,
			quotation: curRow.quotation,
			client_po: curRow.client_po,
			pur_of_raw_materials: curRow.pur_of_raw_materials,
			dr: curRow.dr,
			sl: curRow.sl,
			cr: curRow.cr,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			project_name: Yup.string().required('Project Name is required.'),
		}),
		onSubmit: (value, actions) => {
			const itemId = curRow.key;
			const tableName = 'generalDep';

			editItem(tableName, itemId, value, null, null, pdfFiles);

			actions.resetForm();
			setPdfFiles({});
			setEditGeneralDep(false);
		},
	});

	return (
		<CusModal
			btnLabel='Edit'
			content={
				<GeneralDepForm
					form={editForm}
					handleFileUpload={handlePdfChange}
					fileNames={fileNames}
				/>
			}
			title='Edit General Department Data'
			setOpen={setEditGeneralDep}
			open={showEditGeneralDep}
			form={editForm}
		/>
	);
};

export default EditGeneralDep;
