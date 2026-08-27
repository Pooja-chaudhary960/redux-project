import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../components/ProductCard";

import {
  setCategory,
  setSortBy,
} from "../features/products/productSlice";

const CATEGORIES = [
  "All",
  "Electronics",
  "Accessories",
  "Footwear",
  "Bags",
  "Lifestyle",
];

const PRODUCTS_PER_PAGE = 8;

const Home = () => {
  const dispatch = useDispatch();

  const {
    products,
    searchQuery,
    selectedCategory,
    sortBy,
  } = useSelector((state) => state.products);

  // Current pagination page
  const [currentPage, setCurrentPage] =
    useState(1);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.title
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            ) ||
          (product.description || "")
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            );

        const matchesCategory =
          selectedCategory === "All" ||
          product.category === selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (
            Number(a.price) -
            Number(b.price)
          );
        }

        if (sortBy === "price-desc") {
          return (
            Number(b.price) -
            Number(a.price)
          );
        }

        if (sortBy === "rating") {
          return (
            (b.rating || 0) -
            (a.rating || 0)
          );
        }

        return 0;
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    sortBy,
  ]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    PRODUCTS_PER_PAGE;

  const endIndex =
    startIndex +
    PRODUCTS_PER_PAGE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

  // Change page
  const goToPage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Category icons
  const categoryIcons = {
    All: "✦",
    Electronics: "⚡",
    Accessories: "⌚",
    Footwear: "👟",
    Bags: "👜",
    Lifestyle: "✨",
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 min-h-[420px] mb-12">

          {/* Background effects */}
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-32 -left-32" />

          <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -bottom-40 right-0" />

          {/* Grid effect */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-7 py-12 sm:px-14 sm:py-16 max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 px-4 py-2 rounded-full mb-6">

              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />

              <span className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">
                Trending Collection
              </span>

            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">

              Find what
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                moves you.
              </span>

            </h1>

            <p className="text-slate-400 text-base sm:text-lg mt-6 max-w-xl leading-8">

              Explore a carefully selected collection
              of products designed for everyday life,
              style, technology, and everything in between.

            </p>

            <a
              href="#products"
              className="inline-flex items-center gap-3 mt-8 bg-cyan-400 text-slate-950 px-6 py-3.5 rounded-xl font-bold hover:bg-cyan-300 hover:scale-105 transition-all"
            >

              Browse Collection

              <span className="text-lg">
                ↓
              </span>

            </a>

          </div>

          {/* Hero decoration */}
          <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 w-72 h-72 border border-white/10 rounded-full items-center justify-center">

            <div className="w-56 h-56 border border-cyan-400/30 rounded-full flex items-center justify-center">

              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-5xl shadow-2xl">
                🛍️
              </div>

            </div>

          </div>

        </section>


        {/* ================= CATEGORY SECTION ================= */}

        <section
          id="products"
          className="mb-10"
        >

          <div className="flex items-end justify-between mb-5">

            <div>

              <p className="text-cyan-600 text-xs font-bold uppercase tracking-[0.2em]">
                Browse
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Shop by category
              </h2>

            </div>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

            {CATEGORIES.map((category) => {

              const active =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() =>
                    dispatch(
                      setCategory(category)
                    )
                  }
                  className={`group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${
                    active
                      ? "bg-slate-900 text-white shadow-xl shadow-slate-300 scale-[1.02]"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >

                  <div
                    className={`text-2xl mb-3 transition-transform group-hover:scale-110 ${
                      active
                        ? ""
                        : ""
                    }`}
                  >
                    {categoryIcons[category]}
                  </div>

                  <p className="text-sm font-bold">
                    {category}
                  </p>

                  {active && (
                    <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-cyan-400" />
                  )}

                </button>
              );
            })}

          </div>

        </section>


        {/* ================= PRODUCT CONTROL BAR ================= */}

        <section className="bg-slate-900 rounded-3xl p-5 sm:p-6 mb-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

            {/* Results */}
            <div>

              <p className="text-slate-400 text-sm">
                Showing products
              </p>

              <p className="text-white text-xl font-bold mt-1">

                {filteredProducts.length}

                <span className="text-slate-400 font-normal text-sm ml-2">
                  product
                  {filteredProducts.length !== 1
                    ? "s"
                    : ""} found
                </span>

              </p>

              {searchQuery && (

                <p className="text-cyan-400 text-sm mt-2">

                  Search result for:

                  <span className="font-bold ml-1">
                    "{searchQuery}"
                  </span>

                </p>

              )}

            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">

              <span className="text-sm text-slate-400">
                Sort products
              </span>

              <select
                value={sortBy}
                onChange={(e) =>
                  dispatch(
                    setSortBy(
                      e.target.value
                    )
                  )
                }
                className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              >

                <option value="default">
                  Default Order
                </option>

                <option value="price-asc">
                  Lowest Price
                </option>

                <option value="price-desc">
                  Highest Price
                </option>

                <option value="rating">
                  Highest Rated
                </option>

              </select>

            </div>

          </div>

        </section>


        {/* ================= PRODUCTS ================= */}

        {paginatedProducts.length > 0 ? (

          <>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {paginatedProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                )
              )}

            </div>


            {/* ================= PAGINATION ================= */}

            {totalPages > 1 && (

              <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">

                {/* Previous */}
                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    goToPage(
                      currentPage - 1
                    )
                  }
                  className={`h-11 px-5 rounded-full text-sm font-bold transition-all ${
                    currentPage === 1
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-cyan-400 hover:text-cyan-600"
                  }`}
                >
                  ← Previous
                </button>


                {/* Page Numbers */}
                <div className="flex gap-2">

                  {Array.from(
                    {
                      length:
                        totalPages,
                    },
                    (_, index) => (

                      <button
                        key={index}
                        onClick={() =>
                          goToPage(
                            index + 1
                          )
                        }
                        className={`w-11 h-11 rounded-full font-bold text-sm transition-all ${
                          currentPage ===
                          index + 1
                            ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-200 scale-110"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-400"
                        }`}
                      >
                        {index + 1}
                      </button>

                    )
                  )}

                </div>


                {/* Next */}
                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    goToPage(
                      currentPage + 1
                    )
                  }
                  className={`h-11 px-5 rounded-full text-sm font-bold transition-all ${
                    currentPage ===
                    totalPages
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-slate-900 text-white hover:bg-cyan-500 hover:text-slate-950"
                  }`}
                >
                  Next →
                </button>

              </div>

            )}

          </>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="py-24 text-center">

            <div className="relative w-28 h-28 mx-auto mb-7">

              <div className="absolute inset-0 bg-cyan-300 rounded-full blur-2xl opacity-30" />

              <div className="relative w-full h-full rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-4xl">
                🔍
              </div>

            </div>

            <p className="text-cyan-600 text-xs uppercase tracking-[0.25em] font-bold">
              No Match
            </p>

            <h2 className="text-3xl font-black text-slate-900 mt-3">
              We couldn't find that
            </h2>

            <p className="text-slate-500 mt-3 max-w-md mx-auto leading-7">

              Try searching for something else
              or choose another category.

            </p>

            <button
              onClick={() =>
                dispatch(
                  setCategory("All")
                )
              }
              className="mt-7 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all"
            >
              View All Products
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default Home;