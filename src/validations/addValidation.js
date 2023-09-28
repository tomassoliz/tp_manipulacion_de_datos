const { check } = require('express-validator');

module.exports = [
    check("title")
        .notEmpty()
        .withMessage("Deberá colocar el titulo de la pelicula"),
    check("rating")
        .notEmpty()
        .withMessage("Deberá colocar un numero de rating"),
    check("awards")
        .notEmpty()
        .withMessage("Deberá colocar los awards"),
    check("release_date")
        .notEmpty()
        .withMessage("Coloque la fecha de estreno"),
    check("length")
        .notEmpty()
        .withMessage("Coloque la tiempo de la pelicula")
]
