/**
 * Typing Speed Test Application
 * A simple web application to test typing speed and accuracy
 */

/**
 * Predefined text prompts for the typing test
 * @type {string[]}
 */
const texts = [
    "The quick brown fox jumps over the lazy dog",
    "Programming is the art of telling another human what one wants the computer to do",
    "Vanilla JavaScript projects are great for mastering fundamental web development skills"
];

// Global state variables
let startTime;      // Timestamp when test starts
let timerInterval;  // Interval ID for the timer
let currentText;    // Current text being typed
let countdownInterval; // Interval ID for countdown

// DOM Elements
const startBtn = document.getElementById('start-btn');
const inputField = document.getElementById('input-field');
const promptText = document.getElementById('prompt-text');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const progressBar = document.getElementById('progress-bar');

/**
 * Updates the progress bar based on typing progress
 * @param {number} progress - Progress percentage (0-100)
 */
function updateProgress(progress) {
    progressBar.style.width = `${progress}%`;
}

/**
 * Starts a countdown before beginning the test
 * @param {number} seconds - Number of seconds to count down from
 */
function startCountdown(seconds) {
    startBtn.disabled = true;
    let remaining = seconds;
    
    countdownInterval = setInterval(() => {
        if (remaining > 0) {
            startBtn.textContent = `Starting in ${remaining}...`;
            remaining--;
        } else {
            clearInterval(countdownInterval);
            startBtn.textContent = 'Start Test';
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
    
    promptText.innerHTML = promptArray.map((char, index) => {
        if (index >= typedArray.length) return `<span class="neutral">${char}</span>`;
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
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const typedText = inputField.value;
    
    // Calculate accuracy
    const correctChars = [...typedText].filter((char, i) => 
        char === currentText[i]).length;
    const accuracy = ((correctChars / currentText.length) * 100).toFixed(1);
    
    // Calculate WPM (words per minute)
    const words = currentText.split(' ').length;
    const wpm = Math.round((words / timeElapsed) * 60);

    timerEl.textContent = Math.round(timeElapsed);
    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy;
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
            startBtn.textContent = 'Start Test';
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