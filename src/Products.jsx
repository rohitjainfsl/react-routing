import axios from "axios";
import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  function handleAddToCart(e, product) {
    e.preventDefault();
    setCart([...cart, product]);
  }
  function checkProductInCart(product) {
    const itemInCart = cart.find((item) => {
      return item.id === product.id;
    });
    return itemInCart === undefined ? false : true;
  }

  function handleRemoveFromCart(e, product) {
    e.preventDefault();
    setCart(
      cart.filter((item) => {
        return item.id !== product.id;
      })
    );
  }

  console.log(cart);
  return (
    <div className="products content">
      <h2>Products</h2>
      <div className="product-wrapper">
        {products.map((product, index) => {
          return (
            <div className="product" key={index}>
              <img src={product.image} alt="Product Photo" />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              {checkProductInCart(product) ? (
                <a href="" onClick={(e) => handleRemoveFromCart(e, product)}>
                  Remove From Cart
                </a>
              ) : (
                <a href="" onClick={(e) => handleAddToCart(e, product)}>
                  Add To Cart
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
