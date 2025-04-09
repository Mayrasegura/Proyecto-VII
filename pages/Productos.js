import React from "react";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";

const Productos = () => {
  return (
    <div>
      <h1>Productos y Servicios</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default Productos;
