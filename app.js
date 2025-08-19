// Perceptron Model Configuration
const PERCEPTRON_WEIGHTS = {
    bias: 0.2046,
    growth_mindset: 0.3029,
    spaced_practice: 0.3108,
    deep_engagement: 0.8626,
    self_monitoring: 0.1701,
    balanced_thinking: -1.0493,
    fixed_mindset: 0.2231,
    passive_learning: 0.4023,
    procrastination: 0.1516,
    avoid_struggle: -0.5896,
    low_metacognition: -0.6313
};


// Learning Traits Configuration
const LEARNING_TRAITS = {
    growth_mindset: {
        label: "Growth Mindset 🧠",
        positive: true,
        ideal: 8,
        tips: ["Practice saying 'I can't do this YET' ✨", "Focus on effort over outcomes 💪", "Learn about neuroplasticity 🧠"]
    },
    spaced_practice: {
        label: "Spaced Practice ⏳", 
        positive: true,
        ideal: 8,
        tips: ["Use spaced repetition apps 📱", "Schedule review sessions 📅", "Avoid last-minute cramming 🕰️"]
    },
    deep_engagement: {
        label: "Deep Engagement 🔥",
        positive: true,
        ideal: 8,
        tips: ["Use active reading techniques 📖", "Ask questions during class ❓", "Connect new info to prior knowledge 🔗"]
    },
    self_monitoring: {
        label: "Self-Monitoring 🔍",
        positive: true,
        ideal: 8,
        tips: ["Keep a learning journal 📔", "Set specific goals 🎯", "Use self-assessment rubrics 📊"]
    },
    balanced_thinking: {
        label: "Balanced Thinking ⚖️",
        positive: true,
        ideal: 8,
        tips: ["Take breaks between study sessions ☕", "Alternate focused and relaxed activities 🧘‍♂️", "Practice mindfulness 🧘‍♀️"]
    },
    fixed_mindset: {
        label: "Fixed Mindset 🪨",
        positive: false,
        ideal: 2,
        tips: ["Challenge limiting beliefs 🚧", "Celebrate progress over perfection 🎉", "Embrace challenges as learning opportunities 💡"]
    },
    passive_learning: {
        label: "Passive Learning 🪑",
        positive: false,
        ideal: 2,
        tips: ["Replace highlighting with note-taking ✍️", "Test yourself frequently 🧪", "Teach concepts to others 👥"]
    },
    procrastination: {
        label: "Procrastination 🕑",
        positive: false,
        ideal: 2,
        tips: ["🍅 Try the Pomodoro Technique: 25 minutes focused study, 5 minute breaks", "📝 Break large assignments into smaller, manageable tasks", "📅 Use calendar apps to set realistic deadlines and reminders", "🎯 Start with the most challenging task when your energy is highest"]
    },
    avoid_struggle: {
        label: "Avoid Struggle 🏃‍♂️",
        positive: false,
        ideal: 2,
        tips: ["View challenges as growth opportunities 🌱", "Practice persistence 💪", "Seek help when stuck 🤝"]
    },
    low_metacognition: {
        label: "Low Metacognition 💡",
        positive: false,
        ideal: 2,
        tips: ["Reflect on learning strategies 🤔", "Think about thinking 🧠", "Monitor comprehension actively 👀"]
    }
};


// Sample student data
const SAMPLE_STUDENTS = [
    {name: "Alex Johnson", scores: [7, 6, 8, 5, 7, 3, 4, 6, 3, 4]},
    {name: "Maria Garcia", scores: [8, 7, 9, 8, 6, 2, 3, 4, 2, 3]},
    {name: "Chris Brown", scores: [5, 4, 6, 4, 5, 6, 7, 8, 6, 7]},
    {name: "Taylor Wilson", scores: [9, 8, 8, 7, 8, 2, 2, 3, 2, 2]},
    {name: "Jordan Lee", scores: [6, 5, 7, 6, 6, 4, 5, 5, 4, 5]},
    {name: "Sam Carter", scores: [8, 9, 7, 8, 7, 3, 2, 4, 3, 2]}
];


// Global variables
let studentData = [];
let currentCharts = {};


// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    initializeTabNavigation();
    initializeSliders();
    initializeEventListeners();
});


// Initialize tab navigation - Fixed version
function initializeTabNavigation() {
    console.log('Initializing tab navigation...');
    
    document.addEventListener('click', function(event) {
        // Check if clicked element is a nav tab
        if (event.target.classList.contains('nav-tab')) {
            event.preventDefault();
            event.stopPropagation();
            
            const targetTab = event.target.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            if (targetTab) {
                switchTab(targetTab);
            }
        }
    });
    
    // Initialize with student tab active
    switchTab('student');
}


// Switch between tabs - Improved version
function switchTab(targetTab) {
    console.log('Switching to tab:', targetTab);
    
    // Update nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === targetTab) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${targetTab}-tab`) {
            content.classList.add('active');
            content.style.display = 'block';
        } else {
            content.classList.remove('active');
            content.style.display = 'none';
        }
    });
    
    console.log('Tab switch completed for:', targetTab);
}


// Initialize slider interactions
function initializeSliders() {
    const sliders = document.querySelectorAll('.trait-slider');
    sliders.forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        
        // Update display value
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
        
        // Initialize display
        valueDisplay.textContent = slider.value;
    });
}


// Initialize event listeners
function initializeEventListeners() {
    // Student form submission
    const studentForm = document.getElementById('student-form');
    if (studentForm) {
        studentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleStudentSubmission(event);
        });
    }
    
    // Teacher dashboard actions
    const loadSampleData = document.getElementById('load-sample-data');
    if (loadSampleData) {
        loadSampleData.addEventListener('click', function(event) {
            event.preventDefault();
            loadSampleClassData();
        });
    }
    
    const csvUpload = document.getElementById('csv-upload');
    if (csvUpload) {
        csvUpload.addEventListener('change', handleCSVUpload);
    }
    
    const exportResults = document.getElementById('export-results');
    if (exportResults) {
        exportResults.addEventListener('click', function(event) {
            event.preventDefault();
            exportClassResults();
        });
    }
}


// Handle student form submission
function handleStudentSubmission(event) {
    event.preventDefault();
    console.log('Form submitted');
    
    const formData = collectFormData();
    const prediction = predictPerformance(formData.scores);
    
    displayResults(formData, prediction);
    createVisualizations(formData, prediction);
    generateRecommendations(formData);
    
    // Scroll to results
    const results = document.getElementById('results');
    if (results) {
        results.scrollIntoView({ behavior: 'smooth' });
    }
}


// Collect form data
function collectFormData() {
    const studentName = document.getElementById('student-name');
    const name = studentName ? studentName.value.trim() || 'Student' : 'Student';
    const scores = [];
    const traits = Object.keys(LEARNING_TRAITS);
    
    traits.forEach(trait => {
        const slider = document.getElementById(trait);
        if (slider) {
            scores.push(parseInt(slider.value));
        } else {
            scores.push(5); // Default value if slider not found
        }
    });
    
    return { name, scores, traits };
}


// Perceptron prediction function
function predictPerformance(scores) {
    // Standardize scores (simple normalization to approximate the original scaling)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance) || 1; // Avoid division by zero
    
    const standardizedScores = scores.map(score => (score - mean) / stdDev);
    
    // Calculate net input using perceptron weights
    let net = PERCEPTRON_WEIGHTS.bias;
    const traits = Object.keys(LEARNING_TRAITS);
    
    traits.forEach((trait, index) => {
        net += standardizedScores[index] * PERCEPTRON_WEIGHTS[trait];
    });
    
    // Make prediction
    const prediction = net >= 0 ? 'Good Performance ✅' : 'Can Improve ⚠️';
    const confidence = Math.abs(net);
    
    return {
        prediction,
        net,
        confidence: confidence.toFixed(3),
        isGood: net >= 0
    };
}


// Display prediction results
function displayResults(formData, prediction) {
    const results = document.getElementById('results');
    const predictionIcon = document.getElementById('prediction-icon');
    const predictionText = document.getElementById('prediction-text');
    const predictionSubtitle = document.getElementById('prediction-subtitle');
    const confidenceValue = document.getElementById('confidence-value');
    
    if (results) {
        results.classList.remove('hidden');
    }
    
    // Update prediction display
    if (predictionIcon) {
        predictionIcon.textContent = prediction.isGood ? '🎉' : '⚠️';
    }
    
    if (predictionText) {
        predictionText.textContent = prediction.prediction;
    }
    
    if (predictionSubtitle) {
        predictionSubtitle.textContent = prediction.isGood 
            ? `Great job, ${formData.name}! Keep up the excellent learning habits. 🌟`
            : `${formData.name}, there's room for improvement with some focused changes. 💡`;
    }
    
    if (confidenceValue) {
        confidenceValue.textContent = prediction.confidence;
    }
    
    // Update result card styling
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.classList.toggle('can-improve', !prediction.isGood);
    }
}


// Create visualizations
function createVisualizations(formData, prediction) {
    createRadarChart(formData);
    createImportanceChart();
    createGaugeChart(prediction);
}


