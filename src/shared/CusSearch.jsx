import React from 'react';

const CusSearch = ({ curSearch, setCurSearch, label }) => {
	return (
		<div className='w-100px block flex flex-row items-center border rounded-lg shadow-lg  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200 h-12'>
			<input
				type='text'
				placeholder={`Search by ${label}`}
				className='px-3 py-2 h-full w-full text-black rounded-lg bg-gray-200 focus:outline-none'
				value={curSearch}
				onChange={(e) => setCurSearch(e.target.value)}
			/>
			<button className='bg-gray-200 hover:border-gray-200'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='black'
					className='size-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
					/>
				</svg>
			</button>
		</div>
	);
};

export default CusSearch;
