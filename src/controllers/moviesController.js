const db = require('../database/models');
const sequelize = db.sequelize;

const { validationResult } = require('express-validator')

const moment = require('moment')

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    },
    add: function (req, res) {
        return res.render('moviesAdd')
    },
    create: function (req, res) {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            // nombre tiene que coincidir con las columnas (fijarse en models)
        const { title, rating, awards, release_date, length } = req.body
        db.Movie.create({
            title: title.trim(),
            rating,
            awards,
            release_date,
            length
        })
            .then(movie => {
                console.log(movie)
                return res.redirect('/movies')
            })
            .catch(error => console.log(error))
        // return res.send(req.body)
        } else {
            return res.render('moviesAdd' , {               
                errors: errors.mapped(),
                old: req.body
            });
        }
        
    },
    edit: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesEdit', {
                    Movie: movie,
                    moment
                })
            })
            .catch(error => console.log(error))
    },
    update: function (req, res) {

        const { title, rating, awards, release_date, length } = req.body
        db.Movie.update(
            {
                title: title.trim(),
                rating,
                awards,
                release_date,
                length
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            // .then(response => {
            //     console.log(response);
            //     db.Movie.findByPk(req.params.id)
            //         .then(movie => {
            //             return res.render('moviesDetail', {
            //                 movie
            //             })
            //         })
            // })
            // .catch(error => console.log(error))
            .then(response => {
                console.log(response);
                return res.redirect('/movies/detail/' + req.params.id)
            })
            .catch(error => console.log(error))
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                return res.render('moviesDelete', {
                    Movie: movie
                })
            })
            .catch(error => console.log(error))
    },
    destroy: function (req, res) {

        db.ActorMovie.destroy({
            where: {
                movie_id: req.params.id
            }
        }).then((response) => {
            console.log('response ActorMovie =>', response)

            db.Actor.update(
                {
                    favorite_movie_id: null
                },
                {
                    where: {
                        favorite_movie_id: req.params.id
                    }
                }
            ).then((response) => {
                console.log('response Actor =>', response);

                db.Movie.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then((response) => {
                    // muestra 1 si se borro y 0 si no
                    console.log('response Movie =>', response);
                    return res.redirect("/movies")
                })

            })
        })
            .catch(error => console.log(error))
    }
}

module.exports = moviesController;