// Create radar chart showing current vs ideal profile
function createRadarChart(formData) {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart
    if (currentCharts.radar) {
        currentCharts.radar.destroy();
    }
    
    const traits = Object.keys(LEARNING_TRAITS);
    const labels = traits.map(trait => LEARNING_TRAITS[trait].label);
    const currentScores = formData.scores;
    const idealScores = traits.map(trait => LEARNING_TRAITS[trait].ideal);
    
    currentCharts.radar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Current Profile',
                data: currentScores,
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#1FB8CD'
            }, {
                label: 'Ideal Profile',
                data: idealScores,
                borderColor: '#51cf66',
                backgroundColor: 'rgba(81, 207, 102, 0.1)',
                pointBackgroundColor: '#51cf66',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#51cf66'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}


// Create feature importance chart
function createImportanceChart() {
    const canvas = document.getElementById('importanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (currentCharts.importance) {
        currentCharts.importance.destroy();
    }
    
    const traits = Object.keys(LEARNING_TRAITS);
    const labels = traits.map(trait => LEARNING_TRAITS[trait].label);
    const weights = traits.map(trait => Math.abs(PERCEPTRON_WEIGHTS[trait]));
    const colors = traits.map(trait => PERCEPTRON_WEIGHTS[trait] > 0 ? '#51cf66' : '#ff6b6b');
    
    currentCharts.importance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Feature Importance',
                data: weights,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Importance (Absolute Weight)'
                    }
                }
            }
        }
    });
}


