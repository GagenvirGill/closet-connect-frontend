import React from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { refreshState } from "../../../store/reducers/itemsReducer";
import { useDispatch } from "react-redux";

import { removeItemFromCategories } from "../../../api/Item";

import CategoriesCheckboxForm from "../../forms/CategoriesCheckboxForm";

const RemoveItemFromCategoriesForm = ({
	itemId,
	handleClose,
	itemsCurrCategories,
}) => {
	const dispatch = useDispatch();

	const handleSubmit = async (selectedCategories) => {
		await removeItemFromCategories(itemId, selectedCategories);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<>
			<p className={styles.formTitle}>
				Select Which Categories to Remove this Item from
			</p>
			<CategoriesCheckboxForm
				handleSubmit={handleSubmit}
				displayCategories={itemsCurrCategories}
			/>
		</>
	);
};

export default RemoveItemFromCategoriesForm;
