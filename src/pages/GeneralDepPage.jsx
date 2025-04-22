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
		{ key: 'project_briefing', label: 'Project Brief', type: 'pdf' },
		{ key: 'costing', label: 'Costing Form', type: 'pdf' },
		{ key: 'quotation', label: 'Cost Estimate', type: 'pdf' },
		{ key: 'client_po', label: 'Client P.O', type: 'pdf' },
		// {
		// 	key: 'pur_of_raw_materials',
		// 	label: 'Purchase of Raw Materials',
		// 	type: 'pdf',
		// },
		{ key: 'dr', label: 'Delivery Receipt', type: 'pdf' },
		{ key: 'sl', label: 'Sales Invoice', type: 'pdf' },
		{ key: 'cr', label: 'Collection Receipt', type: 'pdf' },
	];

	let fields = {
		'Costing Form': ['costing_date'],
		'Cost Estimate': ['quotation_date'],
		'Client P.O': ['client_date'],
		'Total Amount of Approved PR': ['purchase_date', 'purchase_amt'],
		'Delivery Receipt': ['dr_date'],
		'Sales Invoice': ['sl_date'],
		'Collection Receipt': ['cr_date', 'cr_amt'],
	};

	const department = curUser?.department?.toLowerCase();
	const role = curUser?.role?.toLowerCase();

	if (department === 'finance') {
		fields = {
			'Total Amount of Approved PR': ['approved_date', 'approved_amt'],
			'Sales Invoice': ['sl_date'],
		};
	} else if (department === 'product development') {
		fields = {
			'Costing Form': ['costing_date'],
		};
	} else if (department === 'marketing') {
		fields = {
			'Cost Estimate': ['quotation_date'],
			'Client P.O': ['client_date', 'client_qty', 'costing_specifies'],
		};
	} else if (department === 'product and activation') {
		fields = {
			'Delivery Receipt': ['dr_date'],
		};
	} else if (department === 'general' && role === 'super admin') {
		fields = {
			'Costing Form': ['costing_date'],
			'Cost Estimate': ['quotation_date'],
			'Client P.O': ['client_date', 'client_qty', 'costing_specifies'],
			'Total Amount of Approved PR': ['approved_date', 'approved_amt'],
			'Delivery Receipt': ['dr_date'],
			'Sales Invoice': ['sl_date'],
			'Collection Receipt': ['cr_date', 'cr_amt'],
		};
	} else if (department === 'general' && role != 'super admin') {
		fields = {
			'Client P.O': ['client_date', 'client_qty', 'costing_specifies'],
			'Collection Receipt': ['cr_date', 'cr_amt'],
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
