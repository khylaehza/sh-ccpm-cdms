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

	const addItem = (newItem, tableName, imageFile) => {
		const randomName = `${tableName}_${Date.now()}`;

		if (imageFile) {
			const metadata = {
				contentType: imageFile.type || 'image/jpeg',
			};
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
					setPrompt({
						stats: 'Error',
						message: 'Failed to upload image. Please try again.',
					});
					setIsVisible(true);
					setTimeout(() => setIsVisible(false), 6000);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							saveItemToDatabase(
								newItem,
								tableName,
								randomName,
								downloadURL
							);
						}
					);
				}
			);
		} else {
			saveItemToDatabase(newItem, tableName, randomName);
		}
	};

	const saveItemToDatabase = (
		newItem,
		tableName,
		randomName,
		imageUrl = null
	) => {
		const itemData = { ...newItem };
		if (imageUrl) {
			itemData.image = imageUrl;
		}

		set(ref(db, `${tableName}/${randomName}`), itemData)
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item has been successfully added.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to add item. Please try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	const deleteItem = (itemId, tableName, imageUrl = null) => {
		if (imageUrl) {
			const imageRef = storeRef(storage, imageUrl);

			deleteObject(imageRef)
				.then(() => {
					console.log('Image deleted successfully');
					deleteItemFromDatabase(itemId, tableName);
				})
				.catch((error) => {
					console.error('Error deleting image:', error);
					setPrompt({
						stats: 'Error',
						message: 'Failed to delete image. Please try again.',
					});
					setIsVisible(true);
					setTimeout(() => setIsVisible(false), 6000);
				});
		} else {
			deleteItemFromDatabase(itemId, tableName);
		}
	};

	const deleteItemFromDatabase = (itemId, tableName) => {
		remove(ref(db, `${tableName}/${itemId}`))
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item has been successfully deleted.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to delete item. Please try again.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			});
	};

	const editItem = (
		itemId,
		updatedItem,
		tableName,
		newImageFile = null,
		existingImageUrl = null
	) => {
		if (newImageFile) {
			const metadata = {
				contentType: newImageFile.type || 'image/jpeg',
			};
			const randomName = `${tableName}_${Date.now()}`;
			const imagesRef = storeRef(storage, `images/${randomName}`);

			const uploadTask = uploadBytesResumable(
				imagesRef,
				newImageFile,
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
					setPrompt({
						stats: 'Error',
						message:
							'Failed to upload new image. Please try again.',
					});
					setIsVisible(true);
					setTimeout(() => setIsVisible(false), 6000);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(newDownloadURL) => {
							if (existingImageUrl) {
								const imageRef = storeRef(
									storage,
									existingImageUrl
								);
								deleteObject(imageRef)
									.then(() =>
										console.log(
											'Previous image deleted successfully'
										)
									)
									.catch((err) =>
										console.error(
											'Failed to delete old image:',
											err
										)
									);
							}
							saveUpdatedItemToDatabase(
								itemId,
								updatedItem,
								tableName,
								newDownloadURL
							);
						}
					);
				}
			);
		} else {
			saveUpdatedItemToDatabase(
				itemId,
				updatedItem,
				tableName,
				existingImageUrl
			);
		}
	};

	const saveUpdatedItemToDatabase = (
		itemId,
		updatedItem,
		tableName,
		imageUrl = null
	) => {
		const itemData = { ...updatedItem };
		if (imageUrl) {
			itemData.image = imageUrl;
		}

		update(ref(db, `${tableName}/${itemId}`), itemData)
			.then(() => {
				setPrompt({
					stats: 'Successful',
					message: 'Item has been successfully updated.',
				});
				setIsVisible(true);
				setTimeout(() => setIsVisible(false), 6000);
			})
			.catch(() => {
				setPrompt({
					stats: 'Error',
					message: 'Failed to update item. Please try again.',
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
						([key, value]) => {
							return { key, ...value };
						}
					);
					setUsers(data);
				} else {
					console.log('No data available');
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
	return (
		<DataContext.Provider
			value={{
				addItem,
				deleteItem,
				prompt,
				isVisible,
				setIsVisible,
				editItem,
				users,
			}}
		>
			{loading ? <div>Loading...</div> : children}
		</DataContext.Provider>
	);
};
