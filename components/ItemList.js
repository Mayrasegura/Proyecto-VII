const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Catálogo de Productos</h2>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
