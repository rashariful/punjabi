import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold">Order Confirmed 🎉</h1>

          <p className="text-gray-600">
            Thank you for your purchase! Your order has been successfully placed.
          </p>

          <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-700">
            <p>📦 We will contact you shortly for confirmation.</p>
            <p>🚚 Delivery within 2-5 days.</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/orders')}
              className="w-full"
            >
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;