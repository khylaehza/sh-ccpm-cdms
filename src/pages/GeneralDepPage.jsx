import React, { useState } from 'react';
import { Header, SideNav } from '../layout';
import { CusTable } from '../shared';
import { AddGeneralDep, EditGeneralDep } from '../modals';
import { useData } from '../DataContext';

const GeneralDepPage = () => {
	const { generalDep } = useData();
	const [curSearch, setCurSearch] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [curRow, setCurRow] = useState();
	const [showEditGeneralDep, setEditGeneralDep] = useState(false);

	const columns = [
		{ key: 'created_at', label: 'Created At' },
		{ key: 'project_name', label: 'Project Name' },
		{ key: 'project_briefing', label: 'Project Briefing' },
		{ key: 'costing', label: 'Costing' },
		{ key: 'quotation', label: 'Quotation' },
		{ key: 'client_po', label: 'Client PO' },
		{ key: 'pur_of_raw_materials', label: 'Purchase of Raw Materials' },
		{ key: 'dr', label: 'DR' },
		{ key: 'sl', label: 'SL' },
		{ key: 'cr', label: 'CR' },
	];

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

	return (
		<div className='flex font-montserrat'>
			<SideNav />
			<div className='flex flex-1 flex-col bg-white text-white w-screen h-screen'>
				<Header />
				<div className='flex-1 p-16 gap-12 text-black flex flex-col gap-4'>
					<div className='flex flex-row justify-between'>
						<div>
							<div className='text-lg font-semibold'>
								Hi, Admin!
							</div>
							<div>Manage General Department records here.</div>
						</div>
						<AddGeneralDep />
					</div>
					<CusTable
						columns={columns}
						rows={rows}
						tableName={'generalDep'}
						setCurRow={setCurRow}
						setEdit={setEditGeneralDep}
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
		</div>
	);
};

export default GeneralDepPage;
