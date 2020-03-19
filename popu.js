const User = require('./models/User')

const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1:27017/blog';
mongoose.connect(mongoDB,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.Promise    = global.Promise;

const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

function createUser (name,password,cb){
     const user = new User({
         name:name,
         password:password
     })

     user.save(function(err){
         if(err){console.log(err);return}
         console.log('success')
         cb(null,user)
     })
}

function close(){
    db.close()
}

createUser('wangkaixing','wkhdddddd',close)

