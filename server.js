const express = require('express');

const app = express();
const PORT = 3001;

const {animals} = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
    } else {
        personalityTraitsArray = query.personalityTraits;
    }
    personalityTraitsArray.forEach(trait => {
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }

  function findById(id, animalsArray) {
      const result = animalsArray.filter(aimal => animal.id === id)[0];
      return result;
  }

  app.post('/api/animals', (req, res) => {
      console.log(req.body);
      res.json(req.body);
  });

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  app.get('/api/animals/:id', (req, res) => {
      const result = findById(req.params.id, animals);
      res.json(result);
  });

 app.listen(3001, () => {
     console.log(`API server now on port 3001!`);
   });

