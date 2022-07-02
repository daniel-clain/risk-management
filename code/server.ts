import * as express from 'express'

const app = express();


app.use(express.static('dist'));


app.get('/existing-game', (req, res) => {
  console.log('doink');
  res.write('existing-game endpoint')
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));