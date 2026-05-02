const CHARGER_POWER_KW = 7.4;

function simulateSession(durationMinutes) {
  console.log("\n Iniciando simulação de recarga...\n");

  let totalEnergyKwh = 0;
  const ticks = [];

  for (let minute = 1; minute <= durationMinutes; minute++) {
    const energyThisTick = CHARGER_POWER_KW / 60;
    totalEnergyKwh += energyThisTick;

    ticks.push({
      minute,
      energyKwh: parseFloat(energyThisTick.toFixed(4)),
      accumulated: parseFloat(totalEnergyKwh.toFixed(4)),
    });

    if (minute % 10 === 0 || minute === durationMinutes) {
      const bar = buildProgressBar(minute, durationMinutes);
      process.stdout.write(`\r  ${bar} ${minute}/${durationMinutes} min`);
    }
  }

  console.log("\n");
  return {
    durationMinutes,
    totalEnergyKwh: parseFloat(totalEnergyKwh.toFixed(4)),
    ticks,
  };
}

function buildProgressBar(current, total) {
  const filled = Math.round((current / total) * 20);
  const empty = 20 - filled;
  return "[" + "█".repeat(filled) + "░".repeat(empty) + "]";
}

module.exports = { simulateSession };
