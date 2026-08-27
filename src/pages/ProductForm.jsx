import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../features/products/productSlice";

const CATEGORIES = ["Electronics", "Accessories", "Footwear", "Bags", "Lifestyle", "Other"];

const ProductForm = ({ editData, setEditData, onDone }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setPrice(editData.price || "");
      setImage(editData.image || "");
      setCategory(editData.category || "Electronics");
      setDescription(editData.description || "");
      setStock(editData.stock ?? "");
    }
  }, [editData]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      id: editData ? editData.id : Date.now(),
      title,
      price: Number(price),
      image,
      category,
      description,
      stock: Number(stock) || 0,
      rating: editData?.rating || (4 + Math.random()).toFixed(1) * 1,
    };

    if (editData) {
      dispatch(updateProduct(productData));
      setEditData(null);
    } else {
      dispatch(addProduct(productData));
    }

    onDone?.();
  };

  const inputClass =
    "w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all bg-stone-50 focus:bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
          Title *
        </label>

        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
            Price *
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
            Stock
          </label>

          <input
            type="number"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
          Description
        </label>

        <textarea
          placeholder="Brief product description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className={inputClass + " resize-none"}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
          Image *
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="text-sm text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-stone-900 file:text-white hover:file:bg-stone-700"
          required={!editData && !image}
        />

        {image && (
          <img
            src={image}
            alt="preview"
            className="mt-2 h-24 w-24 object-cover rounded-xl border border-stone-200"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-stone-900 text-white py-3 rounded-xl font-semibold hover:bg-stone-700 transition-colors active:scale-[0.98]"
      >
        {editData ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;