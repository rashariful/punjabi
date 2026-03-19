import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
// import { Product } from "@/lib/products";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface User {
  name: string;
  email: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  isAuthenticated: boolean;
  user: User | null;
}

// ✅ SSR-safe initial state
const getInitialState = (): StoreState => {
  if (typeof window === "undefined") {
    return {
      cart: [],
      wishlist: [],
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
      wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
      user: JSON.parse(localStorage.getItem("user") || "null"),
      isAuthenticated: !!localStorage.getItem("user"),
    };
  } catch {
    return {
      cart: [],
      wishlist: [],
      isAuthenticated: false,
      user: null,
    };
  }
};

type StoreAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "ADD_TO_WISHLIST"; product: Product }
  | { type: "REMOVE_FROM_WISHLIST"; productId: string }
  | { type: "LOGIN"; user: User }
  | { type: "LOGOUT" }
  | { type: "CLEAR_CART" };

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(i => i.id === action.product.id);

      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(i => i.id !== action.productId),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart:
          action.quantity <= 0
            ? state.cart.filter(i => i.id !== action.productId)
            : state.cart.map(item =>
                item.id === action.productId
                  ? { ...item, quantity: action.quantity }
                  : item
              ),
      };

    case "ADD_TO_WISHLIST": {
      if (state.wishlist.some(i => i.id === action.product.id)) {
        return state;
      }

      return {
        ...state,
        wishlist: [...state.wishlist, action.product],
      };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(i => i.id !== action.productId),
      };

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        cart: [],
        wishlist: [],
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

// ✅ Proper typing
interface StoreContextType {
  state: StoreState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  login: (user: User) => void;
  logout: () => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, getInitialState());

  // ✅ Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // ✅ Persist wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  // ✅ Persist user
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  const addToCart = (product: Product) => {
    const exists = state.cart.find(i => i.id === product.id);

    dispatch({ type: "ADD_TO_CART", product });

    toast({
      title: exists ? "Quantity updated" : "Added to cart",
      description: product.name,
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId: id });
    toast({ title: "Removed from cart" });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", productId: id, quantity });
  };

  const addToWishlist = (product: Product) => {
    if (state.wishlist.some(item => item.id === product.id)) {
      toast({ title: "Already in wishlist" });
      return;
    }

    dispatch({ type: "ADD_TO_WISHLIST", product });
    toast({ title: "Added to wishlist", description: product.name });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", productId: id });
    toast({ title: "Removed from wishlist" });
  };

  const login = (user: User) => {
    dispatch({ type: "LOGIN", user });
    toast({ title: "Login successful" });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast({ title: "Logged out" });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const getTotalPrice = () =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        login,
        logout,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// ✅ Custom hook
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

// old version 
// import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   size: string;
//   color: string;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   totalItems: number;
//   totalPrice: number;
// }

// type CartAction =
//   | { type: 'ADD_TO_CART'; payload: CartItem }
//   | { type: 'REMOVE_FROM_CART'; payload: string }
//   | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
//   | { type: 'CLEAR_CART' };

// const initialState: CartState = {
//   items: [],
//   totalItems: 0,
//   totalPrice: 0,
// };

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       const existingItemIndex = state.items.findIndex(
//         item => item.id === action.payload.id && 
//                 item.size === action.payload.size && 
//                 item.color === action.payload.color
//       );

//       let newItems;
//       if (existingItemIndex >= 0) {
//         newItems = state.items.map((item, index) =>
//           index === existingItemIndex
//             ? { ...item, quantity: item.quantity + action.payload.quantity }
//             : item
//         );
//       } else {
//         newItems = [...state.items, action.payload];
//       }

//       const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
//       const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//       return { items: newItems, totalItems, totalPrice };
//     }

//     case 'REMOVE_FROM_CART': {
//       const newItems = state.items.filter(item => item.id !== action.payload);
//       const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
//       const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//       return { items: newItems, totalItems, totalPrice };
//     }

//     case 'UPDATE_QUANTITY': {
//       const newItems = state.items.map(item =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       ).filter(item => item.quantity > 0);

//       const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
//       const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//       return { items: newItems, totalItems, totalPrice };
//     }

//     case 'CLEAR_CART':
//       return initialState;

//     default:
//       return state;
//   }
// };

// interface CartContextType extends CartState {
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const addToCart = (item: CartItem) => {
//     dispatch({ type: 'ADD_TO_CART', payload: item });
//   };

//   const removeFromCart = (id: string) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: id });
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
//   };

//   const clearCart = () => {
//     dispatch({ type: 'CLEAR_CART' });
//   };

//   const contextValue: CartContextType = {
//     ...state,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };