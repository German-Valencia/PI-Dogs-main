import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, cleanDogs } from "../../actions/index";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Filters from "../Filters/Filters";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [order, setOrder] = useState("");

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
              <button
                className={styles.btn}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Clear Filters
              </button>
            </div>

            <div>
              <div>
                <Pagination
                  dogsPerPage={dogsPerPage}
                  allDogs={allDogs.length}
                  pagination={pagination}
                />
              </div>
              <div className={styles.cards}>
                {currentDogs?.map((e) => {
                  return (
                    <div key={e.id} className={styles.card}>
                      <Card
                        id={e.id}
                        name={e.name}
                        image={e.image}
                        temperament={e.temperament ? e.temperament: e.temperaments && e.temperaments.map((e)=>
                        e.name.concat(", ")  
                        )}                       
                        weight={e.weight}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
