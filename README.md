# APIScribe 🚀

Generate API boilerplate code instantly from plain English or cURL commands.

**Live Demo URL:** **[https://api-scribe.vercel.app](https://api-scribe.vercel.app)**

*Submission for HackCC by Safkat.*

---

![APIScribe Screenshot](https://i.imgur.com/gA3qj3P.png) 
*(This is a placeholder image. I recommend you replace this URL with a screenshot of your live app!)*

## 💡 The Problem

As developers, we hate reading 20 pages of API docs just to find the 10 lines of boilerplate we need to make a `fetch` request. Writing the same `cURL` or `fetch` code over and over is a waste of valuable time, especially during a hackathon.

## ✨ The Solution: APIScribe

APIScribe is a developer productivity tool that acts as an "AI-to-Code" generator. It's built by a developer, for developers.

Paste in a `cURL` command or a plain-English description (like "a Python request to POST /users"), and APIScribe instantly generates complete, copy-paste-ready code snippets in multiple languages.

### Core Features

* **AI-Powered:** Uses `gpt-4o` to understand natural language and cURL commands.
* **Multi-Language:** Generates code in JavaScript (Fetch & Axios), Java (Spring), and Python (Requests) in convenient tabs.
* **Copy-to-Clipboard:** Instantly copy the exact code you need.
* **Demo Prompts:** "Canned" demo buttons to showcase the app's power immediately.
* **Polished UI:** A slick, responsive, and modern UI built with Tailwind CSS.

---

## 💻 Tech Stack

This project is a full-stack, AI-powered application built with modern, professional tools.

* **Frontend:** **React.js** with **Tailwind CSS**
* **Backend:** **Spring Boot** (Java)
* **The "Brain":** **OpenAI API** (`gpt-4o`)
* **Frontend Deployment:** **Vercel**
* **Backend Deployment:** **Railway**

---

## 🚀 How to Run Locally

This is a monorepo containing both the frontend and backend.

**Prerequisites:**
* Java 17+
* Node.js 18+
* An OpenAI API Key

### 1. Backend (Spring Boot)

```bash
# Navigate to the API directory
cd api

# Set your API key as an environment variable
# (Use 'set' for Windows CMD, '$env:' for PowerShell, 'export' for Mac/Linux)
$env:OPENAI_API_KEY="sk-your-key-here"

# Run the server (using the IDE is recommended)
# Or, from the terminal (use mvnw.cmd on Windows):
./mvnw spring-boot:run

# Server will run on http://localhost:8080

# From a new terminal, navigate to the UI directory
cd apiscribe-ui

# Install dependencies
npm install

# Run the app
npm start

# App will run on http://localhost:3000