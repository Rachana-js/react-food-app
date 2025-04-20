# react-food-app

A responsive React-based food ordering application that allows users to browse a food menu, manage a cart, and place orders.

## 🌐 Features
- Fully responsive UI with Material-UI and TailwindCSS
- Firebase integration for backend services
- Redux for state management
- React Router for client-side routing
- Deployed using Docker
- CI/CD with Jenkins and Docker Hub



## 🚀 Technologies Used

- **Frontend:** React, Tailwind CSS, Material UI
- **CI/CD:** Jenkins
- **Containerization:** Docker
- **State Management:** Redux
- **Routing:** React Router DOM
- **Backend:** Firebase (for authentication and database)

## ⚙️ Steps to Run Locally with Docker

1. **Build the Docker Image**
   ```bash
   docker build -t react-food-app .

2.Run the Container
docker run -d -p 3000:80 --name food-app react-food-app

3.Visit the app at: http://localhost:3000 (or your EC2 public IP)

🧪 Jenkins CI/CD Pipeline
Jenkins pulls the code from GitHub
Builds the Docker image
Pushes it to Docker Hub
Triggers container deployment on EC2
