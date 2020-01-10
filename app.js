let express = require('express')
let fs = require('fs')
let path = require('path')
let artTemplate = require('express-art-template')

let app = express()

app.use('/public', express.static('./public'))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

app.engine('html', artTemplate)
app.set('views',path.join(__dirname,'./views/')) //默认就是views目录

app.get('/', function (req, res) {
  console.log('get')
  res.render('index.html')
})

app.listen(3000, function(){
  console.log('running')
})