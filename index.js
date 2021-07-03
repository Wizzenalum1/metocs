const express = require('express');
//  this is the ejs layout library help to make layouts
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();
const port = 8000;

const db = require('./config/mongoose');


// at starts meddle ware to see whcih request is called for.
app.use(function(req,res,next){
    console.log(" **************method : ",req.method," request to :",req.url,);
    next();
  })
  

app.use(express.static(path.join(__dirname,'assets')));  // setup the 
app.use(express.urlencoded({extended:true}))  

// before all routes this middleware should be called to use layout feature
app.use(expressLayout);

// setting these to layout so that script and style file can move to head and bottom in layout.
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);


// use the router 
app.use('/',require('./routes'));


// starting express server at some port
app.listen(port,function(err){
    if(err) console.log(`server is not running: ${err}`);// here i am using the interpolation to show the data
    console.log(`server is running on ${port}`);
})

app.set('view engine','ejs');
app.set('views','./views');

