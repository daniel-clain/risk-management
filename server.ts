import * as express from 'express'
import { writeFileSync, readFileSync  } from 'fs';

const app = express();


app.use(express.static('dist'));


app.get('/save-game', (req, res) => {
  console.log('req :>> ', req);
  console.log('save-game called');

})

app.get('/load-game', (req, res) => {  
  console.log('load-game called');
  const saveGameFilePath = `${__dirname}/public/saved-game.json`
  const saveGameFile = readFileSync(saveGameFilePath, 'utf8')
  const saveGameJson = JSON.parse(saveGameFile)
  res.header("Content-Type",'application/json');
  res.send(saveGameJson)
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));