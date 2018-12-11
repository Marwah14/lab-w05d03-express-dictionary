var express = require('express');
var router = express.Router();

var term = require('../models/term');

router.get('/', term.getAll, renderIndex);
router.get('/:id', term.find, renderShow);
router.post('/', term.create, redirectShow);


function renderIndex(req, res){
    mustacheVariables = {
        term: res.locals.term
    }
    console.log(mustacheVariables)
    res.render('./terms/index', mustacheVariables);
}

function renderShow(req, res){
    mustacheVariables = res.locals.term;
    res.render('./terms/show', mustacheVariables);
}


function redirectShow(req, res){
    console.log(req.body);
    res.redirect(`/terms/${res.locals.term_id}`);
}
module.exports = router;