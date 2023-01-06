# FOOTIX-DATA-CENTER
An api to structure data for football tournaments in order to study some recursive variables

# Steps to run this project:

1. Run :
```bash
npm i
```
2. Please make sure to check you environment. We're using in this project dotenv architecture.<br>
Rename the `./src/.env.example` file to `./src/.env` and then set up inside this file environnement settings

3. Finally Run : 
```bash
npm run dev
```

## Project structure

| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/src/.env`  | Environnement settings                    |
| `/assets/xlsx`  | Document folder                     |
| `/src/entity`   | Entity files wrote with typeORM decorators  |
| `/src/dump`   | DB dump for some tables (alternative for seeders)  |
| `/src/interface`   | Interface for some entities  |
| `/src/service`   | All services file about each entity |
| `/src/controller`   | All controllers file for each service file |
| `/src/route`        | Routes organized by entity with an index |
| `/src/middleware`   | Middlewares for some routes  |
| `/src/index.ts` | API Entry Point with server configurations |
| `/src/dto`     | DTOs for entities          |
| `/src/conf`     | Imported project configurations from an .env file  |

Please kindly respect this project architecture in your code maintenance or for eventual pull requests.


## Check Postman Collection for each api
https://documenter.getpostman.com/view/23479319/2s8Z6zzC3a

## Important !
Check inside the `/assets/xlsx` folder, there's a dummy xlsx document for your tests named with `.xlsx.example` extension.
Please renamme it with `.xlsx` extension and use it to tests apis.

## Code of conduct
Please add descriptions inside readme file to describe each of your changes before making pull request.

[link-author]: https://github.com/yaasiin-ayeva
