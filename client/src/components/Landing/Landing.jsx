import React from "react";
import { NavLink } from "react-router-dom";
import welcome from "../../img/welcome.gif";
import styles from "./Landing.module.css"

export default function Landing() {
  return (
    <div className={styles.bg}>
      <img className={styles.image} src={welcome} alt="Img not found" />
      <h2 className={styles.author}>by...Gav</h2>
      <NavLink to="/home">
        <button className={styles.button}>Start</button>
      </NavLink>
    </div>
  );
}
