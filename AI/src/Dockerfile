# Utiliser l'image de base de Node.js
FROM node:18-alpine

ENV NODE_ENV=dev
# Créer un répertoire pour l'application
RUN mkdir -p /app

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY package.json ./
COPY package-lock.json ./

# Installer les dépendances de l'application
RUN npm install
RUN echo $NODE_ENV

# Copier le reste des fichiers de l'application
COPY .. .


# Exposer le port pour accéder à l'API
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
