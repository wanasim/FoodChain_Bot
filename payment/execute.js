// { intent: 'sale',
//   payer: { payment_method: 'paypal' },
//   redirect_urls:
//    { return_url: 'http://localhost:8000/success',
//      cancel_url: 'http://localhost:8000/cancel' },
//   transactions: [{
//     item_list: {
//        items: [{
//         name: 'Red Sox Hat',
//         sku: '001',
//         price: '25.00',
//         currency: 'USD',
//         quantity: 1
//       }]
//      },
//        amount: {
//          currency: 'USD',
//          total: '25'
//       },
//        description: 'Grub for the Hub'
//      }]
//   }
//
//   {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://localhost:3000/success",
//         "cancel_url": "http://localhost:3000/cancel"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "Red Sox Hat",
//                 "sku": "001",
//                 "price": "25.00",
//                 "currency": "USD",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": "25.00"
//         },
//         "description": "Hat for the best team ever"
//     }]
// };




const request = require('request');

var options = {
    method: 'GET',
    url: 'https://api.sandbox.paypal.com/v1/payments/payment/PAY-9W441850F35150900LJ444DI',
    headers: {
      authorization: 'Basic QWVaM3FlTXU3WXBfUi1CRUZ1Y19melZ1UEpDQmtUcmQzRUQyUUdicXdUa21xcWpZM2FGbFJXYWUyamZyZmpBR24tdUN2b3owTThaT00wdnI6RUc4WUtmaDhONFNsUkdyZzFSYjB4eWdWek5CM2Z3NEdxQTI2UW5GeEMyRWlTdEkxenlaekxoa3VjX2ZNSlI2WVhrQm9yamY3ZUstX1FocmQ=',
    }
  };

  var bob = true

  while(bob){
      request(options, function (error, response2, body) {
          if (error) throw new Error(error);

          logger.info(util.inspect("BODY " + body, {showHidden: false, depth: null}))
          var payment_state = JSON.parse(body)
          if(payment_state.state === 'approved'){
              logger.info(util.inspect("CLEARING INTERVAL ", {showHidden: false, depth: null}))
              // conversation.reply({ text: "Transaction Completed"});
              //conversation.transition()
              //logger.info(util.inspect("RESPONDING WITH TEXT ", {showHidden: false, depth: null}))
              console.log('breaking')
              bob = false;

          }
          console.log("looping")


        });
  }
