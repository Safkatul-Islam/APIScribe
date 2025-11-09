# APIScribe 🚀

Generate API boilerplate code instantly.

*Hackathon Submission for HACKCC*

**Live Demo URL: `[We will fill this in after Step 3]`**

---

## 💡 The Problem

As a developer, I hate reading 20 pages of API docs just to find the 10 lines of boilerplate I need to make a `fetch` request. Writing the same `cURL` or `fetch` code over and over is a waste of valuable hacking time.

## ✨ The Solution: APIScribe

APIScribe is a developer productivity tool that acts as an "AI-to-Code" generator.

Paste in a simple `cURL` command or a plain-English description (like "a Python request to POST /users") and APIScribe instantly generates the complete, copy-paste-ready code snippets in multiple languages.

### 

---

## 💻 Tech Stack

This project is a full-stack, AI-powered application.

* **Frontend:** React.js
* **Backend:** Spring Boot (Java)
* **The "Brain":** OpenAI API (`gpt-4o`)
* **Deployment:** Frontend on Vercel, Backend on Render.

---

## 🚀 How to Run Locally

This is a monorepo containing both the frontend and backend.

**Prerequisites:**
* Java 17+
* Node.js 18+
* An OpenAI API Key

**1. Backend (Spring Boot):**
```bash
# Navigate to the API directory
cd api

# Set your API key as an environment variable
# (Use 'set' for Windows CMD, '$env:' for PowerShell)
export OPENAI_API_KEY="sk-your-key-here"

# Run the server
./mvnw spring-boot:run
# Server will run on http://localhost:8080

# From a new terminal
cd apiscribe-ui

# Install dependencies
npm install

# Run the app
npm start
# App will run on http://localhost:3000