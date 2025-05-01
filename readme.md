# bdfd-getRolePosition

Welcome to the **bdfd-getRolePosition** repository! This project provides an API that simulates the `$getRolePosition` function from the **Bot Desginer for Discord** framework. By using the **Bot Token** and **Server ID**, the API allows you to retrieve the role position of a given user in the specified server.

## Features

- Simulates the `$getRolePosition` function
- Retrieve role position of users based on Bot Token and Server ID

If you want to test the API on your own device follow these steps:
## Prerequisites

Before using the API, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Follow these steps to set up and run the project locally:

### 1. Clone the repository

Open your terminal and run:

```
git clone https://github.com/knaxas/bdfd-getRolePosition.git
```

### 2. Navigate to the project directory

```
cd bdfd-getRolePosition
```

### 3. Install dependencies

Run the following command to install the required dependencies:

```
npm install express cors discord.js
```

### 4. Run the project

To start the server, run:

```
node index.js
```

This will start the backend server. You can now interact with the API at `http://localhost:3000/`.

## API Usage

Once the server is running, you can interact with the API using the following endpoint:

### Get Role Position

```
GET /getRolePosition
```

#### Query Parameters:

- `botToken`: The Bot Token used to authenticate with Discord's API
- `serverId`: The ID of the server where you want to check the role position

#### Example Request:

```
GET http://localhost:3000/getRolePosition?botToken=your-bot-token&serverId=your-server-id
```


If you just want to add the API to your BDFD-Discord Bot then look up my wiki.