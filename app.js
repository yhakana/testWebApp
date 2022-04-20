/******* import NPMs *******/
const express = require('express');
const path = require('path');                                // path: 處理專案中的檔案路徑
const createError = require('http-errors');                  // http-errors: 命名為createError變數，用來生成Http-error message
const logger = require('morgan');                            // morgan: 命名為logger變數，用來記錄HTTP相關的請求訊息，ex. GET / 200 10.32 ms -170 <<< console message
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');               // cookie-parser: 用來處理分析網頁暫存資料cookie

/******* generate an express app *******/
const app = express();                                       // 引入的express是一個function，每執行此函式就可創建一個app

/******* port setup & port listener *******/
// const port = normalizePort(process.env.PORT || '3003');   // (1) 用normalizePort()設置port number，OR
const port = process.env.PORT || '3003';                     // (2) 藉由dotenv等套件，由外部env檔案引入port時，就可不用normalisePort()
app.listen(port, ()=>{                                       // port listener
  console.log(`The app listening at http://localhost:${port}`)
})

/******* connecting of database setup *******/
mongoose.connect('mongodb://localhost/forTest', {            // 透過mongoose連接資料庫forTest
  useNewUrlParser: true                                      // mongoose自v4.0.0以上會自動跳出不建議connect()使用預設的URL parser
});

/******* get connection of database and listener *******/
const db = mongoose.connection;                              // 透過mongoose取得資料庫連線物件
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("Database Connected successfully."); });

/******* view engine setup *******/
app.set('views', path.join(__dirname, './frontend/views'));
app.set('view engine', 'jade');                              // 預設樣板引擎為jade

/******* import routers *******/
const indexRouter = require('./backend/routes/index');
const usersRouter = require('./backend/routes/users');
const calcRouter = require('./backend/routes/calcRouter.js');
const todoRouter = require('./backend/routes/todolistRouter.js');
const uploadRouter = require('./backend/routes/uploadRouter.js');

/******* middlewares setup *******/
/*====== app.use(): 在指定的路徑上安裝指定的middleware。主要用來設置middleware至app中 ======*/
app.use(logger('dev'));                                     // 將logger加入app中，dev字串表示由morgan定義的紀錄格式

/*====== 沒加上下兩行，req.body回傳的資料若帶有JSON或urlencoded格式的資料會顯示undefined ======*/
app.use(express.json());                                    // 解析POST請求body中 json格式的資料
app.use(express.urlencoded({ extended: false }));           //                   urlencoded格式的資料

// app.use(express.static(path.join(__dirname, 'public'))); // 使靜態目錄./public可以透過網頁被拜訪
// app.use(express.static(path.join(__dirname, 'views')));  // 使靜態目錄./public可以透過網頁被拜訪
app.use('/static', express.static('./frontend/public'));
app.use('/upload', express.static(__dirname));
app.use(cookieParser());                                    // 將cookieParser加進app

/******* routers setup *******/
/******* app.use('path', callback) *******/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/my', calcRouter);
app.use('/todolist', todoRouter);
app.use('/upload', uploadRouter);

/******* catch 404 and forward to error handler *******/
app.use( (req, res, next)=>{next(createError(404))} )

/******* error handler *******/
app.use( (err, req, res, next)=>{
  res.locals.message = err.message;                               // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);                                  // render the error page
  res.render('error');
} )


/******* local module requiring test *******/
// let myModule1 = require('./backend/test_modules/myModule1.js');       // 引入自建模組(需有路徑與副檔名)
// let myModule2 = require('./backend/test_modules/myModule2.js');
// let myModule3 = require('./backend/test_modules/myModule3.js');
// let myModule4 = require('./backend/test_modules/myModule4.js');
// let myModule5 = require('./backend/test_modules/myModule5.js');
// let myModule6 = require('./backend/test_modules/myModule6.js');

/******* use local modules *******/
// myModule1.info('Local module 1 is imported successfully.');   //    引入模組為物件，使用模組的方法

// console.log(myModule2.hello);                                 // 屬性匯出給exports，使用exports的屬性

// let msg = 'This is local module 3\'s message.';
// myModule3.myFunction(msg);                                    // 方法匯出給exports，使用exports的方法

// console.log('name: ' + myModule4.name);                       // 物件匯出給exports，使用exports物件的屬性與方法
// console.log('birthday: ' + myModule4.birthday);
// let blah = `Hi, I'm ${myModule4.name}, I was born in ${myModule4.birthday}`;
// myModule4.saySomething(blah);

// myModule5('我沒梗ㄌ好痛苦');                                   // 匿名函式匯出給exports，引入後直接是個函式

// let myMember = new myModule6('abc123', 'P@ssw0rd');           // 類別匯出給exports，引入後新建物件
// console.log(myMember.infomation());

module.exports = app;                                            // 將app匯出成local module，讓其他程式得以引入
