const paypal = require('paypal-rest-sdk');
const request = require('request');
const express = require('express');
const app = express();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeZ3qeMu7Yp_R-BEFuc_fzVuPJCBkTrd3ED2QGbqwTkmqqjY3aFlRWae2jfrfjAGn-uCvoz0M8ZOM0vr',
    'client_secret': 'EG8YKfh8N4SlRGrg1Rb0xygVzNB3fw4GqA26QnFxC2EiStI1zyZzLhkuc_fMJR6YXkBorjf7eK-_Qhrd',
});


module.exports = {
   pay: function(req,res){
     const item_price = req.body.price ? (typeof req.body.price === 'number' ? req.body.price : req.body.price.toString()) : "7.44"
     const items_array = req.body.items ? req.body.items : {"list":[{"name": "Red Sox Hat", "sku": "001", "price": "7.44","currency": "USD", "quantity": 1}]}
     // console.log("items_array", items_array)
     // console.log("req.body", req.body)

     var total_price = 0
     const items_list = []

     // dynamic list array
     for (var item of items_array.list){
       // console.log("IN FOR LOOP", item.name)
       items_list.push({
         "name": item.name,
         "sku": item.sku ? item.sku : "001",
         "price": item.price ? (typeof item.price === 'number' ? item.price : item.price.toString()) : "7.44",
         "currency": item.currency ? item.currency : "USD",
         "quantity": item.quantity ? item.quantity : 1
       })
       total_price += item.price ? (typeof item.price === 'string' ? parseFloat(item.price) : item.price) : 7.44
     }
     // console.log("END FOR LOOP")
     // console.log("total_price",total_price )

     const create_payment_json = {
       "intent": "sale",
       "payer": {
           "payment_method": "paypal"
       },
       "redirect_urls": {
           "return_url": "https://paypalmicroservice.herokuapp.com/success",
           "cancel_url": "https://paypalmicroservice.herokuapp.com/cancel"
       },
       "transactions": [{
           "item_list": {
               "items": items_list
           },
           "amount": {
               "currency": "USD",
               "total": total_price.toString()
           },
           "description": "Grub for the Hub"
       }]
     };
     // console.log("create_payment_json",create_payment_json )
     // console.log("amount", create_payment_json.transactions[0].amount)
     // console.log("ITEMS LIST", items_list)

     let final_url = ""
     paypal.payment.create(create_payment_json, function (error, payment) {
       if (error) {
           throw error;
       } else {
         var links = {
           self: payment.links[0].href,
           redirect: payment.links[1].href
         }
         res.send(links)
         // res.redirect(links.redirect)
       }
     });
     //console.log("final_url", final_url)



   },


   success: function(req,res){
     const payerId = req.query.PayerID;
     const paymentId = req.query.paymentId;

     const execute_payment_json = {
       "payer_id": payerId,
       "transactions": [{
           "amount": {
               "currency": "USD",
               "total": "7.44"
           }
       }]
     };

     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
       if (error) {
           console.log(error.response);
           throw error;
       } else {
           console.log("APPROVED", payment);




           res.sendFile(__dirname + '/index.html')
       }
     });
   },

   success2: function(req,res){
      console.log("REACHED SUCCESS2 ROUTE!!")
      // res.render('doj')
      res.sendFile('../views/doj.html')
   },


   index: function(req,res){
      res.render('index')
   },

   canceled: function(req,res){
     res.send('Canceled')
   },

   base: function(req,res){
     res.send('Please go to the /pay route to make a transaction')
   },
   test: function(req,res){
       var list=[]
       console.log("IN test!!!!!!!!!!!!!!!!!!!!!!!!")
      list.push({
        "name": "McDonalds",
        "sku": "001",
        "price": "7.44",
        "currency":"USD",
        "quantity":1
      })

      const items = {"list": list}
      console.log(items)

      // const url = "https://paypalmicroservice-gse00013232.apaas.us6.oraclecloud.com/pay"
      const url = 'https://paypalmicroservice.herokuapp.com/pay'
      var done1 = false;
      var url2 = "";


        var requested = request({
          url: url,
          method: "POST",
          timeout: 15000000,
          json: true,   // <--Very important!!!
          body: items
        }, function (error, response, body){
          console.log(response.body);
          url2=response.body;
          done1 = true;
        });
        console.log("AFTER")
        require('deasync').loopWhile(function(){return !done1;});
        console.log("url2", typeof url2)



   },

   reroute: function(req,res){
      res.redirect('/')
   }
}
