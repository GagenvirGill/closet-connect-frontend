import React, { useEffect, useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/itemsReducer";
import { addNotification } from "../../../store/reducers/notificationsReducer";

import { addItemToCategories } from "../../../api/Item";

import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const AddItemToCategoriesForm = ({
	itemId,
	handleClose,
	itemsCurrCategories,
}) => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categories);
	const [filteredCategories, setFilteredCategories] = useState([]);

	useEffect(() => {
		const currCategories = new Set();
		itemsCurrCategories.map((category) => {
			currCategories.add(category.categoryId);
		});

		const filtCategories = categories.filter((category) => {
			return !currCategories.has(category.categoryId);
		});

		setFilteredCategories(filtCategories);
	}, [dispatch, itemsCurrCategories]);

	const handleSubmit = async (selectedCategories) => {
		const success = await addItemToCategories(itemId, selectedCategories);
		dispatch(refreshState());
		handleClose();

		if (success) {
			dispatch(
				addNotification(
					"Successfully Added Those Categories to Your Item"
				)
			);
		} else {
			dispatch(
				addNotification(
					"An Error Occured while trying to Add Item to Categories!"
				)
			);
		}
	};

	return (
		<>
			<p className={styles.formTitle}>
				Select Which Categories to Add this Item to
			</p>
			<CategoriesCheckboxForm
				formId="AddItemToCategoriesForm"
				handleSubmit={handleSubmit}
				displayCategories={filteredCategories}
			/>
		</>
	);
};

export default AddItemToCategoriesForm;
