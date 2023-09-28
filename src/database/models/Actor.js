module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100)
        },
        last_name: {
            type: dataTypes.STRING(100)
        },
        rating: {
            type: dataTypes.DECIMAL(3,1)
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        }
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    };
    const Actor = sequelize.define(alias, cols, config)

    return Actor
}