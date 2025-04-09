import React from "react";

const Item = ({ item, onDelete }) => {
  return (
    <li>
      {item} <button onClick={onDelete}>Eliminar</button>
    </li>
  );
};

export default Item;
