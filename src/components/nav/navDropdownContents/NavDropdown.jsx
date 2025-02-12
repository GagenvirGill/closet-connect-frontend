import React, { useState } from "react";
import FilterItemsForm from "./FilterItemsForm"
import AddCategoryForm from "./AddCategoryForm";
import AddItemForm from "./AddItemForm";
import NavDropdownRadioForm from "./NavDropdownRadioForm";
import styles from "../../../styles/NavDropdown.module.css";

const NavDropdown = () => {
    const [selectedOption, setSelectedOption] = useState("filter");

    const renderComponent = (selectedOption) => {
        if (selectedOption === "filter") {
            return <FilterItemsForm />
        } else if (selectedOption === "addItem") {
            return <AddItemForm />
        } else if (selectedOption === "addCategory") {
            return <AddCategoryForm />
        }
    };

    return (
        <div className={styles.dropdownPanel}>
            <NavDropdownRadioForm 
                renderComponent={renderComponent} 
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption} 
            />
            {renderComponent(selectedOption)}
        </div>
    );
};


export default NavDropdown;