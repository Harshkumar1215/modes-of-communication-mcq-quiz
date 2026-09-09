# Modes of Communication — Interactive MCQ Quiz Application

An interactive, responsive, and modern Web MCQ Practice and Assessment platform covering the fundamental concepts of **Modes of Communication in Computer Networks and Data Communication**: **Simplex**, **Half-Duplex**, and **Full-Duplex**.

---

## 🚀 Features

- **50 Comprehensive MCQs**: Carefully curated questions covering theoretical definitions, hardware/channel directionality, real-world examples, comparative scenarios, and edge cases.
- **Adaptive Split-Layout for Landscape Mode**:
  - **Left Side**: Question prompt and multiple-choice options.
  - **Right Side**: Instant answer reveal & detailed concept explanations.
- **Quick Concept Guide / Cheatsheet**: Expandable reference card at the top for quick revision of Simplex, Half-Duplex, and Full-Duplex modes before starting the quiz.
- **Interactive Question Palette (1–50)**: Visual navigation drawer to instantly jump between questions, with color indicators for current, answered, and unanswered states.
- **Real-Time Progress Tracking**: Dynamic progress bar, percentage counter, and answered-question indicators.
- **Immediate Feedback Mode**: Check correct answers with in-depth conceptual explanations at any time during practice.
- **End-of-Quiz Performance Analytics**:
  - Score summary with percentage calculation.
  - Categorized breakdown: Correct, Wrong, and Unanswered counts.
  - Performance tier badge (Mastery, Good, Needs Revision, Practice).
- **Comprehensive Review Mode**: Filterable review list to inspect all answers, your selections, correct answers, and full explanations.
- **Fully Responsive Design**: Optimized for mobile portrait, mobile landscape, tablets, and desktop devices.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic markup, accessible attributes (`aria-labels`, `roles`).
- **CSS3**: Modern CSS Variables, CSS Grid, Flexbox, smooth transitions, and responsive media queries.
- **JavaScript (ES6+)**: Pure vanilla JS for state management, question rendering, scoring, and event handling (zero external libraries/frameworks required).

---

## 📂 Project Structure

```
mcq-prac/
├── index.html        # Main HTML layout, header, quiz view, results & modals
├── styles.css        # Clean, modern styling & responsive split layout
├── app.js            # Quiz engine, timer/progress, state, scoring & review logic
├── questions.js      # 50 MCQ questions with options, answers & detailed explanations
└── README.md         # Project documentation
```

---

## 📖 Topics Covered

1. **Simplex Mode (Unidirectional)**:
   - One-way transmission (Sender $\rightarrow$ Receiver).
   - Entire channel bandwidth dedicated to one direction.
   - Examples: Keyboard to CPU, Monitor/Display, TV Broadcast, FM/AM Radio.

2. **Half-Duplex Mode (Bidirectional taking turns)**:
   - Two-way transmission, but only one party transmits at a time.
   - Direction alternates; collision handling required in shared media.
   - Example: Walkie-Talkie.

3. **Full-Duplex Mode (Simultaneous Bidirectional)**:
   - Two-way simultaneous transmission.
   - Both parties can transmit and receive at the same time.
   - Channel capacity divided or separate physical transmission lines used.
   - Examples: Telephone conversations, Video calls, Modern Ethernet networks.

---

## 💻 How to Run Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/Harshkumar1215/modes-of-communication-mcq-quiz.git
   ```
2. Navigate to the project directory:
   ```bash
   cd modes-of-communication-mcq-quiz
   ```
3. Open `index.html` in any modern web browser (Double-click `index.html` or use VS Code Live Server).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
