const express = require('express');
const bodyPaser = require('body-parser');
const app = express()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/hero')
.then(() => console.log('Mongoose UP'));


const userDB = require('./schemas/users');
const stadiumDB = require('./schemas/stadiums');
const agendaDB = require('./schemas/agenda');
const awardsDB = require('./schemas/awards');
const usersAwardsDB = require('./schemas/usersAwards');

app.use(bodyPaser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/login', (req, res, next) => {
    const {email, password} = req.body;
    userDB.findOne({email, password}).then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('USER_INVALID');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.post('/api/new/user', (req, res) => {
    const {user} = req.body;
    userDB.find({email:user.email}).count().then(resp => {
        if(resp > 0) {
            return res.json('ERROR_EXIST');
        } else {
            let newUser = new userDB({
                email: user.email,
                password: '123456',
                username: user.username,
                phone: user.phone,
                city: user.city,
                profile: user.profile,
                created_at: user.created_at
            });
            newUser.save().then(item => {
                console.log('item guardado', item); 
            });
            return res.json('USER_SAVED');
        }
    });
});

app.post('/api/edit/user', (req, res) => {
    const {user} = req.body;
    userDB.updateOne({_id:user._id}, user).then(resp => {
        if(resp) {
            console.log('item editado', resp); 
            return res.json('USER_UPDATED');
        } else {
            return res.json('USER_NOT_FOUND');
        }
    }).catch(err => {
        console.log(err);
        return res.json('ERROR_CONNECTION');
    });
});

app.post('/api/new/stadium', (req, res) => {
    const {stadium} = req.body;
    stadiumDB.find({name:stadium.name, city:stadium.city}).count().then(resp => {
        if(resp > 0) {
            return res.json('ERROR_EXIST');
        } else {
            let newStadium = new stadiumDB({
                name: stadium.name,
                city: stadium.city,
                sport: stadium.sport,
                created_at: stadium.created_at
            });
            newStadium.save().then(item => {
                console.log('item guardado', item); 
            });
            return res.json('STADIUM_SAVED');
        }
    });
});

app.post('/api/new/agenda', (req, res) => {
    const {agenda} = req.body;
    agendaDB.find({hour:agendaDB.hour}).count().then(resp => {
        if(resp > 0) {
            return res.json('ERROR_EXIST');
        } else {
            let newAgenda = new agendaDB({
                user: agenda.user,
                stadium: agenda.stadium,
                day: agenda.day,
                hour: agenda.hour,
                status: agenda.status,
                price: parseFloat(agenda.price),
                created_at: agenda.created_at
            });
            newAgenda.save().then(item => {
                console.log('item guardado', item); 
            });
            return res.json('AGENDA_SAVED');
        }
    });
});

app.post('/api/new/award', (req, res) => {
    const {award} = req.body;
    let newAward = new awardsDB({
        name: award.name,
        description: award.description,
        created_at: award.created_at
    });
    newAward.save().then(item => {
        console.log('item guardado', item); 
    });
    return res.json('AWARD_SAVED');
});

app.post('/api/award/asigned', (req, res) => {
    let award = req.body.award;
    let created_at = req.body.created_at;
    userDB.find({_id:req.body.user}).then(resp => {
        if (resp.length > 0) {
            let user = resp[0];
            let usersAwards = new usersAwardsDB({
                user: user,
                award: award,
                created_at
            });
            usersAwards.save().then(item => {
                console.log('item guardado', item); 
            }).catch(err => {
                return res.json('ERROR_CONNECTION');    
            });
            return res.json('USER_AWARD_SAVED');
        } else {
            return res.json('USER_NOT_FOUND');
        }
    }).catch(err => {
        return res.json('ERROR_CONNECTION');    
    })
});

app.post('/api/update/agenda', (req, res) => {
    const status = req.body;
    console.log(status);
    agendaDB.findOneAndUpdate({_id:status.agenda}, {status:status.status}).then(resp => {
        return res.json('AGENDA_UPDATED');
    });
});

app.post('/api/agenda/price', (req, res) => {
    const {agenda} = req.body;
    agendaDB.updateOne({_id:agenda._id}, agenda).then(resp => {
        if(resp) {
            console.log('item editado', resp); 
            return res.json('AGENDA_UPDATED');
        } else {
            return res.json('AGENDA_NOT_FOUND');
        }
    }).catch(err => {
        console.log(err);
        return res.json('ERROR_CONNECTION');
    });
});

app.get('/api/users', (req, res) => {
    userDB.find().then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('ERROR_CONNECTION');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.get('/api/users-awards', (req, res) => {
    usersAwardsDB.find().then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('ERROR_CONNECTION');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.get('/api/stadiums', (req, res) => {
    stadiumDB.find().then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('ERROR_CONNECTION');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.get('/api/agenda', (req, res) => {
    var limit = null;
    if (req.query.limit === 'null') {
        limit = null;    
    } else {
        limit = req.query.limit;
        limit = +limit;
    } 
    agendaDB.find().sort({day: 'desc'}).limit(limit).then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('ERROR_CONNECTION');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.get('/api/awards', (req, res) => {
    awardsDB.find().then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('ERROR_CONNECTION');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.post('/api/agenda/day', (req, res) => {
    const {day} = req.body;
    const {stadium} = req.body;

    agendaDB.aggregate([
        {$match: {
            day: day, 
            "stadium._id": ObjectId(stadium)
        }},
        {$group: {"_id": "$hour"}},
        {$project : { "hour": "$_id", _id: 0}},
    ]).then((result) => {
        return res.json(result);
    });
});

app.get('/api/historical', (req, res) => {
    var filter = null;
    if (req.query.filter === 'null') {
        filter = null;    
    } else {
        filter = req.query.filter;
        if (filter === 'bySport') {
            filter = '$sport';
        }
    } 
    agendaDB.aggregate([
        {$match: {$or: [{status: 'confirmed'}, {status: 'finished'}] }},
        {$group: {"_id": "$user.username", "userInfo": {$push: "$user"}, "price": {$sum: "$price"}, count: { $sum: 1 }}},
        {$project : { "user.username": "$_id", _id: 0, "userInfo": 1, "price": 1, "count" : 1}},
        {$sort: {count: -1}}
    ]).then((result) => {
        return res.json(result);
    });
});

app.get('/api/historical/bySport', (req, res) => {
    let filter = req.query.value;
    agendaDB.aggregate([
        {
            $match: {
                "stadium.sport": filter,
                $or: [{status: 'confirmed'}, {status: 'finished'}],
            },
        },
        {$group: {"_id": "$user.username", "userInfo": {$push: "$user"}, "price": {$sum: "$price"}, count: { $sum: 1 }}},
        {$project : { "user.username": "$_id", _id: 0, "userInfo": 1, "price": 1, "count" : 1}},
        {$sort: {count: -1}}
    ]).then((result) => {
        return res.json(result);
    });
});

app.get('/api/historical/byCity', (req, res) => {
    let filter = req.query.value;
    agendaDB.aggregate([
        {
            $match: {
                "stadium.city": filter,
                $or: [{status: 'confirmed'}, {status: 'finished'}],
            },
        },
        {$group: {"_id": "$user.username", "userInfo": {$push: "$user"}, "price": {$sum: "$price"}, count: { $sum: 1 }}},
        {$project : { "user.username": "$_id", _id: 0, "userInfo": 1, "price": 1, "count" : 1}},
        {$sort: {count: -1}}
    ]).then((result) => {
        return res.json(result);
    });
});

app.get('/api/historical/byDate', (req, res) => {
    let from = req.query.from;
    let to = req.query.to;
    agendaDB.aggregate([
        {
            $match: {
                "day": {$gte: from, $lt: to},
                $or: [{status: 'confirmed'}, {status: 'finished'}],
            },
        },
        {$group: {"_id": "$user.username", "userInfo": {$push: "$user"}, "price": {$sum: "$price"}, count: { $sum: 1 }}},
        {$project : { "user.username": "$_id", _id: 0, "userInfo": 1, "price": 1, "count" : 1}},
        {$sort: {count: -1}}
    ]).then((result) => {
        return res.json(result);
    });
});

app.get('/api/stadiums/sports', (req, res) => {
    stadiumDB.aggregate([
        {$group: {"_id": "$sport"}},
        {$project : { "sport": "$_id", _id: 0}},
    ]).then((result) => {
        return res.json(result);
    });
});

app.get('/api/stadiums/cities', (req, res) => {
    stadiumDB.aggregate([
        {$group: {"_id": "$city"}},
        {$project : { "city": "$_id", _id: 0}},
    ]).then((result) => {
        return res.json(result);
    });
});

app.post('/api/searchUsers', (req, res) => {
    const {user} = req.body;
    userDB.find({username: { $regex : new RegExp(user, "i") } }).then((resp) => {
        if (resp) {
            return res.json(resp);
        } else {
            return res.json('NOT_SRESULT');
        }
    },
    err => {
        return res.json('ERROR_CONNECTION');
    })
});

app.listen(8253, () => console.log('Express listening at 8253'));