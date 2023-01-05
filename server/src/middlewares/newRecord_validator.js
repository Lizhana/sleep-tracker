const { NewRecord } = require("../db.js");
const { date_maker } = require("../helpers/date_maker.js");
const { time_maker } = require("../helpers/time_maker.js");

const new_record_validator = async (req, res, next) => {
  let { dateMeal, timeMeal, sleepTime, coffee, drink, activity } = req.body;

  /* if (!dateMeal) return res.status(400).json({ error: "Ingresa la fecha" });
  if (!timeMeal) return res.status(400).json({ error: "Ingresa la hora" });
  if (!sleepTime)
    return res.status(400).json({ error: "Ingresa tus horas de sueño" }); */

  if (!dateMeal) {
    dateMeal = date_maker();
  }

  if (!timeMeal) {
    timeMeal = time_maker();
  }

  if (sleepTime) {
    parseInt(sleepTime);
  }

  if (!coffee) {
    coffee = [];
  }
  if (!drink) {
    drink = [];
  }
  if (!activity) {
    activity = [];
  }

  const dateMealRes = await NewRecord.findAll({
    where: {
      dateMeal: dateMeal,
    },
  });

  const timeMealRes = await NewRecord.findAll({
    where: {
      timeMeal: timeMeal,
    },
  });

  if (dateMealRes.length >= 1 && timeMealRes.length >= 1)
    return res.status(400).json({
      message: `Dos registros no pueden contener fecha y hora iguales`,
    });

  return next();
};

module.exports = { new_record_validator };
