import React from "react";
import { NavLink } from "react-router-dom";
import ybf from "../../img/ybf.png";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header>
      <nav className={styles.nav}>
        <div>
          <NavLink to="/about">
            <img src={ybf} alt="img not found" className={styles.img} />
          </NavLink>
        </div>
        <div>
          <NavLink to="/create">
            <button className={styles.btn}>Create a Dog</button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
