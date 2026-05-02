const readlineSync = require("readline-sync");
const { simulateSession } = require("./session");
const { calculateCost } = require("./billing");
const { printHeader, printReport } = require("./display");

printHeader();

const name = readlineSync.question("\n  Seu nome: ").trim();

const validTypes = ["comum", "vip", "corporativo"];
let userType = "";

while (!validTypes.includes(userType)) {
  userType = readlineSync
    .question("Tipo de usuário (comum / vip / corporativo): ")
    .toLowerCase()
    .trim();

  if (!validTypes.includes(userType)) {
    console.log("Tipo inválido. Tente novamente.");
  }
}

let startHour = -1;

while (startHour < 0 || startHour > 23) {
  const input = readlineSync.question("Hora de início (0–23): ");
  startHour = parseInt(input);

  if (isNaN(startHour) || startHour < 0 || startHour > 23) {
    console.log("Hora inválida. Digite um número entre 0 e 23.");
    startHour = -1;
  }
}

let duration = 0;

while (duration < 1 || duration > 480) {
  const input = readlineSync.question("Duração da recarga em minutos (1–480): ");
  duration = parseInt(input);

  if (isNaN(duration) || duration < 1 || duration > 480) {
    console.log("Duração inválida. Digite entre 1 e 480 minutos.");
    duration = 0;
  }
}

const startTime = new Date();
startTime.setHours(startHour, 0, 0, 0);

const sessionData = simulateSession(duration);

const billingData = calculateCost(sessionData.totalEnergyKwh, startHour, userType);

const userData = { name, userType, startTime };
printReport(userData, sessionData, billingData);
