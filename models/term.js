var db = require('../db/config');
var term = {};

term.getAll = function (req, res, next){
    db.manyOrNone("SELECT * FROM terms;")
    .then(function(result){
        res.locals.term = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

term.find = function (req, res, next){
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM terms WHERE id = $1;", [id])
    .then(function(result){
        res.locals.term = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

term.create = function (req, res, next){
    db.one(`INSERT INTO terms(name, defintion) VALUES($1, $2) RETURNING id;`,
    [req.body.name, req.body.defintion])
    .then(function(result){
        res.locals.term_id = result.id;
        next();
    }).catch(function(error){
        console.log(error);
        next();
    })
}
module.exports = term;
