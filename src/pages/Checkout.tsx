import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/contexts/StoreContext";
import { useGtmEvents } from "@/hooks/useGtmEvents";

const Checkout = () => {
  const { state, getTotalPrice, clearCart } = useStore();
  const { trackInitialCheckout, trackPurchase } = useGtmEvents();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    deliveryMethod: "standard",
    paymentMethod: "cod",
  });

  // ✅ CALCULATIONS
const subtotal = getTotalPrice();

const tax = Number((subtotal * 0.08).toFixed(2));

const shipping = formData.deliveryMethod === "express" ? 9.99 : 0;

const total = Number((subtotal + tax + shipping).toFixed(2));

  // ✅ BEGIN CHECKOUT (ONLY ON PAGE LOAD)
  useEffect(() => {
    if (state.cart.length === 0) return;

    trackInitialCheckout({
      total,
      items: state.cart,
    });
  }, []);

  // ✅ INPUT HANDLER
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ ORDER SUBMIT + PURCHASE TRACKING
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const orderId = Date.now().toString();

      console.log("✅ Order Successful");

      // 🔥 PURCHASE EVENT (GA4 SAFE)
      trackPurchase({
        order_id: orderId,
        value: total,
        items: state.cart,

        customer_name: formData.firstName + " " + formData.lastName,
        phone_number: formData.phone,
        delivery_area: formData.city,
      });

      clearCart();
      setIsLoading(false);

      navigate("/order-confirmation");
    }, 1500);
  };

  // ✅ EMPTY CART REDIRECT
  if (state.cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* DELIVERY INFO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <Input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />

                <Select
                  value={formData.state}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, state: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  name="zipCode"
                  placeholder="ZIP"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* DELIVERY METHOD */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.deliveryMethod}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, deliveryMethod: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard (Free)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express ($9.99)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* PAYMENT */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, paymentMethod: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {state.cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  {/* Left Side */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-14 h-14 object-cover rounded-lg border"
                      alt={item.name}
                    />

                    <div className="flex flex-col">
                      {/* 🔥 Product Link */}
                      <a
                        href={`/products/${item.id}`}
                        className="font-medium transition-all duration-200 hover:underline hover:text-primary"
                      >
                        {item.name}
                      </a>

                      <span className="text-gray-500 text-xs">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="font-semibold">
                    ${Number(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : `Place Order`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
