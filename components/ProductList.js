import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setProductos(docs);
    };
    fetchData();
  }, []);

  return (
    <ul>
      {productos.length === 0 ? (
        <li>No hay productos registrados aún.</li>
      ) : (
        productos.map((p, index) => <li key={index}>{p.name}</li>)
      )}
    </ul>
  );
};

export default ProductList;
