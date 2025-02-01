<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo


1. Clonar el repositorio
2. Ejecutar 
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar la copia __.env__
6. Llenar las variables de entorno definidas en el ```.env```
7. Ejecutar la aplicaion de desarollo 
   ````
yarn start:dev
   ```
8. Recargar la base de datos
```
http://lobo.local:3001/api/v2/seed
```

# Production build
1. crear archivo ````env.prod```
2. llenar las variables de entorno para prod
3. Crear la imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. Correrla 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```




## Stack Usado
* MongoDB
* Nest
