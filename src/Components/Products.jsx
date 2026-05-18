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

  // MODAL STATE
  const [selectedItem, setSelectedItem] = useState(null);

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

  // BACKGROUND SCROLL LOCK (Jab modal open ho toh pichhe ka page scroll na ho)
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

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
    <div className="min-h-screen bg-gradient-to-r from-[#eef2f3] to-white font-[Poppins] px-4 pb-10 pt-16 relative">
      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[600px] max-[650px]:w-full px-6 py-4 rounded-full border border-[#d1d5db] outline-none text-[16px] bg-white shadow-md transition-all duration-300 focus:border-[lightseagreen] focus:shadow-[0_0_15px_rgba(32,178,170,0.3)]"
        />
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setSelect("")}
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border cursor-pointer
          ${
            select === ""
              ? "bg-[lightseagreen] text-white border-[lightseagreen] shadow-lg scale-105"
              : "bg-white text-black border-gray-300 hover:bg-[lightseagreen] hover:text-white"
          }`}
        >
          All
        </button>

        {cate.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelect(item)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border cursor-pointer
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
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
              >
                {/* IMAGE */}
                <LazyLoadImage
                  src={item.image}
                  effect="blur"
                  alt={item.name}
                  className="w-full h-[240px] object-cover cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                />

                {/* DETAILS */}
                <div className="p-6 flex flex-col flex-grow gap-4">
                  {/* TITLE */}
                  <h3 className="text-[22px] font-bold text-[#222] leading-snug">
                    {item.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[15px] text-[#666] leading-relaxed flex-grow">
                    {item.instructions.join(" ").slice(0, 80)}...
                  </p>

                  {/* CUISINE & INFO */}
                  <div>
                    <span className="inline-block bg-[#eef4ff] text-[lightseagreen] px-4 py-1 rounded-full text-sm font-semibold mb-3">
                      {item.cuisine}
                    </span>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[15px] text-[#222]">
                        ⏱️ {item.cookTimeMinutes} mins
                      </p>
                      <p className="font-bold text-[17px] text-[#f39c12]">
                        ⭐ {item.rating}
                      </p>
                    </div>
                  </div>

                  {/* UPDATE: BUTTON STYLING */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-2 w-full py-3 rounded-xl border-2 border-[lightseagreen] bg-[lightseagreen] text-white font-bold hover:bg-transparent hover:text-[lightseagreen] transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ----------------- SIMPLE MODAL POPUP ----------------- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-xl flex flex-col relative">
            {/* Simple Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedItem.name}
              </h2>
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-red-500 text-3xl leading-none transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 custom-scrollbar">
              {/* Simple Image */}
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-56 object-cover rounded-xl mb-5"
              />

              {/* Basic Info Bar */}
              <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-600">
                <p>⏱ Prep: {selectedItem.prepTimeMinutes}m</p>
                <p>🍳 Cook: {selectedItem.cookTimeMinutes}m</p>
                <p>🍽 Servings: {selectedItem.servings}</p>
                <p>🔥 Calories: {selectedItem.caloriesPerServing}</p>
                <p>⭐ Rating: {selectedItem.rating}</p>
              </div>

              {/* Data Grid: Ingredients & Instructions side by side on big screen */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-1">
                    Ingredients
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                    {selectedItem.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-1">
                    Instructions
                  </h3>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-2 text-sm">
                    {selectedItem.instructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Footer Tags */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-400">
                <span className="font-semibold text-gray-500">Tags: </span>
                {selectedItem.tags.join(", ")} |{" "}
                {selectedItem.mealType.join(", ")} | {selectedItem.difficulty}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
