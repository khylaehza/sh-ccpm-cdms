import React from 'react';
import { Header } from '../layout';
import { CusTable } from '../shared';
const UserRegistrationPage = () => {
	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'role', label: 'Role' },
		{ key: 'department', label: 'Department' },
		{ key: 'uname', label: 'Username' },
	];
	const rows = [];

	return (
		<div className='flex font-montserrat'>
			<div className='flex flex-1 flex-col bg-white text-white w-screen h-screen '>
				<Header />
				<div className='flex-1 p-16 gap-12 text-black  flex flex-col gap-4'>
					<div>
						<div className='text-lg font-semibold'>Hi, Rafael!</div>
						<div>Manage the user accounts here.</div>
					</div>
					<CusTable
						columns={columns}
						rows={rows}
						tableName={'Registration'}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserRegistrationPage;
