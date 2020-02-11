const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port= process.env.PORT || 3000;

let app = express();


hbs.registerPartials(__dirname +'/views/partials');
// express middleware to configure how express app works.
// in this case, i want to sbe able to reach the public folder and accesss routes in it.
app.set('view engine', 'hbs');


hbs.registerHelper('year', ()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text)=>text.toUpperCase())

app.use((req,res, next)=>{
    let now= new Date().toString();
    let log = `${now}:${req.method} ---${req.url}`;
    
    console.log(log)
    fs.appendFile('server.log', `${log} \n`, (err) => {
        if (err) throw err;});
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         message: "we'll be right Back"
//     });
// })

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
    } );
})


app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res)=>{
    res.send(`<h3>error: bad gateway!!</h3>`);
})

app.listen(port, ()=>{
    console.log(`server is up on port ${port}`)
});