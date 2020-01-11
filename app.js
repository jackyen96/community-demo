let express = require('express')
let path = require('path')
let artTemplate = require('express-art-template')
let sessionRouter = require('./routes/session.js')
let bodyParser = require('body-parser')

let app = express()

app.use('/public', express.static('./public'))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

app.use(bodyParser.urlencoded({ extened: false }))
app.use(bodyParser.json())

app.engine('html', artTemplate)
app.set('views',path.join(__dirname,'./views/')) //默认就是views目录

app.use(sessionRouter)

app.listen(3000, function(){
  console.log('running')
})