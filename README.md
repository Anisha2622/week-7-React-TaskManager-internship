# React Task Master Application 🚀

## Project Overview
The React Task Master is a modern, component-based Task Management application developed to fulfill the "Week 7: Introduction to React.js" curriculum. 

**Goals and Objectives:**
* **Master React Fundamentals:** Build a scalable UI using functional components, JSX syntax, and React Hooks (`useState`, `useEffect`).
* **Implement CRUD Operations:** Allow users to seamlessly Create, Read, Update, and Delete tasks within the virtual DOM.
* **State Persistence:** Utilize the browser's Local Storage to ensure user data survives page reloads.
* **Advanced Features:** Implement dynamic rendering logic including task filtering (All, Active, Completed), complex sorting (Date, Priority), and categorical tagging.

## Setup Instructions
1. **Initialize Project:** Run `npx create-react-app react-task-manager` in your terminal.
2. **Navigate & Install Dependencies:** * `cd react-task-manager`
   * Install Tailwind CSS as per their official Create-React-App guide.
   * Run `npm install lucide-react` (For premium SVG UI icons).
3. **Copy Code Structure:** Create the `src/components/` folder and transfer the provided component code blocks into their respective files. Replace the default `App.js` with the provided code.
4. **Execution:** Run `npm start` to launch the local development server at `http://localhost:3000`.

## Code Structure
The application strictly follows a component-based architecture for maintainability and reusability:
```text
src/
├── App.js                  # Main container, State manager, and LocalStorage controller
├── components/
│   ├── TaskInput.js        # Form component handling task creation, category, and priority assignments
│   ├── TaskList.js         # Mapping component handling filtering and sorting algorithms
│   └── TaskItem.js         # Individual task card handling localized inline-edit state
├── index.js                # React root entry point
└── App.css                 # Global styles and Tailwind directives
