import React from "react";

interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface ProductsViewProps {
  products: Product[];
  searchProductId: string;
  setSearchProductId: (id: string) => void;
  deleteProduct: (name: string) => void;
}
// this component takes in props: 
//products (list of products)
//searchProductId (the searched product's ID)
// setSearchProductId (function to set search product ID)
// deleteProduct (function to delete a product)
const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  searchProductId,
  setSearchProductId,
  deleteProduct,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProductId(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.id && product.id.toString().toLowerCase().includes(searchProductId.toLowerCase())
  );

  return (
    <section className="admin-products-section">
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search by product ID"
        value={searchProductId}
        onChange={handleSearchChange}
        className="admin-products-search-bar"
      />
      <table>
        <thead>
          <tr>
            <th style={{ width: "140px" }}>Action</th>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <button onClick={() => deleteProduct(product.name)}>Delete</button>
              </td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductsView;
