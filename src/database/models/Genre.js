module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100)
        },
        ranking: {
            type: dataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false,
        },
        active: {
            type : dataTypes.TINYINT(1),
            defaultValue: 1
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: false
    };
    const Genre = sequelize.define(alias, cols, config)

    return Genre
}