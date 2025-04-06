import React from 'react';
import { Header, SideNav } from '../layout';
import { CusTable, CusSearch, CusSort, CusNotif } from '../shared';
import { AddUsers, EditUsers } from '../modals';
import { useData } from '../DataContext';
import { useState } from 'react';
const UserRegistrationPage = () => {
	const { users, curUser, prompt } = useData();
	const [curSearch, setCurSearch] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [showSideNav, setShowSideNav] = useState(
		curUser?.role === 'Super Admin'
	);
	const [curRow, setCurRow] = useState();
	const [showEditUser, setEditUser] = useState(false);

	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'role', label: 'Role' },
		{ key: 'department', label: 'Department' },
		{ key: 'uname', label: 'Username' },
	];
	const rows =
		users?.length > 0
			? users
					.filter((data) => {
						return curSearch.toLowerCase() === ''
							? data
							: data.name
									.toLowerCase()
									.includes(curSearch.toLowerCase());
					})
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
			<div className='flex flex-1 flex-col bg-white text-white w-screen h-screen '>
				<Header toggleSideNav={toggleSideNav} />
				<div className='flex-1 p-16 gap-12 text-black flex flex-col gap-4'>
					<div className='flex flex-row justify-between'>
						<div>
							<div className='text-lg font-semibold'>
								Hi, {curUser?.name?.split(' ')[0]}!
							</div>
							<div>Manage the user accounts here.</div>
						</div>

						<div className='flex flex-row w-1/2 h-16 items-center justify-end gap-3'>
							<CusSearch
								curSearch={curSearch}
								setCurSearch={setCurSearch}
								label={'name'}
							/>
							<CusSort
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
							/>
							<AddUsers />
						</div>
					</div>
					<CusTable
						columns={columns}
						rows={rows}
						tableName={'users'}
						setCurRow={setCurRow}
						setEdit={setEditUser}
					/>
				</div>
				{curRow && (
					<EditUsers
						curRow={curRow}
						setEditUser={setEditUser}
						showEditUser={showEditUser}
					/>
				)}
			</div>
			<CusNotif prompt={prompt} />
		</div>
	);
};

export default UserRegistrationPage;
