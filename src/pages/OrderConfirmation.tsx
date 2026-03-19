import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Generate random order number for demo
  const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <Card className="max-w-2xl w-full shadow-2xl rounded-3xl border-0 relative z-10 overflow-hidden">
        {/* Orange gradient header */}
        <div className="h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500"></div>
        
        <CardContent className="p-8 md:p-10">
          {/* Success animation */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-orange-100 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 rounded-full p-4 shadow-lg">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Order Confirmed! 🎉
            </h1>
            
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Thank you for shopping with us! Your order has been successfully placed.
            </p>

            {/* Order number */}
            <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
              <Package className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">Order #{orderNumber}</span>
            </div>
          </div>

          {/* Delivery info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl text-center border border-orange-100">
              <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-800">Confirmation</p>
              <p className="text-sm text-orange-600">Within 30 mins</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl text-center border border-orange-100">
              <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-5 w-5 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-800">Delivery</p>
              <p className="text-sm text-orange-600">2-5 business days</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl text-center border border-orange-100">
              <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="h-5 w-5 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-800">Payment</p>
              <p className="text-sm text-orange-600">Cash on Delivery</p>
            </div>
          </div>

          {/* Order summary preview */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-500" />
              Order Summary
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳2,450.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">৳70.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-orange-600">৳2,520.00</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/')}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-6"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/orders')}
              className="flex-1 border-2 border-orange-200 hover:border-orange-300 text-orange-700 hover:text-orange-800 hover:bg-orange-50 py-6"
            >
              View Orders
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Support info */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Need help? Contact our support at{' '}
            <a href="tel:+8801850273117" className="text-orange-500 hover:underline font-medium">
              +880 1850273117
            </a>
          </p>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;