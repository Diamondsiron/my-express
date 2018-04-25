var express = require('express');
var router = express.Router();
var fs = require('fs')
var cheerio = require('cheerio');//node的jquery
var superagent = require('superagent');//ajax请求工具
var socket_io = require('socket.io')



/* GET home page. */
router.get('/', function(req, res, next) {

 
  //res.render('index', { title: 'Express' });
  res.sendfile('./views/index.html'); 
});
router.get('/a', function(req, res, next) {

 
    //res.render('index', { title: 'Express' });
    res.sendfile('./views/index.html'); 
  });
  router.get('/chat', function(req, res, next) {

 
    //res.render('index', { title: 'Express' });
    res.sendfile('./views/chat.html'); 
  });

router.get('/getUserInfo', function(req, res, next){
  console.log('get用户请求数据为：')
  console.log(req.query);

   res.json({
      meta:{
           code:200
       },
       data:{
           message:'蛤蟆皮'
       }
   });
});

router.post('/upload',function(req,res,next){
    console.log(req.files);
    fs.createWriteStream('public/out.txt')
    res.sendfile('./views/error.html');
})


router.get('/webSpider', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
      .end(function (err, sres) {
        if (err) {
          return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
          var $element = $(element);
          items.push({
            title: $element.attr('title'),
            href: $element.attr('href')
          });
        });
  
        res.send(items);
      });
  });

  router.prepareSocketIO = function(server){
  var io = socket_io.listen(server);
  io.sockets.on('connection',function(socket){
    console.log('connection');  
  
    // 发送给客户端在线人数  
    io.emit('connected',1);  
  
      
  })
}


module.exports = router;