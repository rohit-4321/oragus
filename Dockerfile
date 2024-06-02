# Stage 1:- Building

# Using node 18 version
FROM node:18-alpine AS build

WORKDIR /usr/src/oragus_backend


COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

#Compile typescript
RUN npm run build


#Coping Artifacts

FROM node:18-alpine

WORKDIR /usr/src/oragus_backend


COPY --from=build /usr/src/oragus_backend  /.

EXPOSE 3000

CMD [ "npm", "start" ]


