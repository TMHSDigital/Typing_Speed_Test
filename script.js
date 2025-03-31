/**
 * Typing Speed Test Application
 * A sleek and modern web application to test typing speed and accuracy
 */

/**
 * Expanded text prompts for the typing test
 * @type {string[]}
 */
const texts = [
    "The quick brown fox jumps over the lazy dog",
    "Programming is the art of telling another human what one wants the computer to do",
    "Vanilla JavaScript projects are great for mastering fundamental web development skills",
    "Design is not just what it looks like and feels like. Design is how it works",
    "The best way to predict the future is to invent it",
    "Simplicity is the ultimate sophistication in both design and functionality",
    "Innovation distinguishes between a leader and a follower in technology",
    "Technology is best when it brings people together rather than separating them",
    "The most powerful person in the world is the storyteller. The storyteller sets the vision",
    "The function of good software is to make the complex appear to be simple"
];

// Global state variables
let startTime;      // Timestamp when test starts
let timerInterval;  // Interval ID for the timer
let currentText;    // Current text being typed
let countdownInterval; // Interval ID for countdown
let isSoundEnabled = true; // Sound control flag

// Audio effects
const soundEffects = {
    start: new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGw5MzEWwAAAAAAAAAAAAAAAAAAAP/jWMQACwAAAAoMYU4WAQFIAkAAABgAAAAA/+NAxAAUad6eAMLMmAj6ADnMAAAm//KGW2d3d3cjIiIzbu78REyZRERERERERERERERERERERETMzMzMzMzMzMzNEREzMzMzMzMzMzMzMzMzMzMzMzIiIzMzMzMzMzMzMzMzMzMzMzP/40LEAwiRnfoAyxyYMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzP/40DEIJW5oAJgPABgzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz/40LEgwAAAf4AAAAgMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//jQsSqAAAAf4AAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="),
    correct: new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGw2zv+vAAAAAAAAAAAAAAAAAAAAP/jWMQACwAAAAoMYU4WAQFIAkAAABgAAAAA/+NAxAAUPWqOAHpGTDwdZqVmRmoQsVIqsLEoERhS6hFKGbT5qEQIZMsTLrMyxBJUQyxBnlLNNKRpJSNO86RpJSNJKRp5SyjTykaSUjTykaSVmZdalZmZmZmZmZmZmZmZ/+NCxAMHiZqEAMMMmJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ/+NC1CEAAAGkAAAAgJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZn/40LEswAAAf4AAAAgmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmf/jQsS7AAAB/gAAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ"),
    finish: new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABAAAASwAQEBAQECAgICAgIBAgICAgICAgMDAwMDAwMBAwMDAwMDAwODg4ODg4OBg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQEDAAAAAAAAAEs1UrqzgAAAAAAAAAAAAAAAAAAAP/jaMQADRAGNCAAAhoSZCQQDgMB/////9sMhgXnBgMQsMDAwBgWE9//41DEAA1iMXYcwlrcPqcz5f/+gGDQKHBof/x+DAwP/h/9//6GD2nBoP/0fB//+jh+B+j8+n/8ED/g9/+/+H5v8Pvf/8P///2f/D8zw/9////+dAwPyQD/B8H5ngYH5IB+T4Pf/+NAxAcM6gF+fGJM3PBgeCB//B4IHvB7///IwOMEIgDnGRkxwAxnS3OCYs1T0JOMCkgFzEWucMpuXERZPQcU2l9KcoC+cAh2Oc454Zyxjitrc8XxKf7Uec3OvN+5NdBVj7z+/+NCxA4L5flOfmJG3GlXlp2aByjyvaXhFOzMJVvVoWVP3LyvZXRMVStnMrKs7TXbK+/Xf9cuWP2dTqdy5c4me1KUpSlN9zd7u7u7zMzMzMkKUpSlN3d3d3dzMzMzMyQpSlKUpSlKVoUD/+NCxBYKQflK3mGG3GlKUpS9KUpSlKUpSlKUpSlKUu7u7u7u7u7ulKUpS7u7u7u7u7u7pSlKXd3d3d3d3d3dKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpv/jQsQjCZH1Pr5hhtxSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpS/+NCxC8JofUy3mCG0lKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpf/40LEVAeh9TKeYIbSUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSl/+NCxGIHkfUwvmCG0lKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpf/jQsSCDMoCEAACIAUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpS"),
    error: new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABAAAASwAQEBAQECAgICAgIBAgICAgICAgMDAwMDAwMBAwMDAwMDAwODg4ODg4OBg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQEDAAAAAAAAAEs1UrqzgAAAAAAAAAAAAAAAAAAAP/jaMQADRAGNCAAAhoSZCQQDgGP/////XFw8EHOHgXnB4H/4MDDA8H///+ZAwMMDzg+D/+NQxAAN2jmAAMvGnf/pggOD/B/8PBAPBA///f/yQDzg/IB/5IMBAT/CQDzg+AeEA/IAPeDzgYH/1H///9R+CAf/pAMED/pf/1HwQD/6j4IHnlT/+D4IHnv///EwcXg4BsMU0EkIoTqAFRf/40DEAQzqAXp8YkzcQIrVQmZG24bQFlXIGqhBZQQABtSoFT25iZJmRRuXEzc6MaNKVz8pMX1McsiPYyD25wFwT1VbK6XNKqzyyTTvxfMvR4o8Ol/OLT1RFQESU51PTlHNSQsylv/jQsQODAH1Nw5hht2bZkxZLF8zZVGUGdSXMWXPCxYszTX6ajFly6ZUqVE2faTZjKlTO3f2ZUpSlKUpSlKdKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpf+NCxBIKifU5PmGG3SlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpP/jQsQkCSn1Mw5hhtxSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKT/40LEPgjCATQAYYzcUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSk/+NCxFIJCfU5PmGG3FKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpP/jQsRnC6IBNABhhNxSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKT/40LEcwAAAf4AAAAgUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSk")
};

