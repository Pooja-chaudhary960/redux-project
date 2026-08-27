import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  toggleCart,
} from "../features/cart/cartSlice";

import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();

  const { cartItems, isOpen } = useSelector(
    (state) => state.cart
  );

  // Calculate subtotal
  const total = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Do not display drawer when closed
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/60 z-40"
        onClick={() => dispatch(toggleCart())}
      />

      {/* Cart Drawer */}
      <aside className="fixed top-0 right-0 z-50 h-screen w-full max-w-md bg-slate-950 text-white shadow-2xl flex flex-col">

        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-800 flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 font-semibold">
              Shopping Bag
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Your Cart
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {totalItems} item
              {totalItems !== 1 ? "s" : ""} selected
            </p>
          </div>

          <button
            onClick={() => dispatch(toggleCart())}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {cartItems.length === 0 ? (

            /* Empty Cart */
            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-5">

                <svg
                  className="w-10 h-10 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h12"
                  />
                </svg>

              </div>

              <h3 className="text-xl font-bold">
                Nothing here yet
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Start exploring and add products to your cart.
              </p>

              <button
                onClick={() => dispatch(toggleCart())}
                className="mt-6 bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex gap-4 hover:border-indigo-500/50 transition-colors"
              >

                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0 bg-slate-800 rounded-lg overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">

                  <div className="flex justify-between gap-3">

                    <h3 className="text-sm font-semibold leading-5 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                  </div>

                  {/* Category */}
                  {item.category && (
                    <p className="text-xs text-indigo-400 mt-1">
                      {item.category}
                    </p>
                  )}

                  {/* Bottom Section */}
                  <div className="flex justify-between items-center mt-4">

                    {/* Quantity */}
                    <div className="flex items-center bg-slate-800 rounded-lg overflow-hidden">

                      <button
                        onClick={() =>
                          dispatch(decreaseQty(item.id))
                        }
                        className="w-8 h-8 hover:bg-slate-700 text-lg"
                      >
                        −
                      </button>

                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(increaseQty(item.id))
                        }
                        className="w-8 h-8 hover:bg-indigo-500 transition-colors text-lg"
                      >
                        +
                      </button>

                    </div>

                    {/* Item Price */}
                    <span className="font-bold text-indigo-300">
                      $
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Footer */}
        {cartItems.length > 0 && (

          <div className="border-t border-slate-800 bg-slate-900 px-6 py-6">

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-5">

              <div>
                <p className="text-sm text-slate-400">
                  Estimated Total
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Taxes calculated at checkout
                </p>
              </div>

              <span className="text-2xl font-bold text-white">
                ${total.toFixed(2)}
              </span>

            </div>

            {/* Checkout Button */}
            <Link
              to="/cart"
              onClick={() => dispatch(toggleCart())}
              className="block text-center w-full bg-indigo-500 hover:bg-indigo-400 text-white py-4 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-indigo-500/20"
            >
              Go to Checkout →
            </Link>

            {/* Clear Cart */}
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full mt-4 text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              Remove all items
            </button>

          </div>

        )}

      </aside>
    </>
  );
};

export default CartDrawer;