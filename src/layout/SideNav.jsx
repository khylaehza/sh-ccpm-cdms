import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideNav = ({ onClose }) => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='w-64 h-screen bg-primary50 flex flex-col p-2 text-white shadow-2xl transition-transform duration-300'>
			<div className='flex justify-end mb-4'>
				<button
					onClick={onClose}
					className='text-white bg-primary50  border-none focus:outline-none"'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			</div>
			<div className='flex flex-col p-12 justify-between h-full'>
				<nav>
					<ul className='font-medium font-montserrat'>
						<li
							className='p-2 hover:bg-primary hover:text-gray hover:cursor-pointer flex flex-row gap-2'
							onClick={() => navigate('/registration')}
						>
							Registration
						</li>
						<li
							className='p-2 hover:bg-primary hover:text-gray hover:cursor-pointer flex flex-row gap-2'
							onClick={() => navigate('/general')}
						>
							General Department
						</li>
					</ul>
				</nav>
				<div className='flex items-center justify-center w-full'>
					<button
						className='w-full bg-black/[0.3]'
						onClick={() => navigate('/')}
					>
						LOG OUT
					</button>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
