# VerAIzon

Our VerAIson website contains a chatbot that allows users to ask questions and discover Verizon products best suited to their needs.

## Built by

- Savio Xavier
- Chuyang Zhang
- Jonathan Wang

## How we built it
We used an implementation of OpenAI's gpt-3.5-turbo model to create a chatbot. We trained this chatbot using LangChain, feeding it information from the official Verizon website. Using FastAPI, we set up a server and API endpoints to connect the back-end to the front-end. In our front-end, we used React, Next.js, and Tailwind CSS to create a web application with an UI that allows users to send and receive information to and from the chatbot.

## Challenges we ran into
Finding an AI language model to implement, building a framework handle communication between the front-end and the back-end, finishing by the deadline

## What we learned
How to train an AI with LangChain, how to build a website using modern frameworks like React and Next.js, how to create an API using FastAPI, how to collaborate using Microsoft Live Share in VS Code

## Technologies used
### Frontend
- NextJS
- TailwindCSS

### Backend
- OpenAI
- LangChain
- FastAPI

### Installation instructions

- Clone this repo

`git clone https://github.com/oddblaster/VerAIzon.git`

- cd to frontend

`cd frontend`

- Install dependencies

`npm install`

- Start the webapp

`npm run dev`

At the same time, the backend should be running as well

To accomplish this, you can do the following:

- cd to backend

`cd backend`

- Run the Python file

`python main.py`

Please note that you will have to first enter a valid OpenAI key as an `APIKEY` variable for the script to run successfully. It is also recommended to install all the backend packages using `pip` using a Python version not greater than 3.10
