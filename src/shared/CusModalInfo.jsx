import moment from 'moment';
const CusModalInfo = ({ title, data, open, setOpen, dateModified }) => {
	const onClose = () => {
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
						<div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 max-w-[80vw] overflow-x-auto'>
							<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
								<div className='flex justify-between w-full items-center'>
									<h3
										className='text-lg font-semibold text-secondary'
										id='modal-title'
									>
										{title}
									</h3>
									<button
										type='button'
										className='text-gray-400 hover:text-gray-600 bg-transparent outline-none border-none text-2xl'
										onClick={onClose}
									>
										&times;
									</button>
								</div>

								<div className='mt-4 space-y-4'>
									{Object.entries(data).map(
										([group, values]) => {
											return (
												<div key={group}>
													<h4 className='text-md font-bold text-gray-800'>
														{group}
													</h4>
													<div className='grid grid-cols-2 gap-4'>
														{Object.entries(
															values
														).map(
															([key, value]) => {
																return (
																	<div
																		key={
																			key
																		}
																		className='flex gap-1'
																	>
																		<span className='text-sm font-semibold text-gray-700'>
																			{key.includes(
																				'date'
																			) &&
																				`DATE`}
																			{key.includes(
																				'amt'
																			) &&
																				`Amount`}
																			:
																		</span>
																		<span className='text-sm text-gray-900'>
																			{value ||
																				'No Data Available'}
																		</span>
																	</div>
																);
															}
														)}
													</div>
												</div>
											);
										}
									)}
									<h4 className='text-md font-bold text-gray-800'>
										Date Modified
									</h4>
									<div className='grid grid-cols-2 gap-4'>
										<div className='flex gap-1'>
											<span className='text-sm text-gray-900'>
												{moment(dateModified).format(
													'YYYY-MM-DD HH:mm:ss'
												)}
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse'>
								<button
									type='button'
									className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
									onClick={onClose}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CusModalInfo;
