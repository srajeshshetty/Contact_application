Contact Manager (MERN)

Backend
- cd server
- Create .env with:
  - PORT=5000
  - MONGODB_URI=mongodb://localhost:27017/contact_manager
- npm install
- npm run dev

Frontend
- cd client
- npm install
- npm run dev

Open http://localhost:5173 and ensure API base http://localhost:5000.
🚀 Technologies & Tools
Frontend

React.js → UI framework

React Router → Routing/navigation

Axios / Fetch API → API communication

Bootstrap / TailwindCSS / Material UI → Styling

Backend

Node.js → Runtime

Express.js → Web framework for APIs

MongoDB → Database

Mongoose → ODM (Object Data Modeling) for MongoDB

Other Tools

Git & GitHub → Version control & repo hosting

Postman / Thunder Client → API testing

VS Code → IDE

npm / yarn → Package manager


contact-manager-app/
│── README.md
│── package.json
│── .gitignore
│
├── client/                # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.js
│   │   │   ├── ContactList.js
│   │   │   ├── ContactItem.js
│   │   │   └── SearchBar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── About.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── api.js   # Axios config
│   ├── package.json
│
├── server/                # Node + Express Backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── Contact.js     # Contact schema
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── server.js          # Express app entry point
│   ├── package.json
│
└── docs/                  # Optional docs/screenshots
    ├── screenshots/
    └── API_Documentation.md


⚡ Features to Implement

Add Contact (Form → Save in DB)

View Contacts (List fetched from DB)

Edit Contact (Update existing entry)

Delete Contact

Search Contacts (frontend filter + optional API search)

