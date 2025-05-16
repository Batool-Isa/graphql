# GraphQL Profile Dashboard

A personal profile dashboard built using **React**, **Bootstrap**, and **GraphQL**. This project connects to the Reboot01 platform's GraphQL API to display user-specific educational data, including XP, progress, and performance metrics. It includes real-time data fetching, secure login with JWT, and interactive SVG-based statistics.

---

## 🚀 Features

- 🔐 JWT authentication using email/username and password  
- 📊 Personalized dashboard showing:
  - XP amount
  - Grades and audit ratios
- 📈 SVG-based statistic graphs:
  - XP earned per project
  - Pass/Fail ratio per exercise
- 🔍 GraphQL queries using:
  - Basic selection
  - Nested objects
  - Filtered arguments
- 💻 Responsive design using Bootstrap  
- 🌐 Hosted online (authentication required)

---

## 🛠 Technologies Used

- React  
- GraphQL  
- Bootstrap  
- SVG  
- JWT Authentication  
- Fetch API  
- Reboot01 GraphQL API  

---

## 📦 Installation

### 1. Clone the repository

```bash
https://github.com/Batool-Isa/graphql.git
cd graphql
```
### 2. Install dependencies
```bash

npm install
```

### 3. Run the development server
```bash
npm start
```

### 4. Open your browser at
```bash
http://localhost:3000
```
## 🔐 Authentication Details

This app connects to the **Reboot01 GraphQL** system:

- **Login Endpoint:**  
  `https://learn.reboot01.com/api/auth/signin`

- **GraphQL Endpoint:**  
  `https://learn.reboot01.com/api/graphql-engine/v1/graphql`

### To access data:

1. Send **Basic Auth credentials** (email or username + password) to get a JWT.  
2. Use the **JWT as a Bearer token** in GraphQL queries.  
3. You’ll only be able to query your own authenticated user data.

---

## 🌍 Live Demo

**GitHub Repository:**  
https://batool-isa.github.io/graphql/

---

## 📚 What I Learned

- Crafting GraphQL queries with filters, nesting, and arguments  
- Handling secure login with JWT in React  
- Creating custom SVG-based charts and graphs  
- Improving UI/UX with clean layout and responsive design  
- Hosting and deploying a React app with login functionality  
