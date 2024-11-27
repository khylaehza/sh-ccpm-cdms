// import CusImgViewer from './CusImgViewer';
import { useState } from 'react';
import { useData } from '../DataContext';
import moment from 'moment';
// import CusAlert from './CusAlert';

const CusTable = ({
	columns,
	rows,
	tableName,
	setCurRow,
	setEditBook,
	action = true,
}) => {
	const [img, setImg] = useState('');
	const [openImg, setOpenImg] = useState(false);
	const [deleteOpen, setOpenDelete] = useState(false);
	const [deleteItems, setDeleteItems] = useState(false);
	// const { deleteItem, addItem, books, editItem } = useData();
	const [itemId, setItemId] = useState(null);
	const [tblName, setTableName] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	const onEdit = (row) => {
		setCurRow(row);
		setEditBook(true);
	};

	const onDelete = (row) => {
		const { key: itemId, image } = row;
		const imageUrl = image || null;

		setItemId(itemId);
		setTableName(tableName);
		setImageUrl(imageUrl);

		setDeleteItems(row);
		setOpenDelete(true);
	};

	return (
		<div
			className='overflow-x-auto overflow-y-auto '
			style={{ maxHeight: '80vh', maxWidth: '100%' }}
		>
			<table className='table-fixed w-full'>
				<thead>
					<tr className=''>
						{columns.map((col, ind) => (
							<th
								key={ind}
								className='p-6 text-center text-sm bg-primary text-white font-montserrat'
							>
								{col.label}
							</th>
						))}
						{action && (
							<th className='p-6 text-center text-sm bg-primary text-white font-montserrat'>
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{Object.keys(rows).length == 0 ? (
						<tr className='text-center text-xs p-8 mt-5'>
							<td colSpan={columns.length}>
								No data available here.
							</td>
						</tr>
					) : (
						<>
							{rows.map((row, index) => (
								<tr
									key={index}
									className={`${
										index === 0
											? 'bg-body/[.4]'
											: index % 2 === 1
												? 'bg-white'
												: 'bg-body/[.4]'
									} hover:bg-body text-xs`}
								>
									{columns.map((col, colIndex) => (
										<td
											key={colIndex}
											className='w-full p-2'
										>
											{col.type === 'image' ? (
												<>
													<img
														src={row[col.key]}
														alt={`${col.label}`}
														className='w-15 h-15 object-cover cursor-pointer'
														onClick={() => {
															setOpenImg(true);
															setImg(
																row[col.key]
															);
														}}
													/>
												</>
											) : col.type === 'time' ? (
												moment(row[col.key]).format(
													'MM-DD-YYYY'
												)
											) : (
												row[col.key]
											)}
										</td>
									))}

									{action && (
										<td className='text-xs p-2'>
											<div className='flex flex-col gap-2 justify-center'>
												<button
													onClick={() => onEdit(row)}
													className='bg-yellow-200 p-2 rounded-full hover:bg-yellow-300 flex flex-row gap-1 items-center'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-3 w-3'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
														strokeWidth='2'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M15.232 5.232l3.536 3.536M16.732 2.732a2.828 2.828 0 114 4l-12 12-4.5 1.5 1.5-4.5 12-12z'
														/>
													</svg>
													Edit
												</button>
												<button
													onClick={() =>
														onDelete(row)
													}
													className='bg-red-200 p-2 rounded-full hover:bg-red-300 flex flex-row gap-1 items-center'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-3 w-3'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
														strokeWidth='2'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M6 18L18 6M6 6l12 12'
														/>
													</svg>
													<>Del</>
												</button>
											</div>
										</td>
									)}
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
			{/* <CusImgViewer
				src={img}
				alt={img}
				openImage={openImg}
				setOpenImage={setOpenImg}
			/>
			<CusAlert
				open={deleteOpen}
				setOpen={setOpenDelete}
				title='Confirm Deletion'
				content='Are you sure you want to delete this item?'
				onConfirm={handleDelete}
			/> */}
		</div>
	);
};
export default CusTable;
