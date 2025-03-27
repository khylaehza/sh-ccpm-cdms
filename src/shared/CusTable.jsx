import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useData } from '../DataContext';
import moment from 'moment';
import CusAlert from './CusAlert';
import CusModalInfo from './CusModalInfo';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'../assets/pdf.worker.min.mjs',
	import.meta.url
).toString();

const CusTable = ({
	columns,
	rows,
	tableName,
	setCurRow,
	setEdit,
	action = true,
	fields,
}) => {
	const [img, setImg] = useState('');
	const [openImg, setOpenImg] = useState(false);
	const [deleteOpen, setOpenDelete] = useState(false);
	const { deleteItem } = useData();
	const [itemId, setItemId] = useState(null);
	const [tblName, setTableName] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	const [pdfUrl, setPdfUrl] = useState(null);
	const [openPdf, setOpenPdf] = useState(false);
	const [numPages, setNumPages] = useState(null);

	const [viewData, setViewData] = useState(null);
	const [title, setTitle] = useState(null);
	const [showViewModal, setShowViewModal] = useState(false);

	const onEdit = (row) => {
		setCurRow(row);
		setEdit(true);
	};

	const onDelete = (row) => {
		const { key: itemId, image } = row;
		const imageUrl = image || null;

		setItemId(itemId);
		setTableName(tableName);
		setImageUrl(imageUrl);

		setOpenDelete(true);
	};

	const handleDelete = () => {
		deleteItem(itemId, tblName, imageUrl);
		setOpenDelete(false);
	};

	const openPdfInNewTab = (url) => {
		if (url) {
			window.open(url, '_blank');
		} else {
			console.error('Invalid PDF URL');
		}
	};

	// Handle view for 'title' type
	const handleView = (row) => {
		console.log(row, fields);

		const groupedData = Object.keys(fields).reduce((result, group) => {
			const data = fields[group].reduce((acc, key) => {
				if (row[key]) {
					// Only add non-empty values
					acc[key] = row[key];
				}
				return acc;
			}, {});

			if (Object.keys(data).length > 0) {
				result[group] = data;
			}

			return result;
		}, {});

		setViewData(groupedData);
		setShowViewModal(true);
		setTitle(row.project_name);
	};

	return (
		<div
			className='overflow-x-auto overflow-y-auto'
			style={{ maxHeight: '80vh', maxWidth: '100%' }}
		>
			<table className='table-fixed w-full'>
				<thead>
					<tr>
						{columns.map((col, ind) => (
							<th
								key={ind}
								className='p-6 text-left text-sm bg-primary50 text-white font-montserrat'
							>
								{col.label}
							</th>
						))}
						{action && (
							<th className='p-6 text-left text-sm bg-primary50 text-white font-montserrat w-32'>
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{rows.length === 0 ? (
						<tr className='text-center text-xs p-6 mt-5'>
							<td colSpan={columns.length + 1}>
								No data available here.
							</td>
						</tr>
					) : (
						rows.map((row, index) => (
							<tr
								key={index}
								className={`${
									index % 2 === 0
										? 'bg-gray-50'
										: 'bg-secondary/[.1]'
								} hover:bg-body text-xs`}
							>
								{columns.map((col, colIndex) => (
									<td
										key={colIndex}
										className='w-full p-6 text-left align-middle'
									>
										{col.type === 'image' ? (
											row[col.key] ? (
												<img
													src={row[col.key]}
													alt={`${col.label}`}
													className='w-15 h-15 object-cover cursor-pointer'
													onClick={() => {
														setOpenImg(true);
														setImg(row[col.key]);
													}}
												/>
											) : (
												<span>No Data Available</span>
											)
										) : col.type === 'pdf' ? (
											row[col.key] ? (
												<button
													onClick={() =>
														openPdfInNewTab(
															row[col.key]
														)
													}
													className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
												>
													View
												</button>
											) : (
												<span>No Data Available</span>
											)
										) : col.type === 'title' ? (
											row[col.key] ? (
												<button
													onClick={() =>
														handleView(row)
													}
													className='text-blue-500 underline bg-transparent '
												>
													{row[col.key]}
												</button>
											) : (
												<span>No Data Available</span>
											)
										) : col.type === 'time' ? (
											row[col.key] ? (
												moment(row[col.key]).format(
													'MM-DD-YYYY'
												)
											) : (
												<span>No Data Available</span>
											)
										) : row[col.key] ? (
											row[col.key]
										) : (
											<span>No Data Available</span>
										)}
									</td>
								))}

								{action && (
									<td className='text-xs p-2'>
										<div className='flex flex-col gap-2 justify-center items-center'>
											<button
												onClick={() => onEdit(row)}
												className='bg-orange-200 p-2 rounded-full hover:bg-orange-300 flex gap-1 items-center justify-center w-full'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													strokeWidth='2'
													className='w-4 h-4'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M16.862 3.487a2.344 2.344 0 1 1 3.315 3.316L7.067 19.913a4.677 4.677 0 0 1-2.185 1.236l-3.058.765a.703.703 0 0 1-.851-.85l.766-3.058a4.677 4.677 0 0 1 1.235-2.185L16.862 3.487z'
													/>
												</svg>
												<span>Edit</span>
											</button>

											<button
												onClick={() => onDelete(row)}
												className='bg-red-200 p-2 rounded-full hover:bg-red-300 flex gap-1 items-center justify-center w-full'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													strokeWidth='2'
													className='w-4 h-4'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M6 18L18 6M6 6l12 12'
													/>
												</svg>
												<span>Del</span>
											</button>
										</div>
									</td>
								)}
							</tr>
						))
					)}
				</tbody>
			</table>

			<CusAlert
				open={deleteOpen}
				setOpen={setOpenDelete}
				title='Confirm Deletion'
				content='Are you sure you want to delete this item?'
				onConfirm={handleDelete}
			/>

			{viewData && (
				<CusModalInfo
					open={showViewModal}
					setOpen={setShowViewModal}
					data={viewData}
					title={title}
				/>
			)}

			{openPdf && pdfUrl && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white p-4 rounded-lg w-[80%] h-[80%] overflow-auto relative'>
						<button
							className='absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black'
							onClick={() => setOpenPdf(false)}
						>
							&times;
						</button>
						<Document
							file={pdfUrl}
							onLoadSuccess={({ numPages }) =>
								setNumPages(numPages)
							}
							className='w-full h-full'
						>
							{Array.from({ length: numPages }, (_, index) => (
								<Page
									key={index + 1}
									pageNumber={index + 1}
								/>
							))}
						</Document>
					</div>
				</div>
			)}
		</div>
	);
};

export default CusTable;
