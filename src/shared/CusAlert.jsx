import React from 'react';

const CusAlert = ({
	open,
	setOpen,
	title,
	content,
	onConfirm,
	approve = false,
	text = 'Deleted',
}) => {
	const onCancel = () => {
		setOpen(false);
	};

	const onDelete = () => {
		onConfirm();
		setOpen(false);
	};

	return (
		<div>
			<div
				className={`relative z-10 ${open ? 'block' : 'hidden'}`}
				aria-labelledby='modal-title'
				role='dialog'
				aria-modal='true'
			>
				<div
					className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
					aria-hidden='true'
				></div>

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
						<div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
							<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
								<div className='flex justify-between w-full items-center'>
									<h3
										className='text-base font-semibold leading-6 text-gray-900'
										id='modal-title'
									>
										{title}
									</h3>
									<button
										type='button'
										className='text-gray-400 hover:text-gray-600 bg-transparent outline-none hover-none border-none'
										onClick={onCancel}
									>
										&times;
									</button>
								</div>
								<div className='mt-2'>
									<div className='text-sm text-gray-500'>
										{content}
									</div>
								</div>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
								<button
									type='button'
									className={`inline-flex w-full justify-center rounded-md ${approve ? 'bg-green-700 ' : 'bg-red-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm ${approve ? 'hover:bg-green-800 ' : 'hover:bg-red-700'}  sm:ml-3 sm:w-auto`}
									onClick={onDelete}
								>
									{text}
								</button>
								<button
									type='button'
									className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
									onClick={onCancel}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CusAlert;