// DOM Elements
const startBtn = document.getElementById('start-btn');
const inputField = document.getElementById('input-field');
const promptText = document.getElementById('prompt-text');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const progressBar = document.getElementById('progress-bar');

/**
 * Plays sound effect if sound is enabled
 * @param {string} type - Type of sound to play
 */
function playSound(type) {
    if (isSoundEnabled && soundEffects[type]) {
        soundEffects[type].currentTime = 0;
        soundEffects[type].play().catch(e => console.log("Sound error:", e));
    }
}

/**
 * Updates the progress bar based on typing progress
 * @param {number} progress - Progress percentage (0-100)
 */
function updateProgress(progress) {
    progressBar.style.width = `${progress}%`;
    // Update ARIA value
    document.querySelector('.progress-container').setAttribute('aria-valuenow', Math.round(progress));
}

/**
 * Starts a countdown before beginning the test
 * @param {number} seconds - Number of seconds to count down from
 */
function startCountdown(seconds) {
    startBtn.disabled = true;
    let remaining = seconds;
    
    promptText.innerHTML = `<div class="countdown">${remaining}</div>`;
    playSound('start');
    
    countdownInterval = setInterval(() => {
        if (remaining > 1) {
            remaining--;
            promptText.innerHTML = `<div class="countdown">${remaining}</div>`;
        } else {
            clearInterval(countdownInterval);
            startTest();
        }
    }, 1000);
}

/**
 * Initializes a new typing test
 * - Selects random text from prompts
 * - Resets input field
 * - Starts timer
 * - Enables input field
 */
function startTest() {
    currentText = texts[Math.floor(Math.random() * texts.length)];
    promptText.innerHTML = currentText.split('').map(char => 
        `<span class="neutral">${char}</span>`
    ).join('');
    
    inputField.value = '';
    inputField.disabled = false;
    inputField.focus();
    startBtn.disabled = true;
    startBtn.innerHTML = '<span>In Progress...</span>';
    progressBar.style.width = '0%';
    
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

/**
 * Handles real-time input from the user
 * - Compares typed text with original text
 * - Updates visual feedback
 * - Triggers test completion when text is finished
 */
inputField.addEventListener('input', (e) => {
    const typedArray = e.target.value.split('');
    const promptArray = currentText.split('');
    
    // Check for mistakes to potentially play error sound
    const prevCorrectChars = promptArray.filter((char, i) => {
        return i < typedArray.length - 1 && typedArray[i] === char;
    }).length;
    
    // Update visual feedback
    promptText.innerHTML = promptArray.map((char, index) => {
        if (index >= typedArray.length) return `<span class="neutral">${char}</span>`;
        
        // Play sound on error (but not on every keystroke to avoid sound spam)
        if (index === typedArray.length - 1 && typedArray[index] !== char) {
            playSound('error');
        }
        
        return `<span class="${typedArray[index] === char ? 'correct' : 'incorrect'}">${char}</span>`;
    }).join('');

    // Update progress bar
    const progress = (typedArray.length / promptArray.length) * 100;
    updateProgress(progress);

    if (typedArray.length === promptArray.length) {
        finishTest();
    }
});

/**
 * Completes the typing test
 * - Calculates and displays results
 * - Disables input field
 * - Resets UI state
 */
function finishTest() {
    clearInterval(timerInterval);
    inputField.disabled = true;
    startBtn.disabled = false;
    startBtn.innerHTML = '<span>Start Test</span>';
    playSound('finish');
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const typedText = inputField.value;
    
    // Calculate accuracy
    const correctChars = [...typedText].filter((char, i) => 
        char === currentText[i]).length;
    const accuracy = ((correctChars / currentText.length) * 100).toFixed(1);
    
    // Calculate WPM (words per minute)
    const words = currentText.split(' ').length;
    const wpm = Math.round((words / timeElapsed) * 60);

    // Display results with animation
    animateValue(timerEl, 0, Math.round(timeElapsed), 1000);
    animateValue(wpmEl, 0, wpm, 1000);
    animateValue(accuracyEl, 0, parseFloat(accuracy), 1000);
    
    // Highlight results
    document.querySelectorAll('.result-item').forEach(item => {
        item.classList.add('highlight');
        setTimeout(() => item.classList.remove('highlight'), 2000);
    });
}

/**
 * Animates counting up to a value
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Duration of animation in ms
 */
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Updates the timer display every second
 * Calculates elapsed time since test start
 */
function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = timeElapsed;
}

/**
 * Handles keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyPress(e) {
    // Ctrl/Cmd + Enter to start/restart test
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!inputField.disabled) {
            // If test is in progress, reset it
            clearInterval(timerInterval);
            inputField.value = '';
            inputField.disabled = true;
            startBtn.disabled = false;
            startBtn.innerHTML = '<span>Start Test</span>';
            progressBar.style.width = '0%';
        } else {
            // Start new test
            startCountdown(3);
        }
    }
}

// Initialize the application
startBtn.addEventListener('click', () => startCountdown(3));
document.addEventListener('keydown', handleKeyPress); 