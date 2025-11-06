# 1. Imagen base: Usamos una imagen ligera de Node.js
FROM node:18-alpine

# 2. Directorio de trabajo: Creamos una carpeta 'app' dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de dependencias
COPY package.json package-lock.json ./

# 4. Instalamos las dependencias (Express, Sequelize, etc.)
RUN npm install

# 5. Copiamos el resto del código de nuestra aplicación
COPY . .

# 6. Exponemos el puerto en el que corre la app (de nuestro .env)
EXPOSE 3000

# 7. Comando de inicio: El mismo de nuestro package.json
CMD [ "npm", "start" ]