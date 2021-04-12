const express = require('express');
const router = express.Router();
const Subscriber  = require('../models/subscribers') 

module.exports = router


// getting all
router.get('/', async(req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
});

// getting one
router.get('/:id', getSubscribers,(req,res)=>{
    res.send(res.subscriber.name)

});

// creating one
router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)

    }catch(err){
        res.status(400).json({
            message: err.message
        })

    }


});

// updating one
router.patch('/:id', getSubscribers, async (req,res)=>{
    if(req.body.name !=null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel !=null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const update = await res.subscriber.save()
        res.json(update)
    }catch(err){
        res.status(400).json({
            message: err.message
        })


    }
});


// deleting one
router.delete('/:id', getSubscribers, async (req,res)=>{
    try{
        await res.subscriber.remove()
        res.json({
            message: 'DELETED SUBSCRIBER'
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
        
    }

})

async function getSubscribers(req, res, next){
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({
                message: 'Cannot find subscriber'
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })

    }
    res.subscriber = subscriber
    next()
}

module.exports = router
