import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, cleanDogs } from "../../actions/index";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //Paginado
  const [currentPage, setCurrenPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [order, setOrder] = useState("");
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const pagination = (pageNumber) => {
    setCurrenPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(cleanDogs(dispatch));
    dispatch(getDogs());
  };

  return (
    <div>
      {allDogs.length > 0 ? (
        <div>
          <Nav />
          <div className={styles.home}>
              <div className={styles.filters}>
<Filters setCurrentPage={setCurrentPage} setOrder={setOrder}/>
              </div>

          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

/* {currentDogs?.map((e) => {
    return (
      <div key={e.id}>
        <Card
          id={e.id}
          name={e.name}
          image={e.image}
          temperament={e.temperament}
          weight={e.weight}
        />
      </div>
    );
  })} */
