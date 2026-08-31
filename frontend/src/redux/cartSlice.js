import { createSlice } from "@reduxjs/toolkit";

const getCartItemId = (item) => item?._id || item?.productId;

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTOCart: (state, action) => {
      const item = action.payload;
      const itemId = getCartItemId(item);
      const existItem = state.cartItems.find((x) => getCartItemId(x) === itemId);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => {
          if (getCartItemId(x) === itemId) {
            const incomingQty = typeof item.qty === 'number' ? item.qty : 1;
            const nextQty = item?.isQtyUpdate
              ? Math.max(1, incomingQty)
              : (x.qty || 0) + 1;
            return { ...x, ...item, qty: nextQty };
          }
          return x;
        });
      } else {
        state.cartItems.push({ ...item, qty: Math.max(1, item.qty || 1) });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter(
        (x) => getCartItemId(x) !== itemId
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addTOCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;