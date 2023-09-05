import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartInView, setCartInView] = useState(false);

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

  function slideCartIntoView() {
    setCartInView(!cartInView);
  }

  console.log(cart)

  function Cart() {
    return (
      <div
        className="cart sticky"
        style={{ right: cartInView ? "0" : "-250px" }}
      >
        <div className="handle" onClick={slideCartIntoView}>
          Cart <ShoppingCartIcon />
        </div>
        <ul className="cart-items">
          {cart.map((item, index) => {
            return (
              <li key={index}>
                {
                  <>
                    <img src={item.image} alt="Cart Product Photo" />
                    <span>{item.title}</span>
                  </>
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <>
      <Cart />
      <div className="products content">
        <h2>Products</h2>
        <div className="product-wrapper">
          {products.map((product, index) => {
            return (
              <div className="product" key={index}>
                <Link to={"/products/" + index}>
                  <img src={product.image} alt="Product Photo" />
                </Link>
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
    </>
  );
}

export default Products;
