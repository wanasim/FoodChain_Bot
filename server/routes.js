const paypalController = require('./controller.js');

console.log('reached routes');

module.exports = function(app){
   app.post('/pay', function(req,res){
      paypalController.pay(req,res);
   });
   app.get('/success', function(req,res){
     paypalController.success(req,res)
   });
   app.get('/cancel', function(req,res){
     paypalController.canceled(req,res)
   });
   app.get('/test', function(req,res){
     paypalController.test(req,res)
   });
   app.get('/success2', function(req,res){
     paypalController.success2(req,res)
   })
   app.get('/index', function(req, res){
      paypalController.index(req,res);
   });
   app.get('/', function(req,res){
     paypalController.base(req,res)
   });
   app.get('*', function(req,res){
      paypalController.reroute(req,res);
   });
}
