import React from "react";
import { NavLink } from "react-router-dom";
import noImg from "../../img/noImg.jpg";
import styles from "./Card.module.css";

export default function Card({ id, name, image, temperament, weight }) {
  return (
    <div>
      <NavLink className={styles.none} to={`/dogs/${id}`}>
        <div>
          <img
            className={styles.img}
            src={image ? image : noImg}
            alt="img not found"
            width="200px"
            height="250vh"
          />
          <h3 className={styles.text}>Name: </h3>
          <h3 className={styles.text}>{name}</h3>          
          <h3 className={styles.text}>Temperament:</h3>          
          <div className={styles.temperaments}>
            <h4 className={styles.text}>
              { temperament }
            </h4>
            
          </div>
          <h4 className={styles.text}>Weight: {weight}</h4>
        </div>
      </NavLink>
    </div>
  );
}
