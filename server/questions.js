const https = require('https');

function getQuestions(number, category, difficuly) {
  return new Promise((resolve, reject) => {
    let url = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficuly}&type=boolean`    
    https.get(url, (resp) => {
      let data = '';
  
      resp.on('data', (chunk) => {
        data += chunk;
      });
  
      resp.on('end', () => {
        const qData = JSON.parse(data);
        questions = qData.results;              
        resolve(questions)
      });
  
    }).on("error", (err) => {
      reject("Error: " + err.message)
    });
  })

}

module.exports.getQuestions = getQuestions;
