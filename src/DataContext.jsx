import React, { createContext, useState, useContext, useEffect } from 'react';
import { ref, set, onValue, remove, update } from 'firebase/database';
import {
	ref as storeRef,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage';
import { db, storage } from '../firebase.config';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState({ stats: '', message: '' });
	const [isVisible, setIsVisible] = useState(false);
	const [users, setUsers] = useState([]);
	const [generalDep, setGenDep] = useState([]);

	const addItem = async (newItem, tableName, imageFile, pdfFiles) => {
		console.log('add item');
		console.log('returns what', newItem, tableName, imageFile, pdfFiles);

		const randomName = `${tableName}_${Date.now()}`;
		const uploadedFiles = pdfFiles ? await uploadFiles(pdfFiles) : {};

		const itemData = { ...newItem, ...uploadedFiles };

		if (imageFile) {
			const metadata = { contentType: imageFile.type || 'image/jpeg' };
			const imagesRef = storeRef(storage, `images/${randomName}`);
			const uploadTask = uploadBytesResumable(
				imagesRef,
				imageFile,
				metadata
			);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress}% done`);
				},
				(error) => {
					console.error('Error uploading image:', error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							itemData.image = downloadURL;
							saveToDatabase(tableName, randomName, itemData);
						}
					);
				}
			);
		} else {
			saveToDatabase(tableName, randomName, itemData);
		}
	};

	const saveToDatabase = (tableName, key, data) => {
		set(ref(db, `${tableName}/${key}`), data)
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item added successfully.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to add item. Try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	const uploadFiles = async (files) => {
		const uploadPromises = Object.entries(files).map(
			async ([key, file]) => {
				const fileRef = storeRef(storage, `pdfs/${key}_${Date.now()}`);
				const uploadTask = await uploadBytesResumable(fileRef, file);

				const url = await getDownloadURL(uploadTask.ref);
				return { [key]: url };
			}
		);

		const uploadedFiles = await Promise.all(uploadPromises);
		return Object.assign({}, ...uploadedFiles);
	};

	// const editItem = async (
	// 	tableName,
	// 	itemId,
	// 	updatedItem,
	// 	imageFile = null,
	// 	existingImageUrl = null,
	// 	pdfFiles = null
	// ) => {
	// 	const itemRef = ref(db, `${tableName}/${itemId}`);

	// 	try {
	// 		const uploadedFiles = pdfFiles ? await uploadFiles(pdfFiles) : {};
	// 		const itemData = { ...updatedItem, ...uploadedFiles };

	// 		if (imageFile) {
	// 			const randomName = `${tableName}_${Date.now()}`;
	// 			const metadata = {
	// 				contentType: imageFile.type || 'image/jpeg',
	// 			};
	// 			const imagesRef = storeRef(storage, `images/${randomName}`);
	// 			const uploadTask = await uploadBytesResumable(
	// 				imagesRef,
	// 				imageFile,
	// 				metadata
	// 			);
	// 			itemData.image = await getDownloadURL(uploadTask.ref);
	// 		} else if (existingImageUrl) {
	// 			itemData.image = existingImageUrl;
	// 		}

	// 		console.log('ds', itemRef, itemData);

	// 		await update(itemRef, itemData);

	// 		console.log('done editing');

	// 		setPrompt({
	// 			stats: 'Successful',
	// 			message: 'Item updated successfully.',
	// 		});
	// 		setIsVisible(true);
	// 		setTimeout(() => setIsVisible(false), 6000);
	// 	} catch (error) {
	// 		console.error('Error updating item:', error);
	// 		setPrompt({
	// 			stats: 'Error',
	// 			message: 'Failed to update item. Try again.',
	// 		});
	// 		setIsVisible(true);
	// 		setTimeout(() => setIsVisible(false), 6000);
	// 	}
	// };

	const editItem = async (
		tableName,
		itemId,
		updatedItem,
		imageFile = null,
		existingImageUrl = null,
		pdfFiles = null
	) => {
		const itemRef = ref(db, `${tableName}/${itemId}`);

		try {
			// Filter out undefined values
			const cleanUpdatedItem = Object.fromEntries(
				Object.entries(updatedItem).filter(
					([_, value]) => value !== undefined
				)
			);

			const uploadedFiles = pdfFiles ? await uploadFiles(pdfFiles) : {};

			// Merge existing values and uploaded files
			const itemData = {
				...cleanUpdatedItem,
				...uploadedFiles,
			};

			// Handle image upload if needed
			if (imageFile) {
				const randomName = `${tableName}_${Date.now()}`;
				const metadata = {
					contentType: imageFile.type || 'image/jpeg',
				};
				const imagesRef = storeRef(storage, `images/${randomName}`);
				const uploadTask = await uploadBytesResumable(
					imagesRef,
					imageFile,
					metadata
				);
				itemData.image = await getDownloadURL(uploadTask.ref);
			} else if (existingImageUrl) {
				itemData.image = existingImageUrl;
			}

			// ✅ Update data in Firebase without undefined values
			await update(itemRef, itemData);

			console.log('done editing');

			setPrompt({
				stats: 'Successful',
				message: 'Item updated successfully.',
			});
			setIsVisible(true);
			setTimeout(() => setIsVisible(false), 6000);
		} catch (error) {
			console.error('Error updating item:', error);
			setPrompt({
				stats: 'Error',
				message: 'Failed to update item. Try again.',
			});
			setIsVisible(true);
			setTimeout(() => setIsVisible(false), 6000);
		}
	};

	const deleteItem = async (itemId, tableName, pdfUrls = []) => {
		const pdfArray = Array.isArray(pdfUrls) ? pdfUrls : [];

		await Promise.all(
			pdfArray.map((url) => deleteObject(storeRef(storage, url)))
		);

		remove(ref(db, `${tableName}/${itemId}`))
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item deleted successfully.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to delete item. Try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	useEffect(() => {
		const table = ref(db, 'users');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([key, value]) => ({ key, ...value })
					);
					setUsers(data);
				} else {
					setUsers([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const table = ref(db, 'generalDep');
		const unsubscribe = onValue(
			table,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = Object.entries(snapshot.val()).map(
						([key, value]) => ({ key, ...value })
					);
					setGenDep(data);
				} else {
					setGenDep([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		);
		return () => unsubscribe();
	}, []);

	return (
		<DataContext.Provider
			value={{
				addItem,
				editItem,
				deleteItem,
				prompt,
				isVisible,
				setIsVisible,
				users,
				generalDep,
			}}
		>
			{loading ? <div>Loading...</div> : children}
		</DataContext.Provider>
	);
};
