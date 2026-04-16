import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// MUI imports
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// 🔥 Progress Component
function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 🔥 API CALL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/recipes");

        setProgress(60); // mid progress

        setProducts(res.data.recipes);

        setProgress(100); // done
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔄 FAKE PROGRESS (smooth animation)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // 🔍 SEARCH
  const filteredData = products.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.instructions.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 SORT
  let sortedData = [...filteredData];

  if (sort === "atoz") {
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "rating") {
    sortedData.sort((a, b) => b.rating - a.rating);
  } else if (sort === "time") {
    sortedData.sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
  }

  return (
    <>
      {/* 🔍 SEARCH */}
      <div className="searchingbox">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />
      </div>

      {/* 🔽 SORT */}
      <div className="sortingbox">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sort"
        >
          <option value="">Sort By</option>
          <option value="atoz">Name A-Z</option>
          <option value="rating">Top Rated</option>
          <option value="time">Cooking Time</option>
        </select>
      </div>

      {/* ⏳ LOADER */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgressWithLabel value={progress} />
        </div>
      ) : (
        <div className="product-container">
          {sortedData.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>No data Found 😕</h2>
          ) : (
            sortedData.map((item) => (
              <div key={item.id} className="product-card">

                {/* ⚡ Lazy Image */}
                <LazyLoadImage
                  src={item.image}
                  effect="blur"
                  alt={item.name}
                  className="product-image"
                />

                <div className="product-details">
                  <h3>{item.name}</h3>

                  <p>
                    {item.instructions.join(" ").slice(0, 100)}...
                  </p>

                  <p>⏱️ Time: {item.cookTimeMinutes} mins</p>
                  <p>⭐ Rating: {item.rating}</p>
                </div>

              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Products;