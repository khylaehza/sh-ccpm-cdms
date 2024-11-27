import React from 'react';
import logo from '../assets/cdms-logo.png';
const Header = () => {
	return (
		<div className='h-24 bg-primary shadow-xl flex items-center justify-between gap-6 p-6 font-montserrat'>
			<img
				src={logo}
				alt='Logo'
				className='w-auto h-16'
			/>
			<div className='text-lg font-bold'>Centralized Data Management</div>
			<div className='flex flex-row items-center justify-center gap-4'>
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
						d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
					/>
				</svg>
				<div className='flex flex-col'>
					<div className='text-sm font-semibold'>
						Rafael Joshua Reyes
					</div>
					<div className='text-xs'>Admin</div>
				</div>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='size-4'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m19.5 8.25-7.5 7.5-7.5-7.5'
					/>
				</svg>
			</div>
		</div>
	);
};

export default Header;
