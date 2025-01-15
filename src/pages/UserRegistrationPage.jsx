import React from 'react';
import { Header } from '../layout';
import { CusTable } from '../shared';
import { AddUsers } from '../modals';
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
				<div className='flex-1 p-16 gap-12 text-black flex flex-col gap-4'>
					<div className='flex flex-row justify-between'>
						<div>
							<div className='text-lg font-semibold'>
								Hi, Rafael!
							</div>
							<div>Manage the user accounts here.</div>
						</div>

						<AddUsers />
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
