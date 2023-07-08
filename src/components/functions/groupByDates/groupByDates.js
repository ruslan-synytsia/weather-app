export const groupByDates = arr => {
  const result = arr.reduce((acc, obj) => {
    if (acc[obj.dt_txt.slice(0, 10)]) {
      const temp = Math.ceil(obj.main.temp);
      acc[obj.dt_txt.slice(0, 10)].sumTemp += temp;
      acc[obj.dt_txt.slice(0, 10)].sumWind += obj.wind.speed;
      acc[obj.dt_txt.slice(0, 10)].sumDeg += obj.wind.deg;
      acc[obj.dt_txt.slice(0, 10)].date = obj.dt;
      acc[obj.dt_txt.slice(0, 10)].count++;

      if (temp > acc[obj.dt_txt.slice(0, 10)].maxTemp) {
        acc[obj.dt_txt.slice(0, 10)].maxTemp = temp;
      }
      if (temp < acc[obj.dt_txt.slice(0, 10)].minTemp) {
        acc[obj.dt_txt.slice(0, 10)].minTemp = temp;
      }
    } else {
      const temp = Math.ceil(obj.main.temp);
      acc[obj.dt_txt.slice(0, 10)] = {
        key: obj.dt_txt.slice(0, 10),
        date: obj.dt,
        sumTemp: temp,
        maxTemp: temp,
        minTemp: temp,
        sumWind: obj.wind.speed,
        sumDeg: obj.wind.deg,
        count: 1,
      };
    }

    if (
      acc[obj.dt_txt.slice(0, 10)].count === 1 ||
      acc[obj.dt_txt.slice(0, 10)].count === 2 ||
      acc[obj.dt_txt.slice(0, 10)].count === 3
    ) {
      acc[obj.dt_txt.slice(0, 10)].icon = obj.weather[0].icon;
    }

    return acc;
  }, {});

  const averageResult = Object.entries(result).map(([key, value]) => ({
    key,
    date: value.date,
    maxTemp: value.maxTemp,
    minTemp: value.minTemp,
    averageWind: (value.sumWind / value.count).toFixed(2),
    averageDeg: Math.ceil(value.sumDeg / value.count),
    icon: value.icon,
  }));

  return averageResult;
};