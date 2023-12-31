import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={`/details/${props.id}`} className={style.card}>
      <div>
        <h2 className={style.cardName}>
          {props.forename} {props.surname}
        </h2>
        <img
          className={style.cardImg}
          src={props?.image}
          alt={props.forename}
        />
        <h3 className={style.cardName}>Teams:</h3>
        <h4>{props.teams}</h4>
      </div>
    </Link>
  );
};

export default Card;
