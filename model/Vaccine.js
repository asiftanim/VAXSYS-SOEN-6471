module.exports = (sequelize, types) => {
  return sequelize.define(
    "Vaccine",
    {
      VaccineId: {
        type: types.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: types.STRING,
      description: types.STRING,
      doseThreshold: types.BIGINT,
      minAge: types.BIGINT,
      category: types.STRING,
      createdAt: { type: types.DATE, defaultValue: types.NOW },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      tableName: "vaccine",
    }
  );
};
