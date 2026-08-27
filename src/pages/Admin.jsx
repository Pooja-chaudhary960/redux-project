import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import { deleteProduct } from "../features/products/productSlice";

const Admin = () => {
  const dispatch = useDispatch();

  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const products = useSelector(
    (state) => state.products.products
  );

  // Open add product form
  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  // Open edit product form
  const handleEdit = (product) => {
    setEditData(product);
    setShowForm(true);
  };

  // Delete product with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Calculate statistics
  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  );

  const averagePrice =
    products.length > 0
      ? totalValue / products.length
      : 0;

  const totalCategories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ].length;

  const lowStock = products.filter(
    (product) => product.stock <= 10
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: "📦",
      description: "Products in catalog",
    },
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(0)}`,
      icon: "💰",
      description: "Total product value",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: "🏷️",
      description: "Available categories",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: "⚠️",
      description: "Products need attention",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <p className="text-sm font-semibold text-stone-500">
              Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mt-1">
              Product Management
            </h1>

            <p className="text-stone-500 mt-2">
              Manage and monitor your product catalog.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-stone-700 shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-xl">＋</span>
            Add Product
          </button>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-stone-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-stone-900 mt-2">
                    {stat.value}
                  </h2>

                  <p className="text-xs text-stone-400 mt-2">
                    {stat.description}
                  </p>
                </div>

                <div className="text-3xl bg-stone-100 w-12 h-12 flex items-center justify-center rounded-xl">
                  {stat.icon}
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Product Section */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-stone-100">

            <div>
              <h2 className="text-xl font-bold text-stone-900">
                All Products
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 pl-10 outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400"
              />

              <span className="absolute left-3 top-2.5 text-stone-400">
                🔍
              </span>

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-stone-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase">
                    #
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold text-stone-500 uppercase">
                    Product
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold text-stone-500 uppercase">
                    Category
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold text-stone-500 uppercase">
                    Price
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold text-stone-500 uppercase">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-stone-100">

                {filteredProducts.length > 0 ? (

                  filteredProducts.map(
                    (product, index) => (

                      <tr
                        key={product.id}
                        className="hover:bg-stone-50 transition-colors"
                      >

                        {/* Serial Number */}
                        <td className="px-6 py-4 text-sm text-stone-500">
                          {index + 1}
                        </td>

                        {/* Product */}
                        <td className="px-4 py-4">

                          <div className="flex items-center gap-3">

                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-14 h-14 rounded-xl object-cover border border-stone-100"
                            />

                            <div>
                              <p className="font-semibold text-stone-900 text-sm">
                                {product.title}
                              </p>

                              <p className="text-xs text-stone-400 mt-1">
                                Product ID: {product.id}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Category */}
                        <td className="px-4 py-4">

                          <span className="inline-flex bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-medium">
                            {product.category || "Uncategorized"}
                          </span>

                        </td>

                        {/* Price */}
                        <td className="px-4 py-4">

                          <span className="font-bold text-stone-900">
                            ${Number(product.price).toFixed(2)}
                          </span>

                        </td>

                        {/* Stock */}
                        <td className="px-4 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.stock <= 10
                                ? "bg-red-50 text-red-500"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {product.stock ?? 0} in stock
                          </span>

                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            <button
                              onClick={() =>
                                handleEdit(product)
                              }
                              className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(product.id)
                              }
                              className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-16"
                    >

                      <div className="text-5xl mb-4">
                        📦
                      </div>

                      <h3 className="text-lg font-semibold text-stone-700">
                        No products found
                      </h3>

                      <p className="text-sm text-stone-400 mt-1">
                        Try adding a new product or changing your search.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Product Form Modal */}
      {showForm && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">

              <div>

                <h2 className="text-xl font-bold text-stone-900">
                  {editData
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>

                <p className="text-sm text-stone-400 mt-1">
                  {editData
                    ? "Update product information."
                    : "Fill in the product details."}
                </p>

              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
                className="w-10 h-10 rounded-xl hover:bg-stone-100 text-xl transition"
              >
                ✕
              </button>

            </div>

            {/* Product Form */}
            <div className="p-6">

              <ProductForm
                editData={editData}
                setEditData={setEditData}
                onDone={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Admin;