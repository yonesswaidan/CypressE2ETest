# CypressE2ETest

Dette projekt indeholder end-to-end tests til en Blazor webapplikation ved hj�lp af Cypress.

## Krav

Du skal have f�lgende installeret:

- Node.js (version 14 eller nyere)
- npm (Node package manager)
- .NET SDK (for at k�re Blazor-applikationen)

## 

1. **Klon projektet fra GitHub:**

   ```bash
   git clone https://github.com/yonesswaidan/CypressE2ETest.git
   cd CypressE2ETest

   Installer afh�ngigheder:

   npm install

   K�r applikationen:

   dotnet run


   �ben Cypress testv�rkt�jet:

   npx cypress open 

   K�rsel af tests
   For at k�re alle tests i headless-tilstand (alts� uden brugergr�nseflade):

   npx cypress run

   Projektstruktur
   CypressE2ETest/ � Kildekode til webapplikationen

   cypress/ � Testfiler og Cypress-konfigurationer

   e2e/ � End-to-end testfiler

   fixtures/ � Testdata

   support/ � Egenkommandofiler og hj�lpemetoder