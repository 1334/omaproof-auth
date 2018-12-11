<p align="center">
<img src="https://res.cloudinary.com/errstate/image/upload/v1544534611/screenshots/omaproof/logo-b-large.png" width="250px">
</p>

_A family friendly way to connect_

Do you have a family group on WhatsApp? Do you feel like you should share more with your family, but find the major social networks too public?
Omaproof aims to provide a secure, easy to use, structured social network dedicated to your family.

## Screenshots

<p align="center">
<img src="https://res.cloudinary.com/errstate/image/upload/v1544519942/screenshots/omaproof/home.png" width="250px"> &nbsp;&nbsp;
<img src="https://res.cloudinary.com/errstate/image/upload/v1544519938/screenshots/omaproof/register.png" width="250px"> &nbsp;&nbsp;
<img src="https://res.cloudinary.com/errstate/image/upload/v1544519941/screenshots/omaproof/feed.png" width="250px"> &nbsp;&nbsp;
<img src="https://res.cloudinary.com/errstate/image/upload/v1544519937/screenshots/omaproof/month.png" width="250px"> &nbsp;&nbsp;
<img src="https://res.cloudinary.com/errstate/image/upload/v1544519937/screenshots/omaproof/names.png" width="250px"> &nbsp;&nbsp;
<img src="https://res.cloudinary.com/errstate/image/upload/v1544519938/screenshots/omaproof/pics.png" width="250px"> &nbsp;&nbsp;
</p>

## Installation

To run the app you need to clone the [omaproof-client](https://github.com/1334/omaproof-client), [omaproof-server](https://github.com/1334/omaproof-server) and [omaproof-auth](https://github.com/1334/omaproof-auth) repositories.

### Client

```
git clone https://github.com/1334/omaproof-client
cd  omaproof-client
npm install

# to run it
npm start
```

### Server

```
git clone https://github.com/1334/omaproof-server
cd  omaproof-server
npm install

# to run it
nodemon src/index.js
```

### Auth

```
# install rabbitMQ, on MacOs
brew install rabbitmq

git clone https://github.com/1334/omaproof-auth
cd  omaproof-auth
npm install

# to run it
rabbitmq-server # start the rabitMQ service
nodemon src/index.js
```

## Tech Stack

- React
- Apollo Client
- GraphQL-Yoga
- Prisma
- RabbitMQ
- Sequelize.js
- PostgreSQL

## Developers

- Frederik Hermans (@h3dgy)
- Iñigo Solano (@1334)
- Maxim Sinelnikov (@Truroer)
- Jovan Ratković (@ishootblanks)
