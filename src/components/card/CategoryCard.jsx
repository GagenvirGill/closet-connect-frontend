import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/categoriesReducer";
import { Link } from "react-router-dom";

import styles from "./CategoryCard.module.css";
import { deleteCategory } from "../../api/Category";

import Card from "./Card";
import CategoryContextMenuForms from "../popupForms/categoryContextMenu/CategoryContextMenuForms";
import SetCategoriesFavItemForm from "../popupForms/categoryContextMenu/SetCategoriesFavItemForm";
import ContextMenuButton from "../buttons/ContextMenuButton";

const CategoryCard = ({
	categoryId,
	imagePath,
	categoryName,
	urlRoute,
	favItemId,
}) => {
	const dispatch = useDispatch();
	const [showCategoryItemsForm, setShowCategoryItemsForm] = useState(false);
	const [showCategFavItemForm, setShowCategoryFavItemForm] = useState(false);

	const onDelete = () => {
		deleteCategory(categoryId).then(() => {
			dispatch(refreshState());
		});
	};

	const handleShowCategoryItemsForm = () => {
		setShowCategoryItemsForm(true);
	};

	const handleShowCategoryFavItemForm = () => {
		setShowCategoryFavItemForm(true);
	};

	const handleCloseForm = () => {
		setShowCategoryItemsForm(false);
		setShowCategoryFavItemForm(false);
	};

	return (
		<>
			<Card
				id={categoryId}
				onDelete={onDelete}
				className={styles.categoryCard}
				customConMenu={
					categoryId !== null && (
						<>
							<ContextMenuButton
								onClick={handleShowCategoryItemsForm}
								text={`Manage '${categoryName}' Item's`}
							/>
							<ContextMenuButton
								onClick={handleShowCategoryFavItemForm}
								text={`Edit '${categoryName}' Favourite Item`}
							/>
						</>
					)
				}
				type={`'${categoryName}' Category`}
			>
				<Link key={`${categoryId}-link`} to={urlRoute}>
					<img src={imagePath} alt="Preview" id={categoryId} />
					<p className={styles.categoryCardText}>{categoryName}</p>
				</Link>
			</Card>
			{showCategoryItemsForm && (
				<CategoryContextMenuForms
					categoryId={categoryId}
					categoryName={categoryName}
					handleClose={handleCloseForm}
				/>
			)}
			{showCategFavItemForm && (
				<SetCategoriesFavItemForm
					categoryId={categoryId}
					categoryName={categoryName}
					handleClose={handleCloseForm}
					currFavItem={favItemId}
				/>
			)}
		</>
	);
};

export default CategoryCard;
