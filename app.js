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

  // Navigation Buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitQuizBtn = document.getElementById('submitQuizBtn');

  // Modal Dialog Elements
  const submitModal = document.getElementById('submitModal');
  const modalAnsweredCount = document.getElementById('modalAnsweredCount');
  const modalRemainingCount = document.getElementById('modalRemainingCount');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');

  // Results Screen Elements
  const resultPerformanceBadge = document.getElementById('resultPerformanceBadge');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  const statPercentage = document.getElementById('statPercentage');
  const statTotal = document.getElementById('statTotal');
  const statCorrect = document.getElementById('statCorrect');
  const statWrong = document.getElementById('statWrong');
  const statUnanswered = document.getElementById('statUnanswered');
  const restartQuizBtn = document.getElementById('restartQuizBtn');
  const toggleReviewBtn = document.getElementById('toggleReviewBtn');
  const reviewBtnText = document.getElementById('reviewBtnText');
  const reviewSection = document.getElementById('reviewSection');
  const reviewList = document.getElementById('reviewList');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterCorrectCount = document.getElementById('filterCorrectCount');
  const filterWrongCount = document.getElementById('filterWrongCount');
  const filterUnansweredCount = document.getElementById('filterUnansweredCount');

  const optionLetters = ['A', 'B', 'C', 'D'];

  // Initialize Question Palette
  function initPalette() {
    paletteGrid.innerHTML = '';
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-btn';
      btn.id = `palette-btn-${i}`;
      btn.textContent = i + 1;
      btn.setAttribute('aria-label', `Go to Question ${i + 1}`);
      btn.addEventListener('click', () => {
        goToQuestion(i);
      });
      paletteGrid.appendChild(btn);
    }
  }

  // Update Palette styling
  function updatePalette() {
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const btn = document.getElementById(`palette-btn-${i}`);
      if (!btn) continue;

      btn.classList.remove('active', 'answered');
      if (i === currentIndex) {
        btn.classList.add('active');
      }
      if (userAnswers[i] !== null) {
        btn.classList.add('answered');
      }
    }
  }

  // Update Progress Bar and Counter
  function updateProgress() {
    const qNum = currentIndex + 1;
    questionCounter.textContent = `Question ${qNum} of ${TOTAL_QUESTIONS}`;

    // Progress calculation based on current question position
    const percentage = Math.round((qNum / TOTAL_QUESTIONS) * 100);
    progressPercentage.textContent = `${percentage}%`;
    progressBarFill.style.width = `${percentage}%`;
    progressBarAria.setAttribute('aria-valuenow', percentage);

    // Answered statistics
    const answeredCount = userAnswers.filter(ans => ans !== null).length;
    answeredStats.textContent = `${answeredCount} of ${TOTAL_QUESTIONS} Answered`;
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

      // Option Click Handler
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

    // Update Show/Hide Answer button state
    if (isRevealed) {
      showAnswerBtn.classList.add('active');
      showAnswerBtnText.textContent = 'Hide Answer & Explanation';
      explanationContainer.classList.add('active');

      const correctOptLetter = optionLetters[currentQ.correctAnswer];
      const correctOptText = currentQ.options[currentQ.correctAnswer];
      correctAnswerLabel.textContent = `Correct Answer: ${correctOptLetter}. ${correctOptText}`;
      explanationText.textContent = currentQ.explanation;
    } else {
      showAnswerBtn.classList.remove('active');
      showAnswerBtnText.textContent = 'Show Answer & Explanation';
      explanationContainer.classList.remove('active');
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

  // Select an Option
  function selectOption(optIndex) {
    userAnswers[currentIndex] = optIndex;
    renderQuestion();
  }

  // Toggle Answer & Explanation
  function toggleAnswer() {
    answerRevealed[currentIndex] = !answerRevealed[currentIndex];
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
    currentIndex = 0;
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
