import Axios from 'axios'

const RawgApi = Axios.create({
   // baseURL: 'https://api.rawg.io/api/games?key=13249e60b9db43ef9b416d516fe73ddb'
})

export default RawgApi

/*
const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/games?key=13249e60b9db43ef9b416d516fe73ddb', (req, res) => {
  request(
    { url: 'https://api.rawg.io/api/games?key=13249e60b9db43ef9b416d516fe73ddb' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error'});
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
*/