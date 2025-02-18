import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const SideNav = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='w-64 h-screen bg-primary text-white flex flex-col p-12 justify-between shadow-2xl'>
			<div className='flex flex-col items-center gap-4'></div>
			<nav>
				<ul className='font-medium font-montserrat'>
					<li
						className='p-2 hover:bg-primary hover:text-black hover:cursor-pointer flex flex-row gap-2'
						onClick={() => navigate('/registration')}
					>
						Registration
					</li>
					<li
						className='p-2 hover:bg-primary hover:text-black hover:cursor-pointer flex flex-row gap-2'
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
	);
};

export default SideNav;
