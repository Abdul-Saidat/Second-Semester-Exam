# Todo-App
This is a simple Todo-app built with react and vite
## Key Features
- Filter Todos by title
- Filter by completed
- Paginated Navigation for better User Experience
- Ability to view individual todo details and navigate back to the main page
- Simple and accessible UI
- Mobile Responsiveness

## Setup
### Repo / Project Setup
- Create a repo on Github
- Clone the repo
### To initialize a new npm project
  ```bash
npm init
npm install react react-dom
npm install -D vite @vitejs/plugin-react
Create necessary files, create a src folder, create a vite.config.js file, setup package.json file
npm run dev
```
### Routing
Install tanstack router
```bash
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```
Configure the Vite Plugin and create necessary files
For detailed setup and usage, checkout [Tanstack Router Documentation](https://tanstack.com/router/latest/docs/framework/react/quick-start)


### Styling using [daisyui](https://daisyui.com/) and [tailwindcss](https://tailwindcss.com/)
To install Tailwindcss and daisyUi in a React project:
```bash
npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest
```
Add Tailwind CSS to Vite config
Put Tailwind CSS and daisyUI in your CSS file (and remove old styles)
### Available Scripts
- `npm run dev` - Starts the deployment server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESNLint to analyze code for errors and
- `npm run preview` - Previews the production built locally

### Tech Stack and Architectural decisions
- React + Vite - Best I have used so far
- Tailwind CSS + DaisyUI - Easy to comprehend and understand, provides reusable components
- Tanstack Router - A modern and scalable router for React and solid applications
- Tanstack query - Provides a way to declaratively fetch, cache, and manage data from APIs,
 eliminating the need for manual useEffect and complex logic for handling these operations 
- LocalStorage - Enables client-side data persistence for saving and retrieving user data 

### API Documentation and Usage
Made use of [JSONPlaceholder](jsonplaceholder.typicode.com) using Tanstack query (useQuery)
Endpoints used are: /todos (Fetches a list of todos) and /todos/:id (Fetches the details of a single todo)
Returned a list of todos which was displayed using pagination
### Key Features
![Home Page](./src/assets/Screenshot%202025-06-15%20095116.png)
![Detail Page](./src/assets/Screenshot%202025-06-15%20095413.png)

### Limitations
- I was unable to include the bonus features even though I desperately wanted to do so.
- UI isn't as amazing as I wanted it to be

  ### Future improvements
  - Implement CRUD operations and more functionalities
    # Thank You!!!!  ❤️❤️

