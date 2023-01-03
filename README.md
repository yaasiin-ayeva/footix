# FOOTIX-DATA-CENTER
An api to structure data for football tournaments in order to study some recursive variables

# Steps to run this project:

1. Run :
```bash
npm i
```
2. Please be sure to check you environment. Setup environnement settings are inside **./.env** file

3. Finally Run : 
```bash
npm run dev
```

## Project structure

| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/src/.env`  | Environnement settings                    |
| `/assets/documents`  | Document folder                     |
| `/assets/pictures`   | Pictures folder                     |
| `/src/entity`   | Entity files wrote with typeORM decorators  |
| `/src/interfaces`   | Interface for some entities  |
| `/src/services`   | All services organized by entity with an index |
| `/src/middlewares`   | Middlewares for some services  |
| `/src/routes`        | Routes organized by entity with an index |
| `/src/index.js` | API Entry Point with server configurations |
| `/src/dtos`     | DTOs for entities          |
| `/src/configs`     | Imported project configurations from an .env file  |

Please kindly respect this project architecture in your code maintenance or for eventual pull requests.


## Check Postman Collection 
https://documenter.getpostman.com/view/23479319/2s8Z6zzC3a

[link-author]: https://github.com/yaasiin-ayeva
