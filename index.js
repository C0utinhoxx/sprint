const readlineSync = require("readline-sync");
const { simulateSession } = require("./session");
const { calculateCost } = require("./billing");
const { printHeader, printReport } = require("./display");

printHeader();

const NAME_MIN = 2;
const NAME_MAX = 100;
const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;

let name = "";
while (true) {
  name = readlineSync.question("\n  Seu nome: ").trim();
  if (name.length < NAME_MIN) {
    console.log(`Nome inválido. Digite pelo menos ${NAME_MIN} caracteres.`);
    continue;
  }
  if (name.length > NAME_MAX) {
    console.log(`Nome muito longo. Use no máximo ${NAME_MAX} caracteres.`);
    continue;
  }
  if (!NAME_PATTERN.test(name)) {
    console.log("Nome inválido. Use apenas letras (incluindo acentos), espaços, apóstrofo, hífen ou ponto.");
    continue;
  }
  break;
}

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
  const input = readlineSync.question("Hora de início (0–23): ").trim();
  if (!/^\d+$/.test(input)) {
    console.log("Hora inválida. Digite somente um número inteiro entre 0 e 23 (sem letras ou decimais).");
    continue;
  }
  const hourNum = Number(input);
  if (!Number.isInteger(hourNum) || hourNum < 0 || hourNum > 23) {
    console.log("Hora inválida. Digite um número entre 0 e 23.");
    continue;
  }
  startHour = hourNum;
}

let duration = 0;

while (duration < 1 || duration > 480) {
  const input = readlineSync.question("Duração da recarga em minutos (1–480): ").trim();
  if (!/^\d+$/.test(input)) {
    console.log("Duração inválida. Digite somente um número inteiro entre 1 e 480 (sem letras ou decimais).");
    continue;
  }
  const durationNum = Number(input);
  if (!Number.isInteger(durationNum) || durationNum < 1 || durationNum > 480) {
    console.log("Duração inválida. Digite entre 1 e 480 minutos.");
    continue;
  }
  duration = durationNum;
}

const startTime = new Date();
startTime.setHours(startHour, 0, 0, 0);

const sessionData = simulateSession(duration);

const billingData = calculateCost(sessionData.totalEnergyKwh, startHour, userType);

const userData = { name, userType, startTime };
printReport(userData, sessionData, billingData);
