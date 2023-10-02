class Quiz {
  constructor() {
      this.questions = [];
      this.attempts = [];
      this.scores = [];
      this.scoreAcquired = [];
      this.currentIndex = 0;
      this.totalQuestions = 5;
      this.timeLimit = 60;
      this.timer = null;
  }

  initialize() {
      this.hideElements('res', 'introduction', 'showproblems', 'befres', 'countdown');
      this.attachHandlers();
  }

  hideElements(...elements) {
      elements.forEach(element => {
          document.getElementById(element).style.display = 'none';
      });
  }

  showElement(elementId) {
      document.getElementById(elementId).style.display = 'block';
  }

  attachHandlers() {
      document.getElementById('startButton').addEventListener('click', () => this.startQuiz());
      // Add other event listeners for answer selection and navigation
  }

  startQuiz() {
      this.hideElements('introduction');
      this.showElement('showproblems');
      this.showElement('countdown');
      this.startTimer();
  }

  startTimer() {
      let time = this.timeLimit;
      this.timer = setInterval(() => {
          // Update timer logic here
          if (time <= 0) {
              this.handleTimeUp();
          }
          time--;
      }, 1000);
  }

  handleTimeUp() {
      clearInterval(this.timer);
      this.hideElements('q1', 'q2', 'q3', 'q4', 'q5');
      this.showElement('res');
      // Add logic for calculating and displaying scores
  }
}

const quiz = new Quiz();
quiz.initialize();
// Better in scalability and readable, in terms of big O and clean code 