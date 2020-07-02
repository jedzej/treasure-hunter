# Treasure hunter

## Semi-production setup

#### Prerequisites

1. Docker
1. docker-compose

#### Running instructions
1. Clone this repository
1. Open this directory in console
1. `docker-compose up --build`
1. Open [http://localhost/](http://localhost/) to view it in the browser.


## Development setup

#### Prerequisites

1. Docker
1. docker-compose
1. nodejs
1. yarn
1. python3.8
1. pip

#### Running instructions

1. Clone this repository
1. Navigate to this reopsitory in console
1. __Open 1st console window to run db services__
1. Run database server and pgadmin `docker-compose up postgres pgadmin`
1. __Open 2nd console window to run backend app__
1. `cd ./backend`
1. Setup venv and install requirements from requirements.txt - [more info](https://docs.python.org/3/tutorial/venv.html)
1. `./venv/Scripts/activate.bat` - this step depends on your OS
1. `flask db upgrade`
1. `flask run`
1. __Open 3rd console window to run frontend app__
1. `cd ./frontend`
1. `yarn install`
1. `yarn start`
1. Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.