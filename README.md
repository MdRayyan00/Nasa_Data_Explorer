# Nasa Data Explorer

A full-stack NASA data explorer built with React and Express.

# Live on Render
https://nasa-data-explorer-sfnp.onrender.com

## Features

- NASA Astronomy Picture of the Day (APOD)
- NASA Image Library search
- Mars Rover Photos
- EPIC Earth images
- Near Earth Objects data

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed
- A NASA API key (get one [here](https://api.nasa.gov/))

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/MdRayyan00/Nasa_Data_Explorer.git
   cd Nasa_Data_Explorer

   ```

2. **Create a `.env` file for the backend**

   In `backend/.env`:
   ```
   NASA_API_KEY=your_nasa_api_key_here
   PORT=5000
   ```

3. **Build the Docker image**

   ```sh
   docker build -t Nasa_Data_Explorer
 .
   ```

4. **Run the Docker container**

   ```sh
   docker run -p 5000:5000 --env-file backend/.env Nasa_Data_Explorer

   ```

5. **Open your browser**

   - Frontend: [http://localhost:5000](http://localhost:5000)
   - API: [http://localhost:5000/api/nasa/apod](http://localhost:5000/api/nasa/apod)

## Development (without Docker)

1. Install dependencies for both frontend and backend:

   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

2. Start backend:

   ```sh
   npm run dev
   ```

3. Start frontend (in a new terminal):

   ```sh
   cd ../frontend
   npm start
   ```

## Notes

- Do **not** commit your `.env` file or API keys to version control.
- The Docker image builds the frontend and serves it from the backend Express server.

---

**Enjoy exploring NASA data!**
