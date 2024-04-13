import React, { ChangeEvent, useEffect, useState } from 'react';
import { readProducts } from "../../../../server/data/Database"

type Props = {
    product: {
      _id: string;
      title: string;
      order_id: string;
      created_at: string;
      category: string;
      price: string;
    };
  };

  const ProductItem = ({ product }: Props) => {
    const { title, order_id, created_at, category, price } = product;
  
    const createdAtDate = new Date(created_at);

    return (
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
                <ul>
                  <li>
                    {title} {category}
                  </li>
                  <li>
                    {createdAtDate.getUTCDate()}/{createdAtDate.getUTCMonth()}/{createdAtDate.getUTCFullYear()}
                  </li>
                  <li>Order Id {order_id}</li>
                  <li>Price {price}</li>
                </ul>
        </div>
    </div>
    );
  };


export const ProductsPage = () => {
    //const products = readProducts();
    //console.log(products);
    //const productList = [];
    
    const [products, setProducts] = useState<Props['product'][] | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');

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

  console.log(products);
    
    
    
    /*const [setProductList] = useState<any>([]);
    const getProductList = async () => {
        const products = await readProducts();
        const tempList: any[] = [];
        products.forEach((product) => {
            tempList.push({
                title: product.title,
                id: product._id
            })
        })

        setProductList(tempList);
        
    } */
    /*products.forEach(product => {
        productList.push(product)
        
    });*/
    /*const productList : Array <string> = [];
    (products).forEach((product) => {
        productList.push(product.title);
})
    }*/
    /*const [list, setList] = useState<any>([]);
    const getProductList = async () => {
       const productList = await readProducts();
        const tempList: any[] = [];
          productList.forEach((product) => {
            tempList.push({
              title: product.title,
              id: product._id,
            });
          });
    
          setList(tempList);
          console.log("setList - " + setList(tempList))
        } */

        //{products}
        
        /*return (
            
            <div>Hello this is the products landing ProductsPage {products}
                    
        </div>
          ); */

          const selectedProduct = products.find((product) => product._id === selected);

          const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase());
          });


          return (
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', width: '100%' }}>
            <h1>Selected product: {selectedProduct?.title ?? 'No product selected'}</h1>
            <input onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ marginBottom: 20 }} />
            </div>
            {filteredProducts?.map((product) => {
                return <ProductItem  product={product} />;
            })}
    </div>
          );
          
      };


      
    
