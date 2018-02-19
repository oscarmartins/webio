
const express = require('express')
// Create express router
const router = express.Router()
const api = require('./apiroles')
const axios = require('axios')
// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', async (req, res) => {
    const messageError = {status:401, message: 'Bad credentials', error: 'Bad credentials'}
    const parameters = api.login({email: req.body.username, password: req.body.password})
    try {
        const { data } = await axios.post('http://localhost:8081/services', parameters)
        req.session.authUser = data.profile
        return res.json(data)
    } catch (error) {
        if (error.response) {
            if (error.response.status === 500 || 
                error.response.status === 403 || 
                error.response.status === 400 && 
                error.response.data) {
                    messageError.status = error.response.status
                    messageError.error = error.response.data.error
            }        
          }
    }    
    console.log(messageError)
    res.status(messageError.status).json(messageError)
    
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}