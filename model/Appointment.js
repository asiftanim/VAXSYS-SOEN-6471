module.exports = (sequelize, types) => {
    return sequelize.define("Appointment", {
        appointmentId: {
            type: types.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: types.STRING,
        lastName: types.STRING,
        address: types.STRING,
        age: types.BIGINT,
        medications: types.STRING,
        allergies: types.STRING,
        appointmentStartTime: types.DATE,
        isCompleted: types.BOOLEAN,
        createdAt : {type: types.DATE, defaultValue: types.NOW}
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        tableName: "appointment",
    });
}