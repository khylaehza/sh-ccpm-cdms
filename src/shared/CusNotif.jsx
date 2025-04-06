import React from 'react';
import { useData } from '../DataContext';

const CusNotif = () => {
	const { isVisible, setIsVisible, prompt } = useData();

	const handleClose = () => {
		setIsVisible(false);
	};

	const notificationColors =
		prompt.stats === 'Successful'
			? {
					bg: 'bg-green-100',
					border: 'border-green-400',
					text: 'text-green-700',
				}
			: {
					bg: 'bg-red-100',
					border: 'border-red-400',
					text: 'text-red-700',
				};

	return (
		isVisible && (
			<div className='fixed bottom-5 right-5 z-50'>
				<div
					className={`${notificationColors.bg} border ${notificationColors.border} px-4 py-3 rounded flex items-center justify-between`}
				>
					<div className={`${notificationColors.text}`}>
						<strong>
							{prompt.stats === 'Successful'
								? 'Successfully saved!'
								: 'Error occurred!'}
						</strong>
						<div>{prompt.message}</div>
					</div>
					<button
						onClick={handleClose}
						className={`ml-4 ${notificationColors.text} hover:${notificationColors.text.replace(
							'700',
							'900'
						)} ${notificationColors.bg} border-none outline-none`}
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
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
		)
	);
};

export default CusNotif;
