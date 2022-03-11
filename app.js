const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// default get request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '\\public\\index.html')
  
})

// get request for when encrypting
app.get('/encrypt', (req, res) => {
  
  var pt = req.query.plaintext;
  var ct = '';

  // the ascii decimal values for the characters
  var charVal = '';
  var newVal = '';

  for(var i = 0; i < pt.length; i++) {
    charVal = pt.charCodeAt(i);

    // uppercase
    if(charVal >= 65 && charVal <= 90) {
      newVal = charVal + 13;
      if(newVal > 90) {
        newVal = (newVal - 91) + 65;
      }
    }
    // lowercase
    else if(charVal >= 97 && charVal <= 122) {
      newVal = charVal + 13;
      if(newVal > 122) {        
        newVal = (newVal - 123) + 97;
      }
    }
    // punctuation
    else {
      newVal = charVal;
    }

    // adding the new values back to the encoded text
    ct += String.fromCharCode(newVal);
  }

  res.status(200).send(ct)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})