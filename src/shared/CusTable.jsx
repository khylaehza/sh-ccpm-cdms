import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useData } from '../DataContext';
import moment from 'moment';
import CusAlert from './CusAlert';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'../node_modules/pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url
).toString();

const CusTable = ({
	columns,
	rows,
	tableName,
	setCurRow,
	setEdit,
	action = true,
}) => {
	const [img, setImg] = useState('');
	const [openImg, setOpenImg] = useState(false);
	const [deleteOpen, setOpenDelete] = useState(false);
	const { deleteItem } = useData();
	const [itemId, setItemId] = useState(null);
	const [tblName, setTableName] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	// PDF Viewer State
	const [pdfUrl, setPdfUrl] = useState(null);
	const [openPdf, setOpenPdf] = useState(false);
	const [numPages, setNumPages] = useState(null);

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

	console.log(pdfUrl);
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
					{Object.keys(rows).length === 0 ? (
						<tr className='text-center text-xs p-8 mt-5'>
							<td colSpan={columns.length}>
								No data available here.
							</td>
						</tr>
					) : (
						rows.map((row, index) => (
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
											<img
												src={row[col.key]}
												alt={`${col.label}`}
												className='w-15 h-15 object-cover cursor-pointer'
												onClick={() => {
													setOpenImg(true);
													setImg(row[col.key]);
												}}
											/>
										) : col.type === 'pdf' ? (
											<button
												onClick={() => {
													setPdfUrl(row[col.key]);
													setOpenPdf(true);
												}}
												className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
											>
												View
											</button>
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
												className='bg-orange-200 p-2 rounded-full hover:bg-orange-300 flex flex-row gap-1 items-center'
											>
												Edit
											</button>
											<button
												onClick={() => onDelete(row)}
												className='bg-red-200 p-2 rounded-full hover:bg-red-300 flex flex-row gap-1 items-center'
											>
												Del
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
