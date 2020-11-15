window.addEventListener('DOMContentLoaded', () => {

  // eslint-disable-next-line strict
  "use strict";

  const heroes = document.querySelector('.heroes'),
    heroesList = document.querySelector('.heroes__list'),
    filter = document.querySelector('.filter'),
    gender = document.getElementById('gender'),
    status = document.getElementById('status'),
    citizenship = document.getElementById('citizenship'),
    species = document.getElementById('species'),
    button = document.getElementById('button');

  const fullData = [];

  const showHeroes = jsonObj => {
    heroesList.innerHTML = '';

    jsonObj.forEach(item => {
      const { photo, name, actors, movies, status } = item;
      heroesList.insertAdjacentHTML('beforeend', `
      <li class="heroes__item">
        <a href="#" class="tv-card">
            <img class="tv-card__img"
                  src="${photo}">
            <span class="tv-card__head"><b>Character's name: </b>${name}</span>
            <span class="tv-card__head"><b>Actor's name: </b>${actors}</span>
            <span class="tv-card__head"><b>Movies: </b>${movies}</span>
            <span class="tv-card__head"><b>Status: </b>${status}</span>
        </a>
      </li>
    `);
    });
  };

  const getData = () => {
    const request = new XMLHttpRequest();

    request.open('GET', './dbHeroes.json', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.addEventListener('readystatechange', event => {
      try {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          showHeroes(data);
          for (const key in data) {
            fullData[key] = data[key];
          }
        }
      } catch (error) {
        console.log(error.name);
      }
    });
  };

  getData();

  const filterData = (obj, data)  => {
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const keyObj = Object.keys(obj)[i];
      if (obj[keyObj] === 'Not_indicated') {
        continue;
      }
      data = data.map((item, index) => {
        for (const el of Object.keys(item)) {
          if (item[keyObj] === obj[keyObj]) {
            return item;
          }
        }
      });
      data = data.filter(item => item !== undefined);
    }
    showHeroes(data);
  };

  const objFilter = {};

  button.addEventListener('click', event => {
    event.preventDefault();
    objFilter[gender.id] = gender.value;
    objFilter[status.id] = status.value;
    objFilter[citizenship.id] = citizenship.value;
    objFilter[species.id] = species.value;
    filterData(objFilter, fullData);
  });

});
