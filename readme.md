Setup
`npm i OR yarn`

run project:
`npm run start OR yarn start`

run test cases:
`npm run test OR yarn test`

-----Additional Information-----

> I have not added the command to delete the entire DB after successful test execution, as there is a functionalty in adminOnlyRoute to access all the users, if the db would be deleted or dropped the particular one would return an empty array. Thus for sake of easy work flow, i didnot added the required command.

> As a result, the 1st test case would pass, followed by that, 2 test case of user/signup.test.js would fail !
> work around ->  
> I have added a TODO, if you would wish to execute the test again, replace the emails with some random email
> changes are required in line 91 and 123 of signup.test.js
