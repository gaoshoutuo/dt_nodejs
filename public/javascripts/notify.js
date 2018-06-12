var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var mysql  = require('mysql');
var connection = mysql.createConnection({

    host     : '127.0.0.1',

    user     : 'root',

    password : 'DTsj123456,',

    port: '3306',

    database: 'dtsjwb',

});
// create
connection.connect();
function createtable(){


    var addVip = 'insert into testtable(age,name) values(?,?)';
    var param = ['10','10'];
    connection.query(addVip, param, function(error, result){
        if(error)
        {
            console.log(error.message);
        }else{
            console.log('insert id: '+result.insertId);
        }
    });



}
//delete
function deleteTable(){


    var addVip = 'delete from testtable where age = "10"';
    connection.query(addVip, function(error, result){
        if(error)
        {
            console.log(error.message);
        }else{
            console.log('affectedRows: '+result.affectedRows);
        }
    });


}

//update
function updateTable(){

    var userSql = "update testtable set age = ?"+" where name = "+"?";
    var param = [100, 10];
    connection.query(userSql, param, function (error, result) {
        if(error)
        {
            console.log(error.message);
        }else{
            console.log('affectedRows: '+result.affectedRows);
        }
    });

}


//query
function quertTable(){

    connection.query('use '+DATABASE);
    connection.query('select * from '+TABLE, function(error, results, fields){
        if (error) {
            throw error;
        }
        if (results) {
            for(var i = 0; i < results.length; i++)
            {
                console.log('%s\t%s',results[i].name,results[i].end_time);
            }
        }
    });
}


function endmysql(){
    connection.connect();
}


app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});
io.on('connection', function(socket){
    socket.emit('request', "aaaaaaaaa"); // emit an event to the socket
    io.emit('broadcast', "asdf"); // emit an event to all connected sockets
    socket.on('tweet', function(tweet){
        io.emit('tweet', tweet);
    });
    socket.on("foo",function (data) {
        console.log(data);
        //createtable()
        //updateTable()
//神秘的两次牵手
    })
    socket.on("sendMsg",function (md) {
        console.log(md)
        // socket.emit("msg",md)
        //socket.broadcast.emit("msg",md)
        io.sockets.emit("msg",md)

    })

    socket.on("sendMsg",function (md) {
        console.log(md)
        // socket.emit("msg",md)
        //socket.broadcast.emit("msg",md)
        io.sockets.emit("msg",md)

    })

    socket.on("notify_server",function (md) {
        console.log(md)
        // socket.emit("msg",md)
        //socket.broadcast.emit("msg",md)
        io.sockets.emit("notify_k",md)

    })
    socket.emit("doutinghao","now i supply a notification,that do you get a good new in android")

});

server.listen(3222,function () {
    //192.168.1.102:3222
    console.log("server start success!");
});

