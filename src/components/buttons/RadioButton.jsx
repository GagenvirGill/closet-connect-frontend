import React from "react";
import styles from "./RadioButton.module.css";

const RadioButton = ({ text, buttonId, value, checked, onChange }) => {
	return (
		<>
			<label className={styles.radioButton} htmlFor={buttonId}>
				<input
					type="radio"
					id={buttonId}
					name={buttonId}
					value={value}
					checked={checked}
					onChange={onChange}
				/>
				{text}
			</label>
		</>
	);
};

export default RadioButton;
