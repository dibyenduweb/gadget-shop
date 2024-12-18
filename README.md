# Gadget-Shop

Gadget-Shop is a full-stack web application that provides a platform for users to browse, buy, and manage gadgets. It consists of two major components:

- **Client**: The front-end user interface that allows customers to interact with the shop, view gadgets, and place orders.
- **Server**: The back-end API that handles the data processing, user authentication, gadget management, and order processing.

## Project Structure

The project is divided into two main parts:
1. **Client**: Built with HTML, CSS, JavaScript (React.js or Vue.js), and communicates with the server through RESTful API calls.
2. **Server**: Built using Node.js, Express.js, and MongoDB to store user data, gadgets, and orders.

## Features

### Client
- **User Registration and Login**: Allows users to create accounts and log in to the system.
- **Browse Gadgets**: View details of available gadgets, such as prices, descriptions, and images.
- **Add to Cart**: Users can add gadgets to their cart before proceeding to checkout.
- **Checkout and Payment**: Process orders by entering delivery information and making payments via integrated payment gateways.
- **Order History**: Users can view their past orders and track current orders.

### Server
- **User Authentication**: Manages user authentication with JWT (JSON Web Tokens) for secure access.
- **Gadget Management**: Allows adding, updating, and removing gadgets from the inventory.
- **Order Management**: Processes customer orders, updates order status, and manages payment statuses.
- **API Endpoints**: Exposes RESTful API endpoints for client communication, such as:
  - `/api/login`: POST request for user authentication.
  - `/api/gadgets`: GET request for retrieving available gadgets.
  - `/api/cart`: POST/GET request for managing user cart.
  - `/api/order`: POST request for placing an order.

## Technologies Used

### Client
- **React.js** (or Vue.js) for building the user interface.
- **Axios** for making API requests to the server.
- **CSS3** and **Bootstrap** for styling.
- **Redux** (optional) for state management.

### Server
- **Node.js** for the runtime environment.
- **Express.js** for building RESTful API services.
- **MongoDB** for the database.
- **JWT** for user authentication and authorization.

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/gadget-shop.git
cd gadget-shop
