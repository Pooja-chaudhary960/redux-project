import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/products/productSlice";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= Math.round(rating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <span className="text-xs font-medium text-gray-500">
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.products.wishlist
  );

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const isWishlisted = wishlist.includes(product.id);

  const inCart = cartItems.some(
    (item) => item.id === product.id
  );

  const isOutOfStock = Number(product.stock) === 0;

  const handleImageError = (e) => {
    e.currentTarget.src =
      "https://placehold.co/500x500?text=No+Image";
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
        <img
          src={product.image}
          alt={product.title}
          onError={handleImageError}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Top Section */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
          
          <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
            {product.category || "Product"}
          </span>

          <button
            onClick={() =>
              dispatch(toggleWishlist(product.id))
            }
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition hover:scale-110 ${
              isWishlisted
                ? "bg-rose-500 text-white"
                : "bg-white/90 text-gray-500 hover:text-rose-500"
            }`}
          >
            ♥
          </button>
        </div>

        {/* Stock Status */}
        {isOutOfStock ? (
          <span className="absolute bottom-4 left-4 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
            Out of Stock
          </span>
        ) : product.stock <= 10 ? (
          <span className="absolute bottom-4 left-4 rounded-lg bg-orange-400 px-3 py-1.5 text-xs font-bold text-white">
            Limited Stock: {product.stock}
          </span>
        ) : (
          <span className="absolute bottom-4 left-4 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
            In Stock
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        
        <StarRating rating={product.rating || 0} />

        <h2 className="mt-3 min-h-[48px] text-lg font-bold leading-snug text-slate-900">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description || "High-quality product with excellent features and design."}
        </p>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Price
            </p>

            <p className="text-2xl font-black text-slate-900">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() =>
              dispatch(addToCart(product))
            }
            className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : inCart
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "bg-slate-900 text-white hover:bg-blue-600 active:scale-95"
            }`}
          >
            <span className="text-lg">
              {inCart ? "✓" : "+"}
            </span>

            {isOutOfStock
              ? "Unavailable"
              : inCart
              ? "Added"
              : "Add Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;