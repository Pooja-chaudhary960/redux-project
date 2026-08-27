// src/pages/Cart.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/cart/cartSlice";

import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState("");

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Shipping settings
  const freeShippingLimit = 100;

  const shipping =
    subtotal >= freeShippingLimit ? 0 : 9.99;

  // Tax
  const tax = subtotal * 0.08;

  // Final total
  const grandTotal =
    subtotal + shipping + tax;

  // Free shipping progress
  const remainingForFreeShipping = Math.max(
    freeShippingLimit - subtotal,
    0
  );

  const shippingProgress = Math.min(
    (subtotal / freeShippingLimit) * 100,
    100
  );

  // Remove product
  const handleRemove = (id) => {
    const confirmDelete = window.confirm(
      "Remove this product from your cart?"
    );

    if (confirmDelete) {
      dispatch(removeFromCart(id));
    }
  };

  // Clear cart
  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (confirmClear) {
      dispatch(clearCart());
    }
  };

  // Promo code
  const handlePromo = () => {
    if (!promoCode.trim()) {
      alert("Please enter a promo code");
      return;
    }

    alert(`Promo code "${promoCode}" applied!`);
  };

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">

        <div className="text-center max-w-md">

          <div className="w-28 h-28 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">
              🛒
            </span>
          </div>

          <h1 className="text-3xl font-bold text-stone-900">
            Your cart is empty
          </h1>

          <p className="text-stone-500 mt-3">
            Looks like you haven't added any
            products to your cart yet.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 bg-stone-900 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-stone-700 hover:-translate-y-0.5 transition-all"
          >
            ← Start Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

          <div>

            <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
              Shopping
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Your Cart
            </h1>

            <p className="text-stone-500 mt-2">
              {totalItems} item
              {totalItems !== 1 ? "s" : ""} in your cart
            </p>

          </div>

          <button
            onClick={handleClearCart}
            className="self-start sm:self-auto px-4 py-2 text-sm font-medium text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition"
          >
            🗑 Clear Cart
          </button>

        </div>

        {/* Free Shipping Progress */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-8">

          <div className="flex justify-between gap-4 mb-3">

            <div>

              <p className="font-semibold text-stone-800">
                🚚 Free Shipping
              </p>

              <p className="text-sm text-stone-500 mt-1">

                {remainingForFreeShipping > 0
                  ? `Add $${remainingForFreeShipping.toFixed(
                      2
                    )} more to unlock free shipping.`
                  : "Congratulations! You unlocked free shipping!"}

              </p>

            </div>

            <span className="font-bold text-stone-900">
              {shippingProgress.toFixed(0)}%
            </span>

          </div>

          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">

            <div
              className="h-full bg-stone-900 rounded-full transition-all duration-500"
              style={{
                width: `${shippingProgress}%`,
              }}
            />

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Products */}
          <div className="lg:col-span-2 space-y-5">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow"
              >

                <div className="flex gap-4 sm:gap-6">

                  {/* Product Image */}
                  <div className="relative">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl bg-stone-100"
                    />

                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-stone-900 text-white rounded-full text-xs flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>

                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between gap-4">

                      <div>

                        {item.category && (

                          <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                            {item.category}
                          </span>

                        )}

                        <h2 className="font-semibold text-stone-900 text-base sm:text-lg mt-2 line-clamp-2">
                          {item.title}
                        </h2>

                      </div>

                      <button
                        onClick={() =>
                          handleRemove(item.id)
                        }
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition"
                        title="Remove product"
                      >
                        ✕
                      </button>

                    </div>

                    <p className="text-sm text-stone-400 mt-2">
                      ${Number(item.price).toFixed(2)} each
                    </p>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between mt-5">

                      {/* Quantity */}
                      <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQty(item.id)
                            )
                          }
                          className="w-10 h-10 text-lg font-bold text-stone-600 hover:bg-stone-100 transition"
                        >
                          −
                        </button>

                        <span className="w-10 text-center font-bold text-stone-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQty(item.id)
                            )
                          }
                          className="w-10 h-10 text-lg font-bold text-stone-600 hover:bg-stone-100 transition"
                        >
                          +
                        </button>

                      </div>

                      {/* Product Total */}
                      <div className="text-right">

                        <p className="text-xs text-stone-400">
                          Item Total
                        </p>

                        <p className="text-xl font-bold text-stone-900">
                          $
                          {(
                            Number(item.price) *
                            item.quantity
                          ).toFixed(2)}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">

            <div className="bg-white border border-stone-200 rounded-2xl p-6 sticky top-24 shadow-sm">

              <h2 className="text-xl font-bold text-stone-900">
                Order Summary
              </h2>

              <p className="text-sm text-stone-400 mt-1 mb-6">
                Review your order details
              </p>

              {/* Price Details */}
              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-stone-600">

                  <span>
                    Subtotal ({totalItems} items)
                  </span>

                  <span className="font-medium">
                    ${subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between text-stone-600">

                  <span>Shipping</span>

                  {shipping === 0 ? (

                    <span className="font-semibold text-emerald-600">
                      FREE
                    </span>

                  ) : (

                    <span>
                      ${shipping.toFixed(2)}
                    </span>

                  )}

                </div>

                <div className="flex justify-between text-stone-600">

                  <span>Estimated Tax</span>

                  <span>
                    ${tax.toFixed(2)}
                  </span>

                </div>

                <div className="border-t border-stone-200 pt-4 mt-4">

                  <div className="flex justify-between items-center">

                    <span className="font-bold text-stone-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-stone-900">
                      ${grandTotal.toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

              {/* Promo Code */}
              <div className="mt-6">

                <label className="text-sm font-medium text-stone-700">
                  Promo Code
                </label>

                <div className="flex gap-2 mt-2">

                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) =>
                      setPromoCode(e.target.value)
                    }
                    placeholder="Enter code"
                    className="flex-1 min-w-0 border border-stone-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300"
                  />

                  <button
                    onClick={handlePromo}
                    className="bg-stone-100 text-stone-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-stone-200 transition"
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* Checkout Button */}
              <button
                className="w-full mt-6 bg-stone-900 text-white py-4 rounded-xl font-semibold hover:bg-stone-700 hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Proceed to Checkout →
              </button>

              {/* Security Message */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-400">

                <span>🔒</span>

                <span>
                  Secure and protected checkout
                </span>

              </div>

              <Link
                to="/"
                className="block text-center text-sm text-stone-500 mt-5 hover:text-stone-900 transition"
              >
                ← Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;