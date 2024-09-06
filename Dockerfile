# Usar una imagen de Node para construir la aplicación
FROM node:20-alpine AS build

WORKDIR /app

# Copiar el código fuente al contenedor
COPY . .

# Establecer la variable de entorno para el backend
ENV REACT_APP_BACKEND=/api

# Instalar dependencias y construir el proyecto
RUN npm install && npm run build

# Usar una imagen de nginx para servir la aplicación
FROM nginx:stable-alpine

# Copiar el build del frontend al directorio de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
