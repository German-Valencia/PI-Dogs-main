import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTemperaments,
  filterCreated,
  orderName,
  filterTemperament,
  filterWeight,
} from "../../actions";
import searchBAr from "../SearchBar/SearchBar";
import styles from "./Filters.module.css";

const Filters = ({ setCurrentPage, setOrder }) => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperament);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleFilterCreated = (e)=>{
      e.preventDefault();
      dispatch(filterCreated(e.target.value))
      setCurrentPage(1)
  }
};
