// src/features/cart/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "shopping_cart";

/* ================================
   BROWSER STORAGE HELPERS
================================ */

const getSavedCart = () => {
  try {
    const savedData =
      localStorage.getItem(CART_STORAGE_KEY);

    if (!savedData) {
      return [];
    }

    const parsedCart =
      JSON.parse(savedData);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];
  } catch (error) {
    console.error(
      "Unable to restore shopping cart:",
      error
    );

    return [];
  }
};

const persistCart = (cartItems) => {
  try {
    const cartData =
      JSON.stringify(cartItems);

    localStorage.setItem(
      CART_STORAGE_KEY,
      cartData
    );
  } catch (error) {
    console.error(
      "Unable to save shopping cart:",
      error
    );
  }
};


/* ================================
   CART ITEM CREATOR
================================ */

const createCartItem = (product) => {
  return {
    id: product.id,
    title: product.title || "Untitled Product",
    price: Number(product.price) || 0,
    image: product.image || "",
    category: product.category || "General",
    quantity: 1,
  };
};


/* ================================
   INITIAL STATE
================================ */

const initialState = {
  cartItems: getSavedCart(),
  isOpen: false,
};


/* ================================
   REDUX CART SLICE
================================ */

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    /* ADD PRODUCT */

    addToCart: (state, action) => {
      const product = action.payload;

      const cartProduct =
        state.cartItems.find(
          (item) =>
            item.id === product.id
        );

      if (cartProduct) {

        // Product already exists
        cartProduct.quantity += 1;

      } else {

        // Create and add new product
        state.cartItems.push(
          createCartItem(product)
        );

      }

      persistCart(state.cartItems);
    },


    /* REMOVE PRODUCT */

    removeFromCart: (state, action) => {
      const productId =
        action.payload;

      state.cartItems =
        state.cartItems.filter(
          (item) =>
            item.id !== productId
        );

      persistCart(state.cartItems);
    },


    /* INCREASE QUANTITY */

    increaseQty: (state, action) => {
      const productId =
        action.payload;

      const product =
        state.cartItems.find(
          (item) =>
            item.id === productId
        );

      if (product) {
        product.quantity += 1;
      }

      persistCart(state.cartItems);
    },


    /* DECREASE QUANTITY */

    decreaseQty: (state, action) => {
      const productId =
        action.payload;

      const product =
        state.cartItems.find(
          (item) =>
            item.id === productId
        );

      if (!product) {
        return;
      }

      if (product.quantity === 1) {

        state.cartItems =
          state.cartItems.filter(
            (item) =>
              item.id !== productId
          );

      } else {

        product.quantity -= 1;

      }

      persistCart(state.cartItems);
    },


    /* EMPTY ENTIRE CART */

    clearCart: (state) => {
      state.cartItems = [];

      persistCart([]);
    },


    /* OPEN / CLOSE CART */

    toggleCart: (state) => {
      state.isOpen =
        !state.isOpen;
    },


    /* EXPLICITLY OPEN CART */

    openCart: (state) => {
      state.isOpen = true;
    },


    /* EXPLICITLY CLOSE CART */

    closeCart: (state) => {
      state.isOpen = false;
    },

  },
});


/* ================================
   EXPORT ACTIONS
================================ */

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;


/* ================================
   EXPORT REDUCER
================================ */

export default cartSlice.reducer;