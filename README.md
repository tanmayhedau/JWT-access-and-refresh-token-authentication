# JWT-access-and-refresh-token-authentication

Backend app

step 1: use npm start in the terminal to run the server.

step 2: use post request to login in the app http://localhost:3004/login
{
"user": {
"name": "tanmay",
"id": 1
}
}

give this type of data in request body.

step 3: use post request to see protected content http://localhost:3004/protected and copy the accesstoken from login route asap as it is having some expiry and paste it in the headers section of protected route where x-api-key will be key and value will be copied accesstoken.

step 4: incase you have passed that expiry time and not able to see protected content , use post request for refresh route http://localhost:3004/refresh and pass refreshtoken as a token in the request body, copy refresh token from login route and paste it in refresh route.

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFubWF5IiwiaWQiOjEsImlhdCI6MTY3NTM5NzU2MywiZXhwIjoxNjc2MDAyMzYzfQ.rYPikXjII6IHCWtRzMO3FErCVjm8yTkt8uJvFv6_lQ4"
}

step 5: use post request again to see protected content http://localhost:3004/protected and copy the accesstoken from refresh route and paste it in the headers section of protected route where x-api-key will be key and value will be copied accesstoken.