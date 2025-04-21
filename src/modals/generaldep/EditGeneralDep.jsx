import React, { useState, useEffect, useMemo } from 'react';
import { CusModal } from '../../shared';
import { GeneralDepForm } from '../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../DataContext';
import moment from 'moment';

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

	const { editItem, curUser } = useData();

	const initialValues = useMemo(
		() => ({
			created_at: curRow.created_at || '',
			project_name: curRow.project_name || '',
			project_briefing: curRow.project_briefing || null,
			project_briefing_date: curRow.project_briefing_date || '',
			costing: curRow.costing || null,
			costing_date: curRow.costing_date || '',
			costing_amt: curRow.costing_amt || '',
			quotation: curRow.quotation || null,
			quotation_date: curRow.quotation_date || '',
			quotation_text: curRow.quotation_text || '',
			client_po: curRow.client_po || null,
			client_date: curRow.client_date || '',
			client_qty: curRow.client_qty || '',
			costing_specifies: curRow.costing_specifies || '',
			pur_of_raw_materials: curRow.pur_of_raw_materials || null,
			purchase_date: curRow.purchase_date || '',
			purchase_amt: curRow.purchase_amt || '',
			dr: curRow.dr || null,
			dr_date: curRow.dr_date || '',
			dr_amt: curRow.dr_amt || '',
			sl: curRow.sl || null,
			sl_date: curRow.sl_date || '',
			cr: curRow.cr || null,
			cr_date: curRow.cr_date || '',
			cr_amt: curRow.cr_amt || '',
			approved_amt: curRow.approved_amt || '',
			approved_date: curRow.approved_date || '',
			modified_date: moment().format(),
		}),
		[curRow]
	);

	const editForm = useFormik({
		initialValues,
		enableReinitialize: true,
		validationSchema: Yup.object({
			project_name: Yup.string().required('Project Name is required.'),
		}),
		onSubmit: (values, actions) => {
			const itemId = curRow.key;
			const tableName = 'generalDep';

			editItem(tableName, itemId, values, null, null, pdfFiles);

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
					department={curUser?.department.toLowerCase()}
					role={curUser?.role.toLowerCase()}
				/>
			}
			title='Edit Project'
			setOpen={setEditGeneralDep}
			open={showEditGeneralDep}
			form={editForm}
		/>
	);
};

export default EditGeneralDep;
