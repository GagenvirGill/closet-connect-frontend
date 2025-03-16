import React, { useState } from "react";
import styles from "./AddPopup.module.css";

import ImgButton from "../../buttons/ImgButton";
import AddItemForm from "./AddItemForm";
import AddCategoryForm from "./AddCategoryForm";
import PopupRadioForm from "./PopupRadioForm";

const AddPopup = () => {
	const [isPopupVisible, setPopupVisibility] = useState(false);
	const [selectedForm, setSelectedForm] = useState("addItem");

	const handleButtonChange = () => {
		setPopupVisibility(!isPopupVisible);
	};

	const renderForm = (selectedOption) => {
		if (selectedOption === "addItem") {
			return <AddItemForm />;
		} else if (selectedOption === "addCategory") {
			return <AddCategoryForm />;
		}
	};

	return (
		<div>
			<ImgButton
				buttonId="add-popup-btn"
				imgFileName="/plus_icon.png"
				onChange={handleButtonChange}
				className={
					isPopupVisible ? styles.rotateOpen : styles.rotateClose
				}
			/>

			{isPopupVisible && (
				<>
					<div className={styles.overlay}></div>
					<div className={styles.popupContent}>
						<PopupRadioForm
							renderComponent={renderForm}
							selectedOption={selectedForm}
							setSelectedOption={setSelectedForm}
						/>
						{renderForm(selectedForm)}
					</div>
				</>
			)}
		</div>
	);
};

export default AddPopup;
