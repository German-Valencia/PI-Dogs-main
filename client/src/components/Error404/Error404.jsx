import React from "react";
import { NavLink } from "react-router-dom";
import img404 from "../../img/404a.gif";
import styles from "./Error404.module.css";

function Error404() {
  return (
    <div>
      <img className={styles.img} src={img404} alt="Img not found" />
      <h1 className={styles.h1}>Error 404</h1>
      <h2 className={styles.h2}>Not found...</h2>
      <NavLink to={"/home"}>
        <button className={styles.btn}>Back home...</button>
      </NavLink>
    </div>
  );
}

export default Error404;
