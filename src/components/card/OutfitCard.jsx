import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";

import styles from "./OutfitCard.module.css";
import { deleteOutfit } from "../../api/Outfit";

import Card from "./Card";

const OutfitCard = ({ outfitId, imagePath, dateWorn, description }) => {
	const dispatch = useDispatch();

	const onDelete = () => {
		deleteOutfit(outfitId).then(() => {
			dispatch(refreshState());
		});
	};

	return (
		<Card
			id={outfitId}
			onDelete={onDelete}
			className={styles.OutfitCard}
			type={`'${dateWorn}' Outfit`}
		>
			<img src={imagePath} alt="Preview" id={categoryId} />
			<p className={styles.outfitCardText}>{dateWorn}</p>
			<p className={styles.outfitCardText}>{description}</p>
		</Card>
	);
};

export default OutfitCard;
