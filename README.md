<img src="https://user-images.githubusercontent.com/16279779/46770397-1a65cd80-cd2a-11e8-8f3d-d96792edc076.png" width="270" alt="blockon">

[![Build Status](https://travis-ci.org/team-blockon/blockon.svg?branch=master)](https://travis-ci.org/team-blockon/blockon)

Blockon is real estate contract management platform based on Klaytn.

## CI/CD architecture

CI/CD with Travis CI, docker-compose, S3 and CodeDeploy.

<img src="https://user-images.githubusercontent.com/16279779/47846816-8e1c6700-de0c-11e8-8c3f-1eb7d6585e53.png" width="350" alt="Blockon CI/CD">

## Dependency

Blockon has the dependencies for the following libraries:

| Node.js               | MongoDB |
| --------------------- | ------- |
| 8.11.2+ (except 10.x) | 3.6.5+  |

## How to start developing Blockon?

For anyone interested in developing Blockon, follow the instructions below.

### Development Environment

Clone the Blockon repository install the dependency modules.

#### 1. Clone the repository

```bash
# Clone the repository.
$ git clone https://github.com/team-blockon/blockon.git
```

#### 2. Install dependencies

`npm` and `Yarn` are supported.

Run command in `blockon-backend` and `blockon-frontend` directory, respectively.

```bash
# Install the dependency modules.
$ npm install

# or
$ yarn
```

#### 3. Set environment variables

Copy the `.env.example` file and rename it to `.env` (inside `blockon-backend` directory)

And set the `MONGO_URI` and `SECRET_KEY` variable.

#### 4. Build

Use shell script to build Blockon

```bash
# Run webpack-dev-server for development
$ sh start.sh dev

# or production build
$ sh start.sh
```

## License

Blockon is licensed under the [MIT license](LICENSE).
