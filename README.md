1. clone my repo : git clone https://github.com/yi625/tests.git


2. Run playwrite ui or just test only
  - npx playwright test --ui    (Able to view the the test with UI interface)
  - npx playwright test

  
3. Create Generate report
  -npx playwright test --ui --reporter=html
  - npx playwright test --reporter=html

  

  
4. Display report
  - npx playwright show-report
  - click view trace able to view the screenshot 
  - make sure got run with UI


5. API automation 
  - found out that after update /deelete, the data remain the same ,it show in the guide https://jsonplaceholder.typicode.com/guide/
  - even i run in postman, after patch then get, the record//data still remain the same ,delete also will still showing the same data


