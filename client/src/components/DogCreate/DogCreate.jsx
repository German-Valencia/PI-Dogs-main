import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllTemperaments, postDog, cleanDogs } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DogCreate.module.css";

function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    image: "",
    temperaments: [],
  });

  const noEmpty = /\S+/;
  const validateName = /^[a-z]+$/i;
  const validateNum = /^\d+$/;
  const validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  const validate = (input) => {
    let errors = {};
    if (
      !noEmpty.test(input.name) ||
      !validateName.test(input.name) ||
      input.name.length < 3
    ) {
      errors.name =
        "Name required. Only string of more than two characters and whitout numbers";
    }
    if (!validateNum.test(input.height_min) || input.height_min < 1) {
      errors.height_min = "Number required. Higher than one";
    }
    if (!validateNum.test(input.height_max) || input.height_max < 1) {
      errors.height_max = "Number required. Higher than one";
    }
    if (!validateNum.test(input.weight_min) || input.weight_min < 1) {
      errors.weight_min = "Number required. Higher than one";
    }
    if (!validateNum.test(input.weight_max) || input.weight_max < 1) {
      errors.weight_max = "Number required. Higher than one";
    }
    if (!validateNum.test(input.life_span_min) || input.life_span_min < 1) {
      errors.life_span_min = "Number required. Higher than one";
    }
    if (!validateNum.test(input.life_span_max) || input.life_span_max < 1) {
      errors.life_span_max = "Number required. Higher than one";
    }
    if (!validateUrl.test(input.image)) {
      errors.image = "URL required";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (input.temperaments.length < 4) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
      e.target.value = "Select temperament";
    } else {
      alert("You cannot choose more than four temperaments of dog");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let crear = {
      name: input.name,
      height: `${input.height_min} - ${input.height_max}`,
      weight: `${input.weight_min} - ${input.weight_max}`,
      life_span: `${input.life_span_min} - ${input.life_span_max} years`,
      image: input.image,
      temperaments: input.temperaments,
    };

    if (
      !errors.name &&
      !errors.height_min &&
      !errors.height_max &&
      !errors.weight_min &&
      !errors.weight_max &&
      !errors.life_span_min &&
      !errors.life_span_max &&
      !errors.image
    ) {
      dispatch(postDog(crear));

      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperaments: [],
        image: "",
      });
      dispatch(cleanDogs(dispatch));
      history.push("/home");
    } else {
      alert("Error. Check the form");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(
        (temperaments) => temperaments !== e
      ),
    });
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <NavLink to="/home">
        <button className={styles.btn}>Go Back</button>
      </NavLink>
      <form
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2 className={styles.h2}>Create a Dog</h2>
        <div className={styles.div}>
          <div className={styles.divito}>
            <label className={styles.label}>Name: </label>
            <input
              className={styles.input}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Name"
            />
            <p className={styles.p}>{errors.name}</p>

            <label className={styles.label}>Height min cms: </label>
            <input
              className={styles.input}
              type="number"
              value={input.height_min}
              name="height_min"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Height min"
            />
            <p className={styles.p}>{errors.height_min}</p>

            <label className={styles.label}>Height max cms: </label>
            <input
              className={styles.input}
              type="number"
              value={input.height_max}
              name="height_max"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Height max"
            />
            <p className={styles.p}>{errors.height_max}</p>

            <label className={styles.label}>Weight min Kgs: </label>
            <input
              className={styles.input}
              type="number"
              value={input.weight_min}
              name="weight_min"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Weight min"
            />
            <p className={styles.p}>{errors.weight_min}</p>

            <label className={styles.label}>Weight max Kgs: </label>
            <input
              className={styles.input}
              type="number"
              value={input.weight_max}
              name="weight_max"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Weight max"
            />
            <p className={styles.p}>{errors.weight_max}</p>

            <label className={styles.label}>Life span min Years: </label>
            <input
              className={styles.input}
              type="number"
              value={input.life_span_min}
              name="life_span_min"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Life span min"
            />
            <p className={styles.p}>{errors.life_span_min}</p>

            <label className={styles.label}>Life span max Years: </label>
            <input
              className={styles.input}
              type="number"
              value={input.life_span_max}
              name="life_span_max"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Life span max"
            />
            <p className={styles.p}>{errors.life_span_max}</p>

            <label className={styles.label}>Image: </label>
            <input
              className={styles.input}
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="URL Image..."
            />
            <p className={styles.p}>{errors.image}</p>
          </div>
        </div>
        <label className={styles.label}>Select temperaments max 4:</label>
        <div className={styles.element}>
          <select
            className={styles.select}
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option>Select temperament</option>
            {temperaments?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {input.temperaments.map((e) => {
            return (
              <div className={styles.temperamentsSelect} key={e}>
                <p className={styles.pTemperaments}>{e}</p>
                <button
                  className={styles.btnDelete}
                  onClick={() => {
                    handleDelete(e);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <button
          className={styles.btnCreate}
          type="submit"
          disabled={!input.name}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default DogCreate;
