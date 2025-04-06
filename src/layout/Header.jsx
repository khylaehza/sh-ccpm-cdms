import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cdms-logo.png';
import { useData } from '../DataContext';

const Header = ({ toggleSideNav }) => {
	const { curUser, setCurUser } = useData();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('curUser');
		setCurUser();
		navigate('/');
	};

	const handleLogoClick = () => {
		if (curUser?.role === 'Super Admin') {
			toggleSideNav?.();
		} else {
			navigate('/projects');
		}
	};

	return (
		<div className='h-24 bg-primary shadow-xl flex items-center justify-between gap-6 p-6 font-montserrat'>
			<img
				src={logo}
				alt='Logo'
				className='w-auto h-28 cursor-pointer'
				onClick={handleLogoClick}
			/>
			<div className='text-lg font-bold'>Centralized Data Management</div>
			<div className='flex flex-row items-center gap-4'>
				<img
					src={curUser?.image || 'https://via.placeholder.com/40'}
					alt='User Avatar'
					className='w-10 h-10 rounded-full border'
				/>

				<div className='flex flex-col'>
					<div className='text-sm font-semibold'>{curUser?.name}</div>
					<div className='text-xs'>{curUser?.role}</div>
				</div>

				<button
					onClick={handleLogout}
					className='text-white bg-transparent focus:outline-none border-none'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-9A2.25 2.25 0 0 0 2.25 5.25v13.5A2.25 2.25 0 0 0 4.5 21h9a2.25 2.25 0 0 0 2.25-2.25V15m4.5-3h-10.5m0 0 3 3m-3-3 3-3'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Header;
