const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const exphbs = require('express-handlebars');

const { getQuestions } = require('./server/questions.js')

const app = express()

var trivia;
var numberOfQuestions = 0;
var questionNumber = 0;
var correctAnswers = 0;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  numberOfQuestions = 0;
  questionNumber = 0;
  correctAnswers = 0;
  res.render('start', {
  });
})

app.post('/', (req, res) => {
  const number = req.body.number[0];
  const category = req.body.number[1];
  const difficulty = req.body.number[2];
  numberOfQuestions = number;
  getQuestions(number, category, difficulty)
    .then(data => trivia = data)
    .then((data) => console.log(data))
    .then(() => {
      res.render('question', {
        question: trivia[questionNumber].question.replace('&quot;', '\''),
        result: ""
      });
    })
});

app.post('/questions', (req, res) => {
  if (req.body.answer === trivia[questionNumber].correct_answer) {
    correctAnswers += 1
  }

  if (questionNumber === numberOfQuestions - 1) {
    res.render('question', {
      question: "",
      result: `You answerd ${correctAnswers} questions correctly`
    });
  } else {
    questionNumber++
    res.render('question', {
      question: trivia[questionNumber].question.replace('&quot;', '\''),
      result: ""
    });
  }
})

const port = 3000;
app.listen(port, () => console.log(` app listening on port ${port}`))
