import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, MapPin, Package, Shield, Clock } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useGtmEvents } from "@/hooks/useGtmEvents";
import { useStore } from "@/context/StoreContext";

const Checkout = () => {
  const { state, getTotalPrice, clearCart } = useStore();
  const { trackInitialCheckout, trackPurchase } = useGtmEvents();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(70); // Default Inside Dhaka

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    deliveryArea: "inside-dhaka", // New field for delivery area
    paymentMethod: "cod",
  });

  // ✅ UPDATE DELIVERY CHARGE BASED ON AREA
  useEffect(() => {
    if (formData.deliveryArea === "inside-dhaka") {
      setDeliveryCharge(70);
    } else {
      setDeliveryCharge(120);
    }
  }, [formData.deliveryArea]);

  // ✅ CALCULATIONS
  const subtotal = getTotalPrice();
  const total = Number((subtotal + deliveryCharge).toFixed(2));

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

      trackPurchase({
        order_id: orderId,
        value: total,
        items: state.cart,
        customer_name: formData.firstName + " " + formData.lastName,
        phone_number: formData.phone,
        delivery_area: formData.deliveryArea,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Secure checkout • Cash on Delivery only</p>
        </div>

      

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* DELIVERY INFO */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="House, Road, Area"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="border-gray-200 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Division</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, state: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="chittagong">Chittagong</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                        <SelectItem value="khulna">Khulna</SelectItem>
                        <SelectItem value="rajshahi">Rajshahi</SelectItem>
                        <SelectItem value="barisal">Barisal</SelectItem>
                        <SelectItem value="rangpur">Rangpur</SelectItem>
                        <SelectItem value="mymensingh">Mymensingh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Post Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="ZIP"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryArea">Delivery Area</Label>
                    <Select
                      value={formData.deliveryArea}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, deliveryArea: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inside-dhaka">Inside Dhaka</SelectItem>
                        <SelectItem value="outside-dhaka">Outside Dhaka</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PAYMENT METHOD */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: value }))
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg border-primary  hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </Label>
                    <Badge variant="secondary">Most Popular</Badge>
                  </div>
                </RadioGroup>
                  {/* Trust badges */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Badge variant="secondary" className="flex items-center gap-2 py-2">
            <Shield className="h-4 w-4" />
            Secure Payment
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 py-2">
            <Package className="h-4 w-4" />
            Free Returns
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 py-2">
            <Clock className="h-4 w-4" />
            24/7 Support
          </Badge>
        </div>

                <Alert className="mt-4 bg-blue-50 border-blue-200">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    Your payment information is secure. We never store your payment details.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* ORDER NOTES */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="text-xl">Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Any special instructions for delivery?"
                  className="border-gray-200"
                />
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-2xl">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 pt-6">
                {/* Order Items */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {state.cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          className="w-16 h-16 object-cover rounded-lg border"
                          alt={item.name}
                        />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <a
                          href={`/products/${item.id}`}
                          className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.name}
                        </a>
                        <p className="text-gray-500 text-xs mt-1">
                          ৳{Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      <div className="font-semibold text-primary">
                        ৳{Number(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span>
                      {deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}
                      <span className="text-xs text-gray-500 ml-1">
                        ({formData.deliveryArea === "inside-dhaka" ? "Inside" : "Outside"} Dhaka)
                      </span>
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total Amount</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">৳{total.toFixed(2)}</span>
                    <p className="text-xs text-gray-500">Including all taxes</p>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-orange-400 to-orange-500 font-semibold  hover:from-orange-400 hover:to-orange-600 duration-300 transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 bg-gradient-to-r from-orange-400 to-orange-500 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Place Order • ৳${total.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By placing your order, you agree to our 
                  <a href="/terms" className="text-primary hover:underline mx-1">Terms</a>
                  and
                  <a href="/privacy" className="text-primary hover:underline mx-1">Privacy Policy</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;