![logo](https://github.com/noaakl/naime-app/blob/main/src/images/nAIme.png)

# nAIme
Our nAime website delivers the SpokenName2Vec and GRAFT novelty algorithms along with the Jellyfish package algorithms.
Using these algorithms you will be able to retrieve alternative and similar names for a given name query.
In this nAime website you will also see different statistics on name searches such as all time top names searched and how many searches included your very own query.
You will be able to rank the quality of the retrieved names, sort and filter the results to your liking.

The nAime website is part of our Name Search Final Project.
For more information about this project [Click Here](https://github.com/noaakl/Final_Project_Names)

### Run the Project:
- cd backend
 - For mac/unix users:
    - create virtual environment:
        - run `python3 -m venv env`
        - run `source env/bin/activate`
- For windows users:
    - create virtual environment:
        - run `py -m venv env`
        - run `.\env\Scripts\activate`
    - change the `start-backend` script in package.json to `"start-backend": "cd backend && env/Scripts/flask run"`
- pip install -r requirements.txt
- on one terminal on the base root run `yarn run start-backend`
- on a second trminal n the base root run `yarn start`

##

### BD

in order to the program to work, the DB file needs to be located inside the `backend` directory.
the DB file can not be added to git due to size limitation.

##

### Use-cases

- Search for alternative names to a given name query

##

### Development

nAIme was built with [ReactJS](https://reactjs.org) on the client side, [Flask](https://flask.palletsprojects.com/en/2.0.x/) on the server side, and designed using [Bootstrap](https://react-bootstrap.github.io/) components.

##

### Authors

- [Noaa Kless](https://github.com/noaakl)
- [Tal Meridor](https://github.com/talmeri)
- [Guy Shimony](https://github.com/guyshimony)
