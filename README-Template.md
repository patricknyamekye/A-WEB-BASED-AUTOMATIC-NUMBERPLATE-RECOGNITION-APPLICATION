

# ANPR Web-Based Mobile Application

## Abstract

This research project addresses the growing problem of fake license plates in Ghana, posing significant challenges to law enforcement, public safety, and regulatory compliance. The aim is to develop a web-based mobile application using Automatic Number Plate Recognition (ANPR) technology to detect and verify vehicle license plates in real-time. The system leverages the latest imaging and recognition technologies, coupled with a comprehensive database of all registered vehicles, allowing law enforcement officers to automatically identify and flag suspicious plates. The application is built using JavaScript frameworks React.js for the front end and Node.js for the back end, with MySQL for data management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Real-time detection and verification of vehicle license plates using ANPR technology
- Comprehensive database integration for all registered vehicles
- Automatic identification and flagging of suspicious plates for law enforcement
- User-friendly interface for easy use by police officers and regulatory bodies

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MySQL (using XAMPP for local development)
- **ANPR Technology**: Advanced imaging and recognition tools

## System Architecture

The application follows the System Development Life Cycle (SDLC) using the Waterfall model, ensuring a structured and detailed development process.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (and npm) - [Download and install from here](https://nodejs.org/)
2. **XAMPP** - To run MySQL locally. [Download and install from here](https://www.apachefriends.org/index.html)

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/patricknyamekye/Final-Year-Project-Group-17.git
   ```

2. **Navigate to the project directory**:

   ```
   cd A-WEB-BASED-AUTOMATIC-NUMBERPLATE-RECOGNITION-APPLICATION
   npm install
   ```

3. **Install Node.js packages for the front end**:

   Navigate to the frontend directory and install the required packages.

   ```
   cd A-WEB-BASED-AUTOMATIC-NUMBERPLATE-RECOGNITION-APPLICATION
   npm install
   ```

4. **Install Node.js packages for the back end**:

   Navigate to the backend directory and install the required packages.

   ```
   cd backend
   npm install
   ```

5. **Set up MySQL using XAMPP**:

   - Start XAMPP and activate the MySQL and Apache modules.
   - Open PHPMyAdmin and create a new database named `numberplate`.
   - Import the SQL schema and initial data  to set up your database.

### Running the Application

#### Run the Frontend

1. Open a terminal or command prompt.
2. Navigate to the frontend directory if you’re not already there.

   ```
   cd A-WEB-BASED-AUTOMATIC-NUMBERPLATE-RECOGNITION-APPLICATION
   ```

3. Start the frontend development server:

   ``
   npm start
   ```

   This command will run the frontend on.

#### Run the Backend

1. Open another terminal or command prompt.
2. Navigate to the backend directory.

   ```
   cd backend
   ```

3. Start the backend server:

   ```
   npm start
   ```

   This command will run the backend on `http://localhost:5000` (or another port specified in your environment configuration).



## Contact


Project Link: [https://github.com/yourusername/anpr-app](https://github.com/yourusername/anpr-app)

---

Feel free to adjust the content to better match your specific project details or add more sections as needed. Let me know if there's anything else you'd like to include!