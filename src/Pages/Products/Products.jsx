import React, { useEffect, useState } from "react";
import PageNumbers from "../../components/PageNumbers/PageNumbers";
import "./Products.css";
import { SORT_CATEGORY, SORT_DATA } from "../../Utils";
import { useNavigate } from "react-router";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [perPageLimit, setPerPageLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [pageNumbersLimit, setPageNumbersLimit] = useState(5);
  const [pageNumberLowerIndex, setPageNumberLowerIndex] = useState(0);
  const [pageNumberHigherIndex, setPageNumberHigherIndex] = useState(5);
  const [sortCategory, setSortCategory] = useState("");
  const [show, setShow] = useState(false);

  const lastitemIndex = currentPageNumber * perPageLimit;
  const firstItemIndex = lastitemIndex - perPageLimit;
  const itemsToRender = products.slice(firstItemIndex, lastitemIndex);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleNextButton = () => {
    setCurrentPageNumber((number) => number + 1);
    if (currentPageNumber + 1 > pageNumberHigherIndex) {
      setPageNumberHigherIndex((number) => number + pageNumbersLimit);
      setPageNumberLowerIndex((number) => number + pageNumbersLimit);
    }
  };

  const handlePrevButton = () => {
    setCurrentPageNumber((number) => number - 1);
    if ((currentPageNumber - 1) % pageNumberLowerIndex === 0) {
      setPageNumberHigherIndex((number) => number - pageNumbersLimit);
      setPageNumberLowerIndex((number) => number - pageNumbersLimit);
    }
  };

  const handleSort = (categoryName) => {
    switch (categoryName) {
      case SORT_CATEGORY.priceLowToHigh:
        setProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case SORT_CATEGORY.priceHighToLow:
        setProducts([...products].sort((a, b) => b.price - a.price));
        break;
      case SORT_CATEGORY.customerRating:
        setProducts(
          [...products].sort((a, b) => b.rating.rate - a.rating.rate)
        );
        break;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="sticky-header">
        <img src="logo192.png" alt="🧮" />
      </header>
      <div className="products-container">
        <div className="products-header">
          <div className="limit-container">
            <select onChange={(e) => setPerPageLimit(e.target.value)}>
              <option disabled selected>
                Items Per Page
              </option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="sort-container" onClick={() => setShow(true)}>
            <span>
              Sort By: <span>{sortCategory}</span>
            </span>
            <ul
              className="sort-container__dropdown"
              style={show ? { display: "block" } : {}}
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
              }}
            >
              {SORT_DATA.map((category) => {
                return (
                  <li
                    key={category.id}
                    onClick={() => {
                      setSortCategory(category.name);
                      handleSort(category.name);
                    }}
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="product-items-container">
          {itemsToRender.map((product) => {
            return (
              <div
                key={product.id}
                className="product-item"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                }}
              >
                <div className="product-image-container">
                  <img src={product.image} alt="product" />
                </div>
                <div className="product-title-container">
                  <span>
                    {product.title.length > 62
                      ? product.title.slice(0, 52) + "..."
                      : product.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <PageNumbers
          itemsPerPage={perPageLimit}
          totalItems={products.length}
          onChange={setCurrentPageNumber}
          current={currentPageNumber}
          bottomIndex={pageNumberLowerIndex}
          topIndex={pageNumberHigherIndex}
          handleNext={handleNextButton}
          handlePrev={handlePrevButton}
        />
      </div>
    </>
  );
}

export default Products;
