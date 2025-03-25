import React, { useEffect, useState } from "react";
import styles from "./AddCategoryToItemsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/categoriesReducer";

import { setItems } from "../../../store/reducers/itemsReducer";
import { getAllItems } from "../../../api/Item";

import { addCategoryToItems } from "../../../api/Category";

import ItemsCheckboxForm from "../../forms/ItemsCheckboxForm";

const AddCategoryToItemsForm = ({
	categoryId,
	handleClose,
	categoriesCurrItems,
}) => {
	const dispatch = useDispatch();
	const { items, refresh } = useSelector((state) => state.items);
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		getAllItems()
			.then((fetchedItems) => {
				dispatch(setItems(fetchedItems));
			})
			.catch((err) => {
				console.log(`Error loading items: ${err}`);
			});
	}, [dispatch]);

	useEffect(() => {
		const currItems = new Set();
		categoriesCurrItems.map((item) => {
			currItems.add(item.itemId);
		});

		const filtItems = items.filter((item) => {
			return !currItems.has(item.itemId);
		});

		setFilteredItems(filtItems);
	}, [items, categoriesCurrItems, refresh]);

	const handleSubmit = async (selectedItems) => {
		await addCategoryToItems(categoryId, selectedItems);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<div>
			<p className={styles.formTitle}>
				Select Which Items to Add to this Category
			</p>
			<ItemsCheckboxForm
				handleSubmit={handleSubmit}
				displayItems={filteredItems}
			/>
		</div>
	);
};

export default AddCategoryToItemsForm;