// Create gauge chart for overall performance
function createGaugeChart(prediction) {
    const canvas = document.getElementById('gaugeChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (currentCharts.gauge) {
        currentCharts.gauge.destroy();
    }
    
    // Convert net score to percentage for gauge
    const score = Math.max(0, Math.min(100, (prediction.net + 2) * 25)); // Scale to 0-100
    
    currentCharts.gauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [score, 100 - score],
                backgroundColor: [
                    prediction.isGood ? '#51cf66' : '#ffa94d',
                    '#e9ecef'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        },
        plugins: [{
            afterDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                
                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = prediction.isGood ? '#51cf66' : '#ffa94d';
                
                const text = Math.round(score) + '%';
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 1.4;
                
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}


// Generate personalized recommendations
function generateRecommendations(formData) {
    const recommendations = [];
    const traits = Object.keys(LEARNING_TRAITS);
    
    traits.forEach((trait, index) => {
        const score = formData.scores[index];
        const traitConfig = LEARNING_TRAITS[trait];
        
        // Determine if trait needs improvement
        let needsImprovement = false;
        if (traitConfig.positive && score < 6) {
            needsImprovement = true;
        } else if (!traitConfig.positive && score > 5) {
            needsImprovement = true;
        }
        
        if (needsImprovement) {
            recommendations.push({
                trait: traitConfig.label,
                tips: traitConfig.tips,
                score: score,
                icon: getTraitIcon(trait)
            });
        }
    });
    
    displayRecommendations(recommendations);
}


// Get icon for trait
function getTraitIcon(trait) {
    const icons = {
        growth_mindset: '🧠',
        spaced_practice: '⏳',
        deep_engagement: '🔥',
        self_monitoring: '🔍',
        balanced_thinking: '⚖️',
        fixed_mindset: '🪨',
        passive_learning: '🪑',
        procrastination: '🕑',
        avoid_struggle: '🏃‍♂️',
        low_metacognition: '💡'
    };
    return icons[trait] || '❓';
}


// Display recommendations
function displayRecommendations(recommendations) {
    const recommendationsContent = document.getElementById('recommendations-content');
    if (!recommendationsContent) return;
    
    if (recommendations.length === 0) {
        recommendationsContent.innerHTML = `
            <div class="recommendation-category">
                <h4>🌟 Excellent Learning Profile!</h4>
                <p>Your learning habits are well-balanced. Keep up the great work and continue to:</p>
                <ul class="recommendation-list">
                    <li>Maintain your current learning strategies</li>
                    <li>Set new challenging goals to continue growing</li>
                    <li>Help peers who might be struggling</li>
                    <li>Explore advanced learning techniques</li>
                </ul>
            </div>
        `;
        return;
    }
    
    let html = '<h4>🔥 Areas for Improvement</h4>';
    
    recommendations.forEach(rec => {
        html += `
            <div class="recommendation-category">
                <h4>${rec.icon} ${rec.trait} (Current: ${rec.score}/10)</h4>
                <ul class="recommendation-list">
                    ${rec.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    recommendationsContent.innerHTML = html;
}


// Load sample class data
function loadSampleClassData() {
    studentData = SAMPLE_STUDENTS.map(student => {
        const prediction = predictPerformance(student.scores);
        return {
            ...student,
            prediction: prediction.prediction,
            confidence: prediction.confidence,
            net: prediction.net,
            isGood: prediction.isGood
        };
    });
    
    displayClassStatistics();
    createClassCharts();
    displayStudentList();
    
    const classStats = document.getElementById('class-stats');
    if (classStats) {
        classStats.classList.remove('hidden');
    }
}


// Handle CSV upload
function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csv = e.target.result;
            const lines = csv.split('\n').filter(line => line.trim());
            
            // Skip header row
            const dataLines = lines.slice(1);
            
            studentData = dataLines.map(line => {
                const values = line.split(',').map(v => v.trim());
                const name = values[0] || 'Unknown Student';
                const scores = values.slice(1, 11).map(v => parseInt(v) || 0);
                
                if (scores.length !== 10) {
                    throw new Error('Each student must have exactly 10 trait scores');
                }
                
                const prediction = predictPerformance(scores);
                return {
                    name,
                    scores,
                    prediction: prediction.prediction,
                    confidence: prediction.confidence,
                    net: prediction.net,
                    isGood: prediction.isGood
                };
            });
            
            displayClassStatistics();
            createClassCharts();
            displayStudentList();
            
            const classStats = document.getElementById('class-stats');
            if (classStats) {
                classStats.classList.remove('hidden');
            }
            
        } catch (error) {
            alert('Error parsing CSV file: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}


// Display class statistics
function displayClassStatistics() {
    const total = studentData.length;
    const goodPerformance = studentData.filter(s => s.isGood).length;
    const canImprove = total - goodPerformance;
    const average = Math.round((goodPerformance / total) * 100);
    
    const totalStudentsEl = document.getElementById('total-students');
    const goodPerformanceEl = document.getElementById('good-performance');
    const canImproveEl = document.getElementById('can-improve');
    const classAverageEl = document.getElementById('class-average');
    
    if (totalStudentsEl) totalStudentsEl.textContent = total;
    if (goodPerformanceEl) goodPerformanceEl.textContent = goodPerformance;
    if (canImproveEl) canImproveEl.textContent = canImprove;
    if (classAverageEl) classAverageEl.textContent = average + '%';
}


// Create class-level charts
function createClassCharts() {
    createClassDistributionChart();
    createClassAveragesChart();
}


// Create class performance distribution chart
function createClassDistributionChart() {
    const canvas = document.getElementById('classDistributionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (currentCharts.classDistribution) {
        currentCharts.classDistribution.destroy();
    }
    
    const goodCount = studentData.filter(s => s.isGood).length;
    const improveCount = studentData.length - goodCount;
    
    currentCharts.classDistribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Good Performance ✅', 'Can Improve ⚠️'],
            datasets: [{
                data: [goodCount, improveCount],
                backgroundColor: ['#51cf66', '#ffa94d'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}


// Create class averages chart
function createClassAveragesChart() {
    const canvas = document.getElementById('classAveragesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (currentCharts.classAverages) {
        currentCharts.classAverages.destroy();
    }
    
    const traits = Object.keys(LEARNING_TRAITS);
    const labels = traits.map(trait => LEARNING_TRAITS[trait].label);
    
    // Calculate average scores for each trait
    const averages = traits.map((trait, index) => {
        const sum = studentData.reduce((total, student) => total + student.scores[index], 0);
        return (sum / studentData.length).toFixed(1);
    });
    
    const idealScores = traits.map(trait => LEARNING_TRAITS[trait].ideal);
    
    currentCharts.classAverages = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Class Average 📊',
                data: averages,
                backgroundColor: '#1FB8CD',
                borderColor: '#1FB8CD',
                borderWidth: 1
            }, {
                label: 'Ideal Score 🌟',
                data: idealScores,
                backgroundColor: '#51cf66',
                borderColor: '#51cf66',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}


// Display student list
function displayStudentList() {
    const listContainer = document.getElementById('student-list');
    if (!listContainer) return;
    
    if (studentData.length === 0) {
        listContainer.innerHTML = '<p>No student data available.</p>';
        return;
    }
    
    const html = studentData.map(student => `
        <div class="student-item">
            <span class="student-name">${student.name}</span>
            <span class="student-prediction ${student.isGood ? 'good' : 'improve'}">
                ${student.prediction}
            </span>
            <span class="student-score">Score: ${student.confidence}</span>
        </div>
    `).join('');
    
    listContainer.innerHTML = html;
}


// Export class results
function exportClassResults() {
    if (studentData.length === 0) {
        alert('No data to export');
        return;
    }
    
    const traits = Object.keys(LEARNING_TRAITS);
    const headers = ['Name', ...traits.map(t => LEARNING_TRAITS[t].label), 'Prediction', 'Confidence Score'];
    
    let csv = headers.join(',') + '\n';
    
    studentData.forEach(student => {
        const row = [
            student.name,
            ...student.scores,
            student.prediction,
            student.confidence
        ];
        csv += row.join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `class_performance_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
