# Intellectworks
I created all apis for CURD opretion in firebase authentication using nodejs
step 1-> git clone https://github.com/rahulcoder001/Intellectworks.git,
step 2-> npm i ,
step 3-> check all endpoints

user management api 
1. create user api
   endpoint:- http://localhost:4000/createuser
   examplebody:- { 
      "email":"2@2.com",
      "name":"rahul",
      "age":70
      }
2. Update User API
   endpoint:- http://localhost:4000/updateuser
   examplebody:- { 
      "email":"2@2.com",
      "updateData": {
         "name": "ram"
              }
    }
3. 1. delete user api
   endpoint:- http://localhost:4000/deleteuser
   examplebody:- { 
      "email":"2@2.com"
      }

Notes Management APIs

4. Save Note API
   endpoint:- http://localhost:4000/savenote
   examplebody:- {
     "userId": "FK9UDJI6FtgcnaXcWtY3", 
     "title": "my assiment work",
     "content":" i really doing a hard work to complte my asiment such as i have to wathc many 
                 videos to learn how firebase authentication works and a lot more"
                }
5. Get note api
   endpoint:- http://localhost:4000/getnotes?userId=xyz
   exampleendpoint :- http://localhost:4000/getnotes?userId=FK9UDJI6FtgcnaXcWtY3
   
   
   
