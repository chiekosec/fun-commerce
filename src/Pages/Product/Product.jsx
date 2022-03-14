import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="sticky-header">
        <Link to='/products' style={{position: 'absolute', left: "10px", textDecoration: 'none'}}>Back to Products</Link>
        <img src="logo192.png" alt="🧮" />
      </header>
      <div className="product-page-container">
        <div className="product-page__image-container">
          <img src={productData.image} alt="product" />
        </div>
        <div className="product-page__content-container">
          <h2>{productData.title}</h2>
          <p>{productData.description}</p>
          <div className="rating-container">
            <div className="rating">{productData.rating.rate}</div>
            <span>⭐</span>
            <div className="rating-count">{productData.rating.count}</div>
          </div>
          <div className="product-price-container">
            <span>
              Price: 
              <span> ${productData.price}</span>
            </span>
          </div>
          <div className="price-container"></div>
        </div>
      </div>
    </>
  );
};

export default Product;
