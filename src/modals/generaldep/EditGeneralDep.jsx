import React, { useState } from 'react';
import { CusModal } from '../../shared';
import { GeneralDepForm } from '../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../DataContext';

const EditGeneralDep = ({ curRow, setEditGeneralDep, showEditGeneralDep }) => {
	const [imageFile, setImageFile] = useState(null);

	const OnImgChange = (event) => {
		setImageFile(event.target.files[0]);
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
			const updatedItem = value;
			const tableName = 'generalDep';
			const newImageFile = imageFile;
			const existingImageUrl = imageFile ? curRow.image : null;

			editItem(
				tableName,
				itemId,
				updatedItem,
				newImageFile,
				existingImageUrl
			);

			actions.resetForm();
			setImageFile(null);
			setEditGeneralDep(false);
		},
	});

	return (
		<div>
			<CusModal
				btnLabel={'Edit'}
				content={
					<GeneralDepForm
						form={editForm}
						handleImage={OnImgChange}
					/>
				}
				title={'Edit General Department Data'}
				setOpen={setEditGeneralDep}
				setImageFile={setImageFile}
				open={showEditGeneralDep}
				form={editForm}
			/>
		</div>
	);
};

export default EditGeneralDep;
