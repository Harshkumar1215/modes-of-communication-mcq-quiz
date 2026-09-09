/**
 * Modes of Communication - Interactive MCQ Quiz Application
 * Handles state, rendering, navigation, scoring, explanations, and review.
 */

document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_QUESTIONS = questionsData.length; // 50
  
  // App State
  let currentIndex = 0;
  const userAnswers = new Array(TOTAL_QUESTIONS).fill(null);
  const answerRevealed = new Array(TOTAL_QUESTIONS).fill(false);
  let isSubmitted = false;

  // DOM Elements
  const quizActiveView = document.getElementById('quizActiveView');
  const resultsContainer = document.getElementById('resultsContainer');
  const quickGuideCard = document.getElementById('quickGuideCard');
  const toggleGuideBtn = document.getElementById('toggleGuideBtn');
  const questionPalette = document.getElementById('questionPalette');
  const togglePaletteBtn = document.getElementById('togglePaletteBtn');
  const paletteGrid = document.getElementById('paletteGrid');

  // Progress Bar & Counter
  const questionCounter = document.getElementById('questionCounter');
  const progressPercentage = document.getElementById('progressPercentage');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressBarAria = document.getElementById('progressBarAria');
  const answeredStats = document.getElementById('answeredStats');

  // Question Card Elements
  const cardCategory = document.getElementById('cardCategory');
  const cardQuestionNumber = document.getElementById('cardQuestionNumber');
  const cardQuestionText = document.getElementById('cardQuestionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const showAnswerBtn = document.getElementById('showAnswerBtn');
  const showAnswerBtnText = document.getElementById('showAnswerBtnText');
  const explanationContainer = document.getElementById('explanationContainer');
  const correctAnswerLabel = document.getElementById('correctAnswerLabel');
  const explanationText = document.getElementById('explanationText');

  // 10-Second Timer Elements & State
  const questionTimer = document.getElementById('questionTimer');
  const timerSeconds = document.getElementById('timerSeconds');
  const timerProgressCircle = document.getElementById('timerProgressCircle');
  const timerStatusText = document.getElementById('timerStatusText');
  const toggleSoundBtn = document.getElementById('toggleSoundBtn');
  const soundIconOn = document.getElementById('soundIconOn');
  const soundIconOff = document.getElementById('soundIconOff');

  let timerInterval = null;
  let timerSecondsLeft = 10;
  let timerActiveQuestionIndex = -1;
  let soundEnabled = true;
  let audioCtx = null;
  const TOTAL_TIMER_SECONDS = 10;
  const CIRCLE_CIRCUMFERENCE = 263.89; // 2 * Math.PI * 42

  // Web Audio Context initialization
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play crisp mechanical clock tick
  function playTickSound(isUrgent = false) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const freq = isUrgent ? 850 : 600;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.045);
    } catch (e) {
      // Audio autoplay handled gracefully
    }
  }

  // Play gentle chime on time up
  function playTimesUpSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      // Graceful fallback
    }
  }

  // Sound toggle button listener
  if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        if (soundIconOn) soundIconOn.style.display = 'block';
        if (soundIconOff) soundIconOff.style.display = 'none';
        toggleSoundBtn.classList.remove('muted');
        toggleSoundBtn.setAttribute('title', 'Sound Enabled (Click to Mute)');
        playTickSound(false);
      } else {
        if (soundIconOn) soundIconOn.style.display = 'none';
        if (soundIconOff) soundIconOff.style.display = 'block';
        toggleSoundBtn.classList.add('muted');
        toggleSoundBtn.setAttribute('title', 'Sound Muted (Click to Unmute)');
      }
    });
  }

  // Start or reset 10-second timer for a question
  function startQuestionTimer(questionIndex) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    timerActiveQuestionIndex = questionIndex;
    timerSecondsLeft = TOTAL_TIMER_SECONDS;

    // If answer is revealed for this question, keep timer invisible
    if (answerRevealed[questionIndex]) {
      if (questionTimer) questionTimer.classList.add('hidden');
      return;
    }

    if (questionTimer) questionTimer.classList.remove('hidden');
    updateTimerUI();
    playTickSound(false);

    timerInterval = setInterval(() => {
      timerSecondsLeft--;
      if (timerSecondsLeft <= 0) {
        timerSecondsLeft = 0;
        clearInterval(timerInterval);
        timerInterval = null;
        updateTimerUI();
        playTimesUpSound();
      } else {
        updateTimerUI();
        playTickSound(timerSecondsLeft <= 3);
      }
    }, 1000);
  }

  // Stop running timer
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Update timer display & circular SVG progress ring
  function updateTimerUI() {
    if (!questionTimer || !timerSeconds || !timerProgressCircle) return;

    timerSeconds.textContent = timerSecondsLeft;

    // Calculate circular stroke offset (from 0 down to full circumference)
    const progressFraction = (TOTAL_TIMER_SECONDS - timerSecondsLeft) / TOTAL_TIMER_SECONDS;
    const offset = progressFraction * CIRCLE_CIRCUMFERENCE;
    timerProgressCircle.style.strokeDashoffset = offset;

    // Color and status styling based on remaining time
    timerProgressCircle.classList.remove('warning', 'danger', 'stopped');
    timerStatusText.classList.remove('time-up');

    if (timerSecondsLeft > 4) {
      timerStatusText.textContent = "⏱️ Think & Select Option";
    } else if (timerSecondsLeft > 0) {
      timerProgressCircle.classList.add('warning');
      timerStatusText.textContent = "⚡ Hurry up! Select answer";
    } else {
      timerProgressCircle.classList.add('danger');
      timerStatusText.classList.add('time-up');
      timerStatusText.textContent = "🛑 Time's Up!";
    }
  }

  // Render Current Question
  function renderQuestion() {
    const currentQ = questionsData[currentIndex];
    const isRevealed = answerRevealed[currentIndex];
    const selectedOption = userAnswers[currentIndex];

    // Meta & Text
    cardCategory.textContent = currentQ.category || "Modes of Communication";
    cardQuestionNumber.textContent = `Question ${currentQ.id}`;
    cardQuestionText.textContent = currentQ.question;

    // Render Options
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((optText, optIndex) => {
      const optionItem = document.createElement('div');
      optionItem.className = 'option-item';
      optionItem.setAttribute('role', 'radio');
      optionItem.setAttribute('aria-checked', selectedOption === optIndex ? 'true' : 'false');
      optionItem.setAttribute('tabindex', '0');

      // State styling
      if (selectedOption === optIndex) {
        optionItem.classList.add('selected');
      }

      // If answer is revealed, highlight correct and wrong states
      if (isRevealed) {
        if (optIndex === currentQ.correctAnswer) {
          optionItem.classList.add('revealed-correct');
        } else if (selectedOption === optIndex) {
          optionItem.classList.add('revealed-wrong');
        }
      }

      optionItem.innerHTML = `
        <span class="option-letter">${optionLetters[optIndex]}</span>
        <span class="option-label">${optText}</span>
        <span class="option-radio-dot"></span>
      `;

      // Option Click Handler (Selecting option does NOT disturb the countdown)
      optionItem.addEventListener('click', () => {
        selectOption(optIndex);
      });

      // Keyboard support on option card
      optionItem.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          selectOption(optIndex);
        }
      });

      optionsContainer.appendChild(optionItem);
    });

    // Update Show/Hide Answer button state & Timer visibility
    if (isRevealed) {
      showAnswerBtn.classList.add('active');
      showAnswerBtnText.textContent = 'Hide Answer & Explanation';
      explanationContainer.classList.add('active');
      
      // Clock is invisible when Answer & Explanation is shown
      if (questionTimer) questionTimer.classList.add('hidden');
      stopTimer();

      const correctOptLetter = optionLetters[currentQ.correctAnswer];
      const correctOptText = currentQ.options[currentQ.correctAnswer];
      correctAnswerLabel.textContent = `Correct Answer: ${correctOptLetter}. ${correctOptText}`;
      explanationText.textContent = currentQ.explanation;
    } else {
      showAnswerBtn.classList.remove('active');
      showAnswerBtnText.textContent = 'Show Answer & Explanation';
      explanationContainer.classList.remove('active');

      // Clock is visible when Answer & Explanation is not shown
      if (questionTimer) questionTimer.classList.remove('hidden');
      
      // Start 10s timer if this is a newly visited question
      if (timerActiveQuestionIndex !== currentIndex) {
        startQuestionTimer(currentIndex);
      }
    }

    // Navigation buttons state
    prevBtn.disabled = currentIndex === 0;
    if (currentIndex === TOTAL_QUESTIONS - 1) {
      nextBtn.innerHTML = `Submit <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    } else {
      nextBtn.innerHTML = `Next <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    }

    updateProgress();
    updatePalette();
  }

  // Select an Option (updates choice without restarting timer)
  function selectOption(optIndex) {
    userAnswers[currentIndex] = optIndex;
    renderQuestion();
  }

  // Toggle Answer & Explanation (hides clock when revealed)
  function toggleAnswer() {
    const willBeRevealed = !answerRevealed[currentIndex];
    answerRevealed[currentIndex] = willBeRevealed;

    if (willBeRevealed) {
      stopTimer();
      if (questionTimer) questionTimer.classList.add('hidden');
    } else {
      if (questionTimer) questionTimer.classList.remove('hidden');
      startQuestionTimer(currentIndex);
    }

    renderQuestion();
  }

  // Go to question by index
  function goToQuestion(index) {
    if (index >= 0 && index < TOTAL_QUESTIONS) {
      currentIndex = index;
      renderQuestion();
    }
  }

  // Next Question
  function handleNext() {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      // Last question reached, trigger submission modal
      openSubmitModal();
    }
  }

  // Previous Question
  function handlePrev() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  }

  // Submit Modal Logic
  function openSubmitModal() {
    const answeredCount = userAnswers.filter(ans => ans !== null).length;
    const remainingCount = TOTAL_QUESTIONS - answeredCount;

    modalAnsweredCount.textContent = answeredCount;
    modalRemainingCount.textContent = remainingCount;

    if (remainingCount === 0) {
      modalDesc.textContent = "Great job! You have answered all 50 questions. Ready to view your final score?";
    } else {
      modalDesc.textContent = `You still have ${remainingCount} unanswered question(s). Are you sure you want to submit now?`;
    }

    submitModal.classList.add('active');
  }

  function closeSubmitModal() {
    submitModal.classList.remove('active');
  }

  // Calculate & Submit Quiz
  function submitQuiz() {
    closeSubmitModal();
    stopTimer();
    isSubmitted = true;

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      if (userAnswers[i] === null) {
        unansweredCount++;
      } else if (userAnswers[i] === questionsData[i].correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }

    const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

    // Update Result UI
    statTotal.textContent = TOTAL_QUESTIONS;
    statCorrect.textContent = correctCount;
    statWrong.textContent = wrongCount;
    statUnanswered.textContent = unansweredCount;
    statPercentage.textContent = `${percentage}%`;
    resultTitle.textContent = `Your Score: ${correctCount} / ${TOTAL_QUESTIONS}`;

    // Performance Message & Styling
    resultPerformanceBadge.className = 'result-header-badge';
    if (percentage >= 90) {
      resultPerformanceBadge.classList.add('performance-tier-excellent');
      resultPerformanceBadge.textContent = '🌟 Performance: Outstanding';
      resultMessage.textContent = 'Excellent! You have mastered Simplex, Half-Duplex, and Full-Duplex communication modes.';
    } else if (percentage >= 75) {
      resultPerformanceBadge.classList.add('performance-tier-good');
      resultPerformanceBadge.textContent = '👏 Performance: Very Good';
      resultMessage.textContent = 'Very Good! You have a solid grasp of communication modes. Review the few incorrect questions to achieve 100%.';
    } else if (percentage >= 60) {
      resultPerformanceBadge.classList.add('performance-tier-revise');
      resultPerformanceBadge.textContent = '📖 Performance: Good';
      resultMessage.textContent = 'Good, but revise the topic. Pay special attention to direction of flow and simultaneous transmission rules.';
    } else {
      resultPerformanceBadge.classList.add('performance-tier-practice');
      resultPerformanceBadge.textContent = '⚠️ Performance: Needs Practice';
      resultMessage.textContent = 'You need more practice. Review the concept explanations below to strengthen your understanding.';
    }

    // Filter counts for review
    filterCorrectCount.textContent = correctCount;
    filterWrongCount.textContent = wrongCount;
    filterUnansweredCount.textContent = unansweredCount;

    // Render Review List
    renderReviewList('all');

    // Switch Views
    quizActiveView.style.display = 'none';
    resultsContainer.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render Review List of all 50 questions
  function renderReviewList(filter = 'all') {
    reviewList.innerHTML = '';

    questionsData.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      const isCorrect = userAns === q.correctAnswer;
      const isUnanswered = userAns === null;
      const isWrong = !isUnanswered && !isCorrect;

      // Filter logic
      if (filter === 'correct' && !isCorrect) return;
      if (filter === 'wrong' && !isWrong) return;
      if (filter === 'unanswered' && !isUnanswered) return;

      const card = document.createElement('article');
      card.className = 'review-card';

      if (isCorrect) {
        card.classList.add('correct-border');
      } else if (isWrong) {
        card.classList.add('wrong-border');
      } else {
        card.classList.add('unanswered-border');
      }

      let statusBadge = '';
      if (isCorrect) {
        statusBadge = `<span class="review-status-tag correct">✓ Correct</span>`;
      } else if (isWrong) {
        statusBadge = `<span class="review-status-tag wrong">✗ Incorrect</span>`;
      } else {
        statusBadge = `<span class="review-status-tag unanswered">○ Unanswered</span>`;
      }

      let optionsHtml = '';
      q.options.forEach((optText, optIdx) => {
        let optClass = 'review-opt';
        let prefix = `${optionLetters[optIdx]}. `;

        if (optIdx === q.correctAnswer) {
          optClass += ' is-correct';
          prefix = `✓ ${optionLetters[optIdx]}. `;
        } else if (userAns === optIdx && !isCorrect) {
          optClass += ' is-user-wrong';
          prefix = `✗ ${optionLetters[optIdx]}. `;
        }

        optionsHtml += `
          <div class="${optClass}">
            <strong>${prefix}</strong>
            <span>${optText}</span>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="review-card-header">
          <span style="font-weight:700; color:var(--slate-600);">Question ${q.id} • ${q.category}</span>
          ${statusBadge}
        </div>
        <div class="review-question-text">${q.question}</div>
        <div class="review-options-grid">${optionsHtml}</div>
        <div class="review-explanation">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      `;

      reviewList.appendChild(card);
    });
  }

  // Filter Buttons Handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderReviewList(btn.getAttribute('data-filter'));
    });
  });

  // Toggle Review Accordion
  function toggleReview() {
    const isActive = reviewSection.classList.contains('active');
    if (isActive) {
      reviewSection.classList.remove('active');
      reviewBtnText.textContent = 'Review All 50 Questions';
    } else {
      reviewSection.classList.add('active');
      reviewBtnText.textContent = 'Hide Question Review';
      reviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Restart Quiz
  function restartQuiz() {
    stopTimer();
    currentIndex = 0;
    timerActiveQuestionIndex = -1;
    userAnswers.fill(null);
    answerRevealed.fill(false);
    isSubmitted = false;

    // Reset UI
    resultsContainer.classList.remove('active');
    reviewSection.classList.remove('active');
    reviewBtnText.textContent = 'Review All 50 Questions';
    quizActiveView.style.display = 'block';

    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Header quick tools toggles
  toggleGuideBtn.addEventListener('click', () => {
    const isOpen = quickGuideCard.classList.toggle('active');
    toggleGuideBtn.setAttribute('aria-expanded', isOpen);
  });

  togglePaletteBtn.addEventListener('click', () => {
    const isOpen = questionPalette.classList.toggle('active');
    togglePaletteBtn.setAttribute('aria-expanded', isOpen);
  });

  // Event Listeners
  showAnswerBtn.addEventListener('click', toggleAnswer);
  prevBtn.addEventListener('click', handlePrev);
  nextBtn.addEventListener('click', handleNext);
  submitQuizBtn.addEventListener('click', openSubmitModal);
  modalCancelBtn.addEventListener('click', closeSubmitModal);
  modalConfirmBtn.addEventListener('click', submitQuiz);
  restartQuizBtn.addEventListener('click', restartQuiz);
  toggleReviewBtn.addEventListener('click', toggleReview);

  // Close modal when clicking on overlay background
  submitModal.addEventListener('click', (e) => {
    if (e.target === submitModal) {
      closeSubmitModal();
    }
  });

  // Keyboard Shortcuts for Enhanced Accessibility & Experience
  document.addEventListener('keydown', (e) => {
    // If modal is active
    if (submitModal.classList.contains('active')) {
      if (e.key === 'Escape') closeSubmitModal();
      if (e.key === 'Enter') submitQuiz();
      return;
    }

    // Only process quiz shortcuts when quiz is active
    if (!isSubmitted) {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (['1', 'a', 'A'].includes(e.key)) {
        selectOption(0);
      } else if (['2', 'b', 'B'].includes(e.key)) {
        selectOption(1);
      } else if (['3', 'c', 'C'].includes(e.key)) {
        selectOption(2);
      } else if (['4', 'd', 'D'].includes(e.key)) {
        selectOption(3);
      }
    }
  });

  // Initial Initialization
  initPalette();
  renderQuestion();
});
