import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ dogsPerPage, allDogs, pagination }) {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.list}>
        <p className={styles.pn}>
          <b>Pages number:</b>
        </p>
        {pageNumbers?.map((n) => (
          <li className={styles.items} key={n}>
            <button className={styles.a} onClick={() => pagination(n)}>
              {n}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
