import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { products, wishlist } = useSelector(
    (state) => state.products
  );

  // Get only products saved in wishlist
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  // Empty wishlist
  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-violet-50 via-white to-pink-50 flex items-center justify-center px-4">

        <div className="max-w-md w-full text-center">

          {/* Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 blur-xl opacity-20" />

            <div className="relative w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center text-5xl">
              ♡
            </div>

          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500 mb-3">
            Your Collection
          </p>

          <h1 className="text-4xl font-black text-slate-900">
            Nothing saved yet
          </h1>

          <p className="text-slate-500 mt-4 leading-7">
            When you find something you love, save it here
            and come back whenever you're ready.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-3 mt-8 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 hover:scale-105 transition-transform"
          >
            Discover Products
            <span>→</span>
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 px-6 sm:px-10 py-10 mb-10 shadow-xl">

          {/* Decorative circles */}
          <div className="absolute w-56 h-56 rounded-full bg-white/10 -top-24 -right-16" />

          <div className="absolute w-40 h-40 rounded-full bg-pink-300/20 -bottom-20 right-32" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>

              <p className="text-white/70 text-sm font-medium uppercase tracking-widest">
                Personal Collection
              </p>

              <h1 className="text-4xl sm:text-5xl font-black text-white mt-2">
                My Wishlist
              </h1>

              <p className="text-white/80 mt-3 max-w-md">
                Keep track of the products you love and
                move them to your cart whenever you're ready.
              </p>

            </div>

            {/* Wishlist count */}
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 text-center">

              <div className="text-4xl font-black text-white">
                {wishlistProducts.length}
              </div>

              <div className="text-xs uppercase tracking-wider text-white/70 mt-1">
                Saved
              </div>

            </div>

          </div>

        </div>

        {/* Products heading */}
        <div className="flex items-end justify-between mb-5">

          <div>

            <p className="text-sm text-slate-400">
              Your favorite products
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Saved Items
            </h2>

          </div>

          <Link
            to="/"
            className="hidden sm:inline-flex text-sm font-semibold text-violet-600 hover:text-violet-800 transition"
          >
            + Explore more
          </Link>

        </div>

        {/* Wishlist Products */}
        <div className="space-y-4">

          {wishlistProducts.map((product, index) => (

            <div
              key={product.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-violet-100 hover:shadow-xl hover:shadow-violet-100 transition-all"
            >

              {/* Number */}
              <div className="absolute top-0 left-0 w-14 h-14 bg-violet-600 text-white font-bold flex items-center justify-center rounded-br-3xl z-10">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="flex flex-col sm:flex-row">

                {/* Product Image */}
                <div className="sm:w-64 h-52 sm:h-auto overflow-hidden bg-slate-100">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                </div>

                {/* Product Details */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">

                  <div>

                    {product.category && (

                      <span className="inline-block bg-violet-50 text-violet-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {product.category}
                      </span>

                    )}

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
                      {product.title}
                    </h2>

                    {product.description && (

                      <p className="text-sm text-slate-500 mt-3 leading-6 max-w-2xl line-clamp-2">
                        {product.description}
                      </p>

                    )}

                  </div>

                  {/* Bottom */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-7">

                    <div>

                      <p className="text-xs text-slate-400 uppercase tracking-wider">
                        Price
                      </p>

                      <p className="text-3xl font-black text-slate-900 mt-1">
                        ${Number(product.price).toFixed(2)}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      {/* Remove */}
                      <button
                        onClick={() =>
                          dispatch(
                            toggleWishlist(product.id)
                          )
                        }
                        className="w-12 h-12 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                        title="Remove from wishlist"
                      >
                        ♥
                      </button>

                      {/* Add to Cart */}
                      <button
                        onClick={() =>
                          dispatch(addToCart(product))
                        }
                        className="flex-1 sm:flex-none px-6 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-violet-100 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
                      >
                        Add to Cart →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Continue shopping */}
        <div className="mt-10 text-center">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-violet-600 transition"
          >
            ← Continue exploring products
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Wishlist;