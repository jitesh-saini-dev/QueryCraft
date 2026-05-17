import React, { useEffect, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slice/productSlice";

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
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [progress, setProgress] = useState(0);
  const [select, setSelect] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
    }
  }, [loading]);

  // SEARCH FILTER
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.instructions.join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  // CATEGORY ARRAY
  const cate = [...new Set(data.map((x) => x.cuisine))];

  // CATEGORY FILTER
  const catebtns = select
    ? filteredData.filter((x) => x.cuisine === select)
    : filteredData;

  // SORTING
  let sortedData = [...catebtns];

  if (sort === "atoz") {
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "rating") {
    sortedData.sort((a, b) => b.rating - a.rating);
  } else if (sort === "time") {
    sortedData.sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eef2f3] to-white font-[Poppins] px-4 pb-10 pt-16">
      
      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[600px] max-[650px]:w-full px-6 py-4 rounded-full border border-[#d1d5db] outline-none text-[16px] bg-white shadow-md transition-all duration-300 focus:border-[#007bff] focus:shadow-[0_0_15px_rgba(0,123,255,0.3)]"
        />
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {/* ALL BUTTON */}
        <button
          onClick={() => setSelect("")}
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border
          ${
            select === ""
              ? "bg-[lightseagreen] text-white border-[lightseagreen] shadow-lg scale-105"
              : "bg-white text-black border-gray-300 hover:bg-[lightseagreen] hover:text-white"
          }`}
        >
          All
        </button>

        {/* CATEGORY BUTTONS */}
        {cate.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelect(item)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border
            ${
              select === item
                ? "bg-[lightseagreen] text-white border-[lightseagreen] shadow-lg scale-105"
                : "bg-white text-black border-gray-300 hover:bg-[lightseagreen] hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="flex justify-center mt-4 mb-14">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-6 py-3 rounded-2xl border border-[#ccc] cursor-pointer text-[16px] bg-white shadow-md outline-none"
        >
          <option value="">Sort By</option>
          <option value="atoz">Name A-Z</option>
          <option value="rating">Top Rated</option>
          <option value="time">Cooking Time</option>
        </select>
      </div>

      {/* LOADER */}
      {loading ? (
        <div className="flex justify-center mt-[80px]">
          <CircularProgressWithLabel value={progress} />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 max-[1100px]:grid-cols-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1">
          {sortedData.length === 0 ? (
            <h2 className="text-center col-span-full text-2xl font-semibold text-gray-600">
              No data Found 😕
            </h2>
          ) : (
            sortedData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
              >
                {/* IMAGE */}
                <LazyLoadImage
                  src={item.image}
                  effect="blur"
                  alt={item.name}
                  className="w-full h-[240px] object-cover"
                />

                {/* DETAILS */}
                <div className="p-6 flex flex-col gap-4">
                  {/* TITLE */}
                  <h3 className="text-[22px] font-bold text-[#222] leading-snug">
                    {item.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[15px] text-[#666] leading-relaxed">
                    {item.instructions.join(" ").slice(0, 100)}...
                  </p>

                  {/* CUISINE */}
                  <div>
                    <span className="inline-block bg-[#eef4ff] text-[#007bff] px-4 py-1 rounded-full text-sm font-semibold">
                      {item.cuisine}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-[15px] text-[#222]">
                      ⏱️ {item.cookTimeMinutes} mins
                    </p>

                    <p className="font-bold text-[17px] text-[#f39c12]">
                      ⭐ {item.rating}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
