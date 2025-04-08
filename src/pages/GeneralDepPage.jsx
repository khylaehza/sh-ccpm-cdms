import React, { useState } from 'react';
import { Header, SideNav } from '../layout';
import { CusSearch, CusTable, CusSort, CusNotif } from '../shared';
import { AddGeneralDep, EditGeneralDep } from '../modals';
import { useData } from '../DataContext';

const GeneralDepPage = () => {
	const { generalDep, curUser, prompt } = useData();
	const [curSearch, setCurSearch] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [showSideNav, setShowSideNav] = useState(
		curUser?.role === 'Super Admin'
	);
	const [curRow, setCurRow] = useState();
	const [showEditGeneralDep, setEditGeneralDep] = useState(false);

	let columns = [
		{ key: 'created_at', label: 'Created At', type: 'time' },
		{ key: 'project_name', label: 'Project Name', type: 'title' },
		{ key: 'project_briefing', label: 'Project Briefing', type: 'pdf' },
		{ key: 'costing', label: 'Costing', type: 'pdf' },
		{ key: 'quotation', label: 'Quotation', type: 'pdf' },
		{ key: 'client_po', label: 'Client PO', type: 'pdf' },
		{
			key: 'pur_of_raw_materials',
			label: 'Purchase of Raw Materials',
			type: 'pdf',
		},
		{ key: 'dr', label: 'DR', type: 'pdf' },
		{ key: 'sl', label: 'SL', type: 'pdf' },
		{ key: 'cr', label: 'CR', type: 'pdf' },
	];

	let fields = {
		Costing: ['costing_date'],
		Quotation: ['quotation_date'],
		'Client P.O': ['client_date'],
		'Purchase of Raw Materials': ['purchase_date', 'purchase_amt'],
		DR: ['dr_date'],
		SL: ['sl_date'],
		CR: ['cr_date', 'cr_amt'],
	};

	const department = curUser?.department?.toLowerCase();

	if (department === 'finance') {
		// columns = columns.filter((col) => col.key !== 'quotation');
		fields = Object.fromEntries(
			Object.entries(fields).filter(([key]) => key !== 'Quotation')
		);
	} else if (department === 'product development') {
		// columns = columns.filter((col) =>
		// 	[
		// 		'created_at',
		// 		'project_name',
		// 		'project_briefing',
		// 		'client_po',
		// 		'pur_of_raw_materials',
		// 	].includes(col.key)
		// );
		fields = {
			Created: ['created_at'],
			'Project Name': ['project_name'],
			'Client PO': ['client_date'],
			'Purchase of Raw Materials': ['purchase_date', 'purchase_amt'],
		};
	} else if (department === 'product and activation') {
		// columns = columns.filter((col) =>
		// 	['created_at', 'project_name', 'client_date', 'dr'].includes(
		// 		col.key
		// 	)
		// );
		fields = {
			Created: ['created_at'],
			'Project Name': ['project_name'],
			'Client P.O': ['client_date'],
			DR: ['dr_date'],
		};
	}

	const rows =
		generalDep?.length > 0
			? generalDep
					.filter((data) =>
						curSearch.toLowerCase() === ''
							? data
							: data.project_name
									.toLowerCase()
									.includes(curSearch.toLowerCase())
					)
					.sort((a, b) => {
						const dateA = new Date(a.created_at);
						const dateB = new Date(b.created_at);
						return sortOrder === 'asc'
							? dateA - dateB
							: dateB - dateA;
					})
			: [];

	const toggleSideNav = () => {
		setShowSideNav((prev) => !prev);
	};

	return (
		<div className='flex font-montserrat'>
			{curUser?.role === 'Super Admin' && showSideNav && (
				<SideNav onClose={() => setShowSideNav(false)} />
			)}
			<div className='flex flex-1 flex-col bg-white text-white w-screen h-screen'>
				<Header toggleSideNav={toggleSideNav} />
				<div className='flex-1 p-16 gap-12 text-black flex flex-col gap-4'>
					<div className='flex flex-row justify-between'>
						<div>
							<div className='text-lg font-semibold'>
								Hi, {curUser?.name?.split(' ')[0]}!
							</div>
							<div>Manage the projects here.</div>
						</div>
						<div className='flex flex-row w-1/2 h-16 items-center justify-end gap-3'>
							<CusSearch
								curSearch={curSearch}
								setCurSearch={setCurSearch}
								label={'project name'}
							/>
							<CusSort
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
							/>
							<AddGeneralDep />
						</div>
					</div>
					<CusTable
						columns={columns}
						rows={rows}
						tableName={'generalDep'}
						setCurRow={setCurRow}
						setEdit={setEditGeneralDep}
						fields={fields}
					/>
				</div>
				{curRow && (
					<EditGeneralDep
						curRow={curRow}
						setEditGeneralDep={setEditGeneralDep}
						showEditGeneralDep={showEditGeneralDep}
					/>
				)}
			</div>
			<CusNotif prompt={prompt} />
		</div>
	);
};

export default GeneralDepPage;
