# CypressE2ETest

Dette projekt indeholder end-to-end tests til en Blazor webapplikation ved hjælp af Cypress.

## Krav

Du skal have følgende installeret:

- Node.js (version 14 eller nyere)
- npm (Node package manager)
- .NET SDK (for at køre Blazor-applikationen)

## 

1. **Klon projektet fra GitHub:**

   ```bash
   git clone https://github.com/yonesswaidan/CypressE2ETest.git
   cd CypressE2ETest

   Installer afhængigheder:

   npm install

   Kør applikationen:

   dotnet run


   Åben Cypress testværktøjet:

   npx cypress open 

   Kørsel af tests
   For at køre alle tests i headless-tilstand (altså uden brugergrænseflade):

   npx cypress run

   Projektstruktur
   CypressE2ETest/ – Kildekode til webapplikationen

   cypress/ – Testfiler og Cypress-konfigurationer

   e2e/ – End-to-end testfiler

   fixtures/ – Testdata

   support/ – Egenkommandofiler og hjælpemetoder