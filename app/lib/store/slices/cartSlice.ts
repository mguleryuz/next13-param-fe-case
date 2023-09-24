import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PackageProps } from "../../../components/Package";

const initialState = {
  isActive: false,
  packages: <PackageProps[]>[],
  packageIds: <number[]>[],
  totalAmount: 0,
  currency: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Partial<CartState>>) => ({
      ...state,
      ...action.payload,
    }),
    toggleToCart: (state, action: PayloadAction<PackageProps>) => {
      // Prep Return Object
      const returnObj = {
        ...state,
      };
      // Add if doesnt exist
      if (!state.packages.some((i) => i.id === action.payload.id)) {
        returnObj.packages = [...state.packages, action.payload];
        returnObj.packageIds = returnObj.packages.map((i) => i.id);
        returnObj.totalAmount = state.totalAmount + action.payload.amount;
      }
      // Remove if exists
      else {
        returnObj.packages = state.packages.filter(
          (i) => i.id !== action.payload.id
        );
        returnObj.packageIds = returnObj.packages.map((i) => i.id);
        returnObj.totalAmount = state.totalAmount - action.payload.amount;
      }
      returnObj.isActive = !!returnObj.packageIds.length;
      returnObj.currency = action.payload.currency;
      return returnObj;
    },
    resetCart: () => initialState,
  },
});

export type CartState = typeof initialState;

// Action creators are generated for each case reducer function
export const { setCart, resetCart, toggleToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
