module.exports = (sequelize, types) => {
  return sequelize.define(
    "VaccineCentre",
    {
      id: {
        type: types.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: types.STRING,
      description: types.STRING,
      address: types.STRING,
      startTime: types.TIME,
      endTime: types.TIME,
      createdAt: { type: types.DATE, defaultValue: types.NOW },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      tableName: "vaccine_centre",
    }
  );
};
