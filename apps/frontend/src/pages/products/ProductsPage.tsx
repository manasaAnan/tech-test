import React, { ChangeEvent, useEffect, useState } from "react";
import { readProducts } from "../../../../server/data/Database";

type Props = {
  isSelected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  product: {
    _id: string;
    title: string;
    order_id: string;
    created_at: string;
    category: string;
    price: string;
  };
};

const ProductItem = ({ product, isSelected, onChange }: Props) => {
  const { title, order_id, created_at, category, price } = product;

  const createdAtDate = new Date(created_at);

  return (
    <div
      style={{
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input onChange={onChange} checked={isSelected} type="checkbox" />
      <div>
        <ul>
          <div>
            {title} 
          </div>
          <div>
            {category}
          </div>
          <div>
            {createdAtDate.getUTCDate()}/{createdAtDate.getUTCMonth()}/
            {createdAtDate.getUTCFullYear()}
          </div>
          <div>Order Id {order_id}</div>
          <div>Price {price}</div>
        </ul>
      </div>
    </div>
  );
};

export const ProductsPage = () => {
  const [products, setProducts] = useState<Props["product"][] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");

        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  if (products === null) {
    return <div>Loading...</div>;
  }

  const selectedProduct = products.find((product) => product._id === selected);

  const handleChange = (id: string) => {
    setSelected(id);
  };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <h1>
          Selected product: {selectedProduct?.title ?? "No product selected"}
        </h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          style={{ marginBottom: 20 }}
        />
      </div>
      {filteredProducts?.map((product) => {
        return <ProductItem onChange={() => handleChange(product._id)} product={product} isSelected={selected === product?._id} />;
      })}
    </div>
  );
};
