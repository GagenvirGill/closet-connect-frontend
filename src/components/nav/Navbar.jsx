import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import AddPopup from "./addPopup/AddPopup";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link to="/closet">
				<img
					src="/hanger_icon.png"
					alt="closet"
					className={styles.navLogo}
				></img>
			</Link>
			<Link to="/">
				<img
					src="/house_icon.png"
					alt="Home"
					className={styles.navLogo}
				></img>
			</Link>
			<AddPopup />
		</nav>
	);
};

export default Navbar;
