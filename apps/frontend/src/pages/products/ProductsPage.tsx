import React, { ChangeEvent, useEffect, useState, useRef } from "react";
/*type Product = {
    _id: string;
    title: string;
    order_id: string;
    created_at: string;
    category: string;
    price: string;
}*/
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
  //product: Product;
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
        <ul key={product._id}>
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

const ProductsComponent = (productList : Product[] | null) => {
  //add a listener here to wait for productList to fully load
  if (productList === null) {
    return <div>Loading...</div>;
  }
  const [products, setProducts] = useState(productList);
  const [sortable, setSortable] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  //const toggleSortActiveHandler = () => setSortable(a => !a);

  useEffect(() => {
    if (sortable && products) {
      setProducts(
        products?.sort((a,b) => {
          return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
        }))
    } else {
      setProducts(products);
    }
  }, [sortable]);


  

  const selectedProduct = products.find((product) => product._id === selected);

  const handleChange = (id: string) => {
    setSelected(id);
  };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase());
  });

  /*const filterProductsCreatedBy = products.sort((a,b) => {
      return new Number(a.price).valueOf() - new Number(b.price).valueOf();;
    });*/

  
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
        <div>Created by date</div>
          <button
            type="button" onClick={() => setSortable(!sortable)}
          >
            Click to sort by created date
            
          </button>
          <div>Price sort</div>
          <button
           onClick={() => {
            console.log("price sort clicked");
            products.sort((a,b) => {
              
              return new Number(a.price).valueOf() - new Number(b.price).valueOf();
            }).map((product) => {
              return <ProductItem onChange={() => handleChange(product._id)} product={product} isSelected={selected === product?._id} />;
            }
            )
            }
           }
          >
            Click to sort by price
            
          </button>
      </div>
      {filteredProducts?.map((product) => {
        return <ProductItem onChange={() => handleChange(product._id)} product={product} isSelected={selected === product?._id} />;
      })}
    </div>
  );

}

export const ProductsPage = () => {
  //const [products, setProducts] = useState(null);
  //let products = null;

  const [products, setProducts] = useState<Props["product"][] | null>(null);
  const [sortable, setSortable] = useState(false);
  const [sortablePrice, setSortablePrice] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (sortable && products) {
      setProducts(
        products?.sort((a,b) => {
          return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
        }))
    } else {
      setProducts(products);
    }
  }, [sortable]);

  useEffect(() => {
    if (sortablePrice && products) {
      setProducts(
        products?.sort((a,b) => {
          return new Number(a.price).valueOf() - new Number(b.price).valueOf();
        }))
    } else {
      setProducts(products);
    }
  }, [sortablePrice]);

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
    console.log("@@@@@@@ we are in fetch");
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

  /*const filterProductsCreatedBy = products.sort((a,b) => {
      return new Number(a.price).valueOf() - new Number(b.price).valueOf();;
    });*/

  
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
        <div>Created by date</div>
          <button
            type="button" onClick={() => setSortable(!sortable)}
          >
            Click to sort by created date
            
          </button>
          <div>Price sort</div>
          <button
            type="button" onClick={() => setSortablePrice(!sortablePrice)}
          >
            Click to sort by price
            
          </button>
      </div>
      {filteredProducts?.map((product) => {
        return <ProductItem onChange={() => handleChange(product._id)} product={product} isSelected={selected === product?._id} />;
      })}
    </div>
  );
  /*console.log("------Product list after fetch " + products)
  return ProductsComponent(products)*/
  
};