// we can write the both frontend and backend execution code in the root  package.json file using the concurrent npm module

//  "scripts": {
    "install":"cd backend && npm i && cd ../frontend/vite-project && npm i",
    "dev:backend":"cd backend && npm run dev", // if you want to run the backend server from the root folder 
    "dev:client":"cd frontend/vite-project && npm run dev", 
    // if you want to run the frontend server from the root server
    "dev":"concurrently \"npm run dev:backend\" \"npm run dev:client\""
    // if you want to run both concurrently
  },