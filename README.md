# PC Builder API 🖥️

A REST API for creating custom PC builds and checking hardware compatibility.

I started this project to practice backend development while working on something I enjoy: computers and PC building. I wanted to go beyond a basic CRUD API and add some real compatibility logic.

## Features

- CRUD operations for CPUs, motherboards, RAM, GPUs, cases, PSUs, and builds.
- Create and manage custom PC builds.
- Check component compatibility based on sockets, memory types, dimensions, and power requirements.
- Get feedback explaining why components are incompatible.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB Atlas
- Mongoose

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/CatarinaLFonseca/pc-builder-api.git
cd pc-builder-api
npm install
```

Create a `.env` file with your MongoDB connection string:

```env
STRING_CONEXAO_BD=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

## What's Next?

I'm planning to build a frontend using **Vue.js**, making it easier to select components, create builds, and check compatibility through a visual interface.

This is an ongoing personal project, and I'll keep improving it as I learn and explore new ideas.
