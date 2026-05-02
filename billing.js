function getTariffRate(hour, userType) {
  let baseRate = 0.75; 

  const isPeakHour = hour >= 18 && hour < 22;
  if (isPeakHour) {
    baseRate *= 1.5;
  }

  if (userType === "vip") {
    baseRate *= 0.8;
  } else if (userType === "corporativo") {
    baseRate *= 0.9;
  }

  return parseFloat(baseRate.toFixed(4));
}

function calculateCost(energyKwh, hour, userType) {
  const rate = getTariffRate(hour, userType);
  const total = energyKwh * rate;
  return {
    rate,
    total: parseFloat(total.toFixed(2)),
    isPeakHour: hour >= 18 && hour < 22,
  };
}

module.exports = { getTariffRate, calculateCost };

