{ intent: 'sale',
  payer: { payment_method: 'paypal' },
  redirect_urls:
   { return_url: 'http://localhost:8000/success',
     cancel_url: 'http://localhost:8000/cancel' },
  transactions: [{
    item_list: {
       items: [{
        name: 'Red Sox Hat',
        sku: '001',
        price: '25.00',
        currency: 'USD',
        quantity: 1
      }]
     },
       amount: {
         currency: 'USD',
         total: '25'
      },
       description: 'Grub for the Hub'
     }]
  }

  {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};
