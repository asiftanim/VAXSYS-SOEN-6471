module.exports = (sequelize, types) => {
    return sequelize.define("User", {
        userId: {
            type: types.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: types.STRING,
        lastName: types.STRING,
        role: types.BIGINT,
        email: types.STRING,
        password: types.STRING,
        createdAt : {type: types.DATE, defaultValue: types.NOW}
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        tableName: "users",
    });
}