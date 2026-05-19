# Sprint 1 — Simulador de Sessão de Recarga EV

* **RM 569619** - Bruno Riquelme Coutinho Pereira
* **RM 569897** - Eduardo Bigoli Portela
* **RM 570497** - Gabriel Martins Cordeiro Rodrigues
* **RM 573651** - Gustavo Fondato de Souza
* **RM 570584** - Gustavo Martins Da Silva
* **RM 572863** - Lucas Lino Marques da Silva


## O que o programa faz
O programa simula uma sessão completa de recarga de veículo elétrico (EV) diretamente no terminal. 

## Fluxo de Funcionamento:
1. O usuário informa seu **nome**, **tipo de perfil**, **horário de início** e a **duração da recarga**.
2. O programa simula a sessão de recarga **minuto a minuto**.
3. Calcula a **energia total consumida** ao longo do tempo.
4. Aplica as **regras de tarifação** com base nos dados fornecidos.
5. Exibe um **relatório final detalhado** com o valor total a pagar.

## Como Executar

1. **Instalar a dependência e rodar o comando**
   ```bash
   npm install
   node index.js

