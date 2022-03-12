import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail, cleanDogs } from "../../actions";
import { useEffect } from "react";
import noImg from "../../img/noImg.jpg";
import Loading from "../Loading/Loading";
import styles from "./Detail.module.css";

function Detail(props) {
  const dispatch = useDispatch();
  const myDog = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(cleanDetail(dispatch), cleanDogs(dispatch));
    };
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      {myDog.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.h2}>{myDog[0].name}</h2>
            <p className={styles.p}>#{myDog[0].id}</p>
            <img
              src={myDog[0].image ? myDog[0].image : noImg}
              alt="img not found"
              height="250px"
              width="250px"
            />
            <h5 className={styles.h5}>Temperament:</h5>
            <div >
              <p className={styles.p}>{myDog[0].temperament ? myDog[0].temperament : myDog[0].temperaments && myDog[0].temperaments.map((e)=>
                        e.name.concat(", ")  
                        )}</p>
            </div>
            <div>
              <h5 className={styles.h5}>Height: {myDog[0].height} Cms.</h5>
              <h5 className={styles.h5}>Weight: {myDog[0].weight} Kg.</h5>
              <h5 className={styles.h5}>Life Span: {myDog[0].life_span}</h5>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <div>
        <NavLink to="/home">
          <button className={styles.btn}>Go back</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Detail;
