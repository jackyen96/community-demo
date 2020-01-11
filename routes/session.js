let express = require('express')
let User = require('../ models/user')
let md5 = require('blueimp-md5')

let router = express.Router()

router.get('/',function(req,res){
  res.render('index.html')
})

router.get('/login',function(req,res){
  res.render('login.html')
})

router.post('./login',function(req,res){

})

router.get('/register',function(req,res){
  res.render('register.html')
})

router.post('/register',function(req,res){
  console.log('post')
  let body = req.body
  User.findOne({
    $or: [
      {email: body.email},{nickname: body.nickname}
    ]
  },function(err,data){
    if(err){
      return res.status(500).json({
        message: 'server error',
        error_code: 500
      })
    }
    if(data){
      //邮箱或昵称已经存在
      return res.status(200).json({
        error_code: 1,
        message: 'email or nickname aleady exist'
      })
    }
    body.password = md5(body.password)
    new User(body).save(function(err,user){
      if(err){
        return res.status(500).json({
          error_code: 500,
          message: 'internal error'
        })
      }
    })
    res.status(200).json({
      error_code: 0,
      message: 'ok'
    })
  })
})

module.exports = router