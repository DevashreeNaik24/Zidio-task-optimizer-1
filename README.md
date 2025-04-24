# 🧠 Zidio Task Optimizer - Mood Tracker System

An AI-powered productivity tool developed as part of the Zidio Development Internship by **Group 7**, aimed at enhancing team wellness and individual task efficiency by tracking moods using text, voice, and facial inputs.

---

## 📌 Project Overview

The **Zidio Task Optimizer** is a smart mood tracking web application that uses **Machine Learning**, **Deep Learning**, and **Natural Language Processing (NLP)** to analyze users’ emotional states and suggest productivity tips or tasks accordingly.

This tool combines:
- **Text-based** sentiment analysis
- **Voice-based** emotion recognition using speech-to-text
- **Facial emotion detection** using image processing

All moods are logged and stored in a PostgreSQL database and can be viewed historically. The system also gives recommendations for task types based on the user's mood.

---

## ⚙️ Features

- 🧠 Sentiment detection from text and voice
- 📸 Facial emotion recognition
- 🗂️ Mood history logging
- 📊 Team mood analytics
- ✅ Personalized task recommendations
- 🖥️ React frontend and Flask backend
- 💾 PostgreSQL database integration

---

## 🛠️ Tech Stack

| Area                | Tools / Libraries Used                              |
|---------------------|-----------------------------------------------------|
| Frontend            | React.js                                            |
| Backend             | Flask, Python                                       |
| Machine Learning    | TensorFlow, dlib, NLTK (VADER)                      |
| Speech Recognition  | SpeechRecognition, Google Speech API               |
| Database            | PostgreSQL                                          |
| Others              | Axios, Fetch API, Flask-CORS                        |

---

## 🔍 How It Works

1. **User inputs mood** via text, voice, or facial image.
2. **Backend analyzes emotion** using AI models:
   - `Text`: VADER sentiment analysis
   - `Speech`: Google Speech-to-Text + VADER
   - `Face`: TensorFlow-based emotion recognition
3. **Logs the emotion** with timestamp to PostgreSQL DB.
4. **Recommendations provided** based on emotional state.
5. **Frontend displays** previous moods and analytics.

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DevashreeNaik24/Zidio-task-optimizer-1.git
   cd Zidio-task-optimizer-1
