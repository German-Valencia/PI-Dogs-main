import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTemperaments,
  filterCreated,
  orderName,
  filterTemperament,
  orderWeight,
} from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Filters.module.css";

const Filters = ({ setCurrentPage, setOrder }) => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const handleFilterTemperament = (e) => {
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderWeight = (e) => {
    e.preventDefault();
    dispatch(orderWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  return (
    <div className={styles.div}>
      <div>
        <SearchBar />
      </div>
      <div>
        <h4 className={styles.h4}>Filters</h4>
        <label className={styles.label}>Created - Api</label>
        <select
          className={styles.select}
          onChange={(e) => {
            handleFilterCreated(e);
          }}
        >
          <option value="all">ALL</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>

        <label className={styles.label}>Temperaments</label>
        <select
          className={styles.select}
          onChange={(e) => {
            handleFilterTemperament(e);
          }}
        >
          <option value="all">ALL</option>
          {allTemperaments?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <h4 className={styles.h4}>Order</h4>
        <select className={styles.select} onChange={(e) => {handleOrderWeight(e)}}>          
          <option className={styles.order}>Weight</option>
          <option value="asc"  >ASC</option>
          <option value="desc" >DESC</option>
        </select>
        <select className={styles.select} onChange={(e) => {handleOrderName(e)}}>
          <option className={styles.order}>Alphabetically</option>
          <option value="asc"  >A-Z</option>
          <option value="desc" >Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
