# MindTrack [MindTrack](https://deenaapawaskar.github.io/MindTrack/)



MindTrack is an AI-powered web app that analyzes 10 key learning traits to predict student performance as “Good” or “Can Improve.” It provides personalized study tips, interactive visualizations, and a teacher dashboard for class insights—all running client-side for privacy and instant feedback.

# Student Performance Analyzer

## Overview
The **Student Performance Analyzer** is a web-based educational analytics tool that predicts student academic performance using a single-layer perceptron machine learning model trained on learning behavior traits. It provides personalized recommendations based on 10 critical learning features, helping students understand their strengths and areas for improvement while enabling teachers to gain class-wide insights.

---

## Features

- **Input Form**: Interactive sliders for 10 learning traits (growth mindset, spaced practice, engagement, etc.).
- **Real-Time Prediction**: Predicts student performance as *Good Performance* or *Can Improve* based on perceptron output.
- **Personalized Recommendations**: Actionable tips tailored to specific trait scores.
- **Visualizations**: Radar charts comparing current vs ideal profiles, feature importance bar charts, and performance gauge.
- **Teacher Dashboard**: Upload CSV files for batch analysis, class statistics, risk identification, and export functionality.
- **Client-Side Processing**: All calculations and ML predictions happen in the browser—no server needed.
- **Responsive UI**: Designed with modern CSS, optimized for desktop and mobile.

---

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Visualization:** Chart.js
- **Machine Learning:** Single-layer Perceptron model implemented in JavaScript
- **Deployment:** Suitable for static hosting platforms (GitHub Pages, Netlify, Vercel)

---

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend or server required

### How to Run
1. Clone or download the repository.
2. Open `index.html` in your preferred web browser.
3. Use the input sliders to enter learning trait scores for a student.
4. Click **Analyze Performance** to view predictions, visualizations, and personalized tips.
5. For teacher mode, upload a CSV file with multiple students to perform batch analysis.

---

## CSV Format for Teacher Dashboard

The CSV file should have a header row with the student name followed by 10 numeric trait scores (0 to 10):


---

## Project Structure

- `index.html`: Main HTML page with UI structure
- `style.css`: Styling and responsive layout
- `app.js`: JavaScript for perceptron prediction, visualization, UI interactions, and data processing
- `student_performance_data_csv.csv`: Sample dataset used for training the perceptron model

---

## Model Details

- Single-layer perceptron trained on 160 samples
- Achieves approximately 81.25% accuracy on train and test sets
- Uses 10 standardized learning traits as features
- Weights embedded in JavaScript for real-time client-side prediction

---

## Future Enhancements

- Implement advanced ML models (ensemble, neural networks)
- Add longitudinal progress tracking for students
- Introduce gamification elements to encourage learning
- Develop native mobile applications for iOS and Android
- Integrate with LMS platforms for seamless use in educational institutions

---

## Acknowledgements

This project is inspired by research in educational data mining, metacognition in learning, and interpretable machine learning applications for education.

---

## License

This project is open-source and available under the MIT License.

---


- Name: Deenaa Pawaskar 
- Email: deenaapawaskarofficial@gmail.com

