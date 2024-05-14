# EASYDOO - Test
this is an application made for a recruitment test made by Easydoo , it is a simple app using next js to manage a products (CRUD) and ensure authentication using a mock api (https://fakestoreapi.com) in proccess
<br>
<br>
<br>
  <img width="15%" height="80px" style="margin-right:10px;" src="https://github.com/abderrahmaneGasmi/easydootest/assets/119729705/f18a3b72-334e-4804-a70b-151adf27c3d2"/>

# Overview
## Authentication
before accesing the app the user need to be authenticated using his username and password , if a user forgot to type user name or password a toast will appear with an error message , when the user type the username and password and press login a request to the api will be send https://fakestoreapi.com/auth/login and will check if the credentials are correct
<div style='display:flex;width:100%;justify-content:center'>
  <img width="47%" height="300px" style="margin-left:120px;" src="https://github.com/abderrahmaneGasmi/easydootest/assets/119729705/3f220c27-2c81-47f2-a7fd-1969ec22e83f"/>
</div>

## Products
when authentication is correct , user now can see the list of products and will have :
### CRUD
user have the ability to manage the products he can
<ul>
  <li>
    Modify Product
  </li>
  <li>
    Add Product
  </li>
  <li>
    Delete a product
  </li>
</ul>


### Features
<ul>
  <li>
    product can be on form of grid or list
  </li>
  <li>
    user can search for products
  </li>
  <li>
    user can filter by category
  </li>
  <li>
    user can see related products
  </li>
</ul>

<div style='display:flex;width:100%;justify-content:center;gap:10px'>
  <img width="47%" height="300px" style="margin-left:120px;" src="https://github.com/abderrahmaneGasmi/easydootest/assets/119729705/d9323325-7e88-4794-b060-df14a5564b8c"/>
    <img width="47%" height="300px" style="margin-right:10px;" src="https://github.com/abderrahmaneGasmi/easydootest/assets/119729705/cfda5ea1-d315-45d5-ad1b-2e6acef96636"/>
    <img width="47%" height="300px" style="margin-right:10px;" src="https://github.com/abderrahmaneGasmi/easydootest/assets/119729705/aab7ed0c-eb54-43b6-8396-a1247ffff1f7"/>
    <img width="47%" height="300px" style="margin-right:10px;" src="https://github.com/abderrahmaneGasmi/easydootest/assets/119729705/e7d1656c-20e9-4dfd-a124-70c5c91f4d3f"/>
</div>

# Run
The application uses <a href='https://www.nodejs.org/'>Node.js <a/> and <a href ='https://github.com/npm/npm'>npm </a> so you will have to download and install them as part of the steps below.

Install Node.js and npm
Clone this repository :
```
git clone [https://github.com/abderrahmaneGasmi/easydootest]
```
Go to the project folder in a terminal and run:

```
cd easydootest
```


Install packages :
```
npm i
```

When installation is complete, run command :
```
npm run dev
```
Go to http://localhost:3000

# Problems Faced

the main problem faced while developing this app is the api which i have faced problems which are
<ul>
  <li>
    absence of token confirmation when using product endpoint 
  </li>
  <li>
    absence of search api
  </li>
  <li>
    no errors if the product id is false
  </li>
  <li>
    lagging and high response time and no control over some exceptions such as sending a large data image when adding or modifying product
  </li>
  <li>
    absence of database , so when a modifaction happend it needed to be controled on the frontend part such as changing image or removing a product 
  </li>
</ul>

# Choices
## Authentication 
for the authentication app ive used a simple authentication system which is a cookie based variable that save the username and password , and using a global authProvider context to control the routes and protect the necessary ones
