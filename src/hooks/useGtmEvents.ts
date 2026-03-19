
import { pushToDataLayer } from "@/lib/gtm";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { pushToDataLayer } from "../lib/gtm";

type GTMEventData = Record<string, any>;

export const useGtmEvents = () => {
  const location = useLocation();

  // 🔹 PAGE VIEW
  useEffect(() => {
    const url = location.pathname + location.search;

    console.log("📄 GTM page_view:", url);

    pushToDataLayer("page_view", {
      page_path: url,
    });
  }, [location]);

  // 🔹 Generic
  const trackEvent = (event: string, data?: GTMEventData) => {
    console.log(`📊 GTM Event: ${event}`, data);

    pushToDataLayer(event, data);
  };
  // 🔹 VIEW ITEM
  const trackContentView = (product: {
    id: string;
    name?: string;
    price?: number;
    category?: string;
  }) => {
    trackEvent("view_item", {
      ecommerce: {
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
             item_category: product.category || "general",
          },
        ],
      },
    });
  };
  // 🔹 ADD TO CART
  const trackAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    category?: string;
  }) => {
    trackEvent("add_to_cart", {
      ecommerce: {
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: product.quantity || 1,
            item_category: product.category || "general",
          },
        ],
      },
    });
  };
const trackAddToWishlist = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) => {
  const payload = {
    event: "add_to_wishlist",

    ecommerce: {
      currency: "BDT",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || "general",
          quantity: 1,
        },
      ],
    },
  };

  console.log("💖 GTM WISHLIST EVENT:", payload);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};
  // 🔹 BEGIN CHECKOUT
  const trackInitialCheckout = (cart: {
    total: number;
    items: any[];
  }) => {
    trackEvent("begin_checkout", {
      ecommerce: {
        value: cart.total,
        currency: "BDT",
        items: cart.items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
           item_category: item.category || "general",
        })),
      },
    });
  };

  // 🔹 ✅ PURCHASE (FINAL – GA4 CORRECT)
  const trackPurchase = (order: {
    order_id: string;
    value: number;
    currency?: string;
    items: any[];
    customer_name: string;
    phone_number: string;
    delivery_area: string;
  }) => {
    const payload = {
      ecommerce: {
        transaction_id: order.order_id,
        value: order.value,
        currency: order.currency || "BDT",
        items: order.items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
           item_category: item.category || "general",
        })),
      },
      customer_name: order.customer_name,
      phone_number: order.phone_number,
      delivery_area: order.delivery_area,
    };

    console.log("💰 GTM PURCHASE EVENT:", payload);

    pushToDataLayer("purchase", payload);
  };

  return {
    trackEvent,
    trackContentView,
    trackAddToCart,
    trackAddToWishlist,
    trackInitialCheckout,
    trackPurchase,
  };
};
