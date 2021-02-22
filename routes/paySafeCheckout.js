const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config');
const User = require('../models/user');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': config.ps_key
}

router.post('/createCutomer', function (req, res) { 
    let body ={
        "merchantCustomerId": req.body.ref,
        "email": req.body.email,
    }
   
    User.findOne({ email: req.body.email }).then(user => {
        if (!user){
            axios.post('https://api.test.paysafe.com/paymenthub/v1/customers', body, {
                headers: headers
            })
                .then(response => {
                    const newUser = new User({
                        email: response.data.email,
                        customerId: response.data.id,
                    });
                    newUser.save().then(data => {
                        res.status(200).json(newUser);
                    });
                }).catch(err => {
                    res.status(400).json(err.message);
                });
        }
        else{
            res.status(200).json(user);
        }
    })   
})

router.get('/getCustomer', function (req, res) {
    User.findOne({ email: req.query.email }).then(user => {
        if (user){
            res.status(200).json(user);
        }
        else {
            res.status(200).json({msg:'user does not exist'});
        }
})
})

router.get('/createSingleUseCustomerTokem', function (req, res) {
    axios.post('https://api.test.paysafe.com/paymenthub/v1/customers/'+req.query.id+'/singleusecustomertokens',{} ,{
                headers: headers
            }).then(response => {
                    res.status(200).json(response.data);
            }).catch(err => {
                res.status(400).json(err.message);
            });
})

router.post('/processPayment', function (req, res) { 
    let body ={
        "merchantRefNum": req.body.merchantRefNum,
        "paymentHandleToken": req.body.paymentHandleToken,
        "amount": req.body.amount,
        "currencyCode": "USD",
    }
    axios.post('https://api.test.paysafe.com/paymenthub/v1/payments', body, {
        headers: headers
    })
        .then(response => {
            res.status(200).json(response.data);
        }).catch(err => {
            res.status(400).json(err.message);
        });
})        

module.exports = router;