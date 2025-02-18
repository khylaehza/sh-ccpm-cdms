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

	// const uploadFiles = async (files) => {
	// 	const uploadPromises = Object.entries(files).map(
	// 		async ([key, file]) => {
	// 			const fileRef = storeRef(storage, `pdfs/${key}_${Date.now()}`);
	// 			const uploadTask = await uploadBytesResumable(fileRef, file);
	// 			return getDownloadURL(uploadTask.ref).then((url) => ({
	// 				key,
	// 				url,
	// 			}));
	// 		}
	// 	);
	// 	return Promise.all(uploadPromises);
	// };

	// const addItem = async (newItem, tableName, imageFile = null, pdfFiles = null) => {
	// 	const randomName = `${tableName}_${Date.now()}`;
	// 	const uploadedFiles = pdfFiles ? await uploadFiles(pdfFiles) : [];
	// 	const itemData = { ...newItem, pdfs: uploadedFiles };

	// 	if (imageFile) {
	// 		const metadata = {
	// 			contentType: imageFile.type || 'image/jpeg',
	// 		};
	// 		const imagesRef = storeRef(storage, `images/${randomName}`);
	// 		const uploadTask = uploadBytesResumable(imagesRef, imageFile, metadata);
	// 		uploadTask.on(
	// 			'state_changed',
	// 			(snapshot) => {
	// 				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 				console.log(`Upload is ${progress}% done`);
	// 			},
	// 			(error) => {
	// 				console.error('Error uploading image:', error);
	// 			},
	// 			() => {
	// 				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	// 					itemData.image = downloadURL;
	// 					set(ref(db, `${tableName}/${randomName}`), itemData)
	// 						.then(() => {
	// 						setPrompt({ stats: 'Successful', message: 'Item added successfully.' });
	// 						setIsVisible(true);
	// 						setTimeout(() => setIsVisible(false), 6000);
	// 					})
	// 					.catch(() => {
	// 						setPrompt({ stats: 'Error', message: 'Failed to add item. Try again.' });
	// 						setIsVisible(true);
	// 						setTimeout(() => setIsVisible(false), 6000);
	// 					});
	// 				});
	// 			}
	// 		);
	// 	} else {
	// 		set(ref(db, `${tableName}/${randomName}`), itemData)
	// 			.then(() => {
	// 				setPrompt({ stats: 'Successful', message: 'Item added successfully.' });
	// 				setIsVisible(true);
	// 				setTimeout(() => setIsVisible(false), 6000);
	// 			})
	// 			.catch(() => {
	// 				setPrompt({ stats: 'Error', message: 'Failed to add item. Try again.' });
	// 				setIsVisible(true);
	// 				setTimeout(() => setIsVisible(false), 6000);
	// 			});
	// 	}
	// };

	const deleteItem = async (itemId, tableName, pdfUrls = []) => {
		await Promise.all(
			pdfUrls.map((url) => deleteObject(storeRef(storage, url)))
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

	const addItem = async (newItem, tableName, imageFile, pdfFiles) => {
		console.log('add item');
		console.log('returns what', newItem, tableName, imageFile, pdfFiles);

		const randomName = `${tableName}_${Date.now()}`;
		const uploadedFiles = pdfFiles ? await uploadFiles(pdfFiles) : {};

		// Merge uploaded file URLs into newItem directly
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

	// Extracted function to save data to Firebase Database
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
				return { [key]: url }; // Return an object instead of an array
			}
		);

		const uploadedFiles = await Promise.all(uploadPromises);
		return Object.assign({}, ...uploadedFiles); // Merge objects into one
	};

	return (
		<DataContext.Provider
			value={{
				addItem,
				deleteItem,
				prompt,
				isVisible,
				setIsVisible,
				users,
			}}
		>
			{loading ? <div>Loading...</div> : children}
		</DataContext.Provider>
	);
};
