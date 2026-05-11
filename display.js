function printHeader() {
  console.log("SIMULADOR DE SESSÃO DE RECARGA");
}

function printReport(userData, sessionData, billingData) {
  const startTime = new Date(userData.startTime);
  const endTime = new Date(startTime.getTime() + sessionData.durationMinutes * 60000);

  console.log("\n" + "─".repeat(50));
  console.log("  RELATÓRIO DA SESSÃO");
  console.log("─".repeat(50));
  console.log(`  Usuário       : ${userData.name}`);
  console.log(`  Tipo          : ${userData.userType.toUpperCase()}`);
  console.log(`  Início        : ${formatTime(startTime)}`);
  console.log(`  Fim           : ${formatTime(endTime)}`);
  console.log(`  Duração       : ${sessionData.durationMinutes} minutos`);
  console.log("─".repeat(50));
  console.log(`  Energia       : ${sessionData.totalEnergyKwh} kWh`);
  console.log(`  Tarifa base   : R$ 0.75/kWh`);
  console.log(`  Horário pico  : ${billingData.isPeakHour ? "SIM (+50%)" : "NÃO"}`);
  console.log(`  Tarifa final  : R$ ${billingData.rate}/kWh`);
  console.log("─".repeat(50));
  console.log(`   TOTAL      : R$ ${billingData.total}`);
  console.log("─".repeat(50) + "\n");
}

function formatTime(date) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

module.exports = { printHeader, printReport };
