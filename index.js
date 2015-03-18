///libreria express
var app = require('express')();
var http = require('http').Server(app);

//libreria socket.io
var io = require('socket.io')(http);

//libreria onoff
var Gpio=require('onoff').Gpio,
        led1= new Gpio(17,'out'); //conficuramos pin17 como salida 1
        led2= new Gpio(18,'out'); //conficuramos pin18 como salida 2
        led3= new Gpio(22,'out'); //conficuramos pin27 como salida 3
        led4= new Gpio(23,'out'); //conficuramos pin22 como salida 4
var estado=[0,0,0,0];
app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('operacion', function(led,value){

    if(value==1){
        console.log('enciende led: ' + led);
    }else{
        console.log('apaga led: ' + led);
    }
    estado[led-1]=value;

        led1.write(estado[0]);
        led2.write(estado[1]);
        led3.write(estado[2]);
        led4.write(estado[3]);
 });



http.listen(3000, function(){
  console.log('Escuchando en puerto *:3000');
});