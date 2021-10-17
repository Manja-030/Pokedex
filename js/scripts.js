//Create IIFE to wrap pokemonList:
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000'; //external API

  //Display/Hide bootstrap loading-spinner
  function showLoadingMessage() {
    document.querySelector('.loading-message').classList.add('visible');
  }
  function hideLoadingMessage() {
    document.querySelector('.loading-message').classList.remove('visible');
  }
  //Add pokémons to array:
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  //Return pokemonList array:
  function getAll() {
    return pokemonList;
  }
  //Create panel of buttons to display names of pokemons.
  //Add event listener to show pokemon details on click:
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.classList.add('row', 'col-gap');
    let listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item-mine',
      'col-xl-3',
      'col-lg-4',
      'col-md-6'
    );

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button', 'btn', 'text-capitalize');
    pokemonButton.setAttribute('data-target', '#pokemonModal');
    pokemonButton.setAttribute('data-toggle', 'modal');

    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  //Fetch pokemon list from API:
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        hideLoadingMessage();
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  //Fetch pokémon details form API:
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        hideLoadingMessage();
        item.image = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        //Get array of all pokémon types and abilities.
        item.types = [];
        item.abilities = [];
        Object.keys(details.types).forEach(function(property) {
          item.types.push(details.types[property].type.name);
        });
        Object.keys(details.abilities).forEach(function(property) {
          item.abilities.push(details.abilities[property].ability.name);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  //Display pokémon details in modal:
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }
  //Define content of bootstrap modal
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');

    let imageElement = $(
      '<img class=\'modal-img float-right img-fluid\' style=\'max-width:200px\'>'
    );
    imageElement.attr('src', item.image);
    imageElement.attr('alt', 'picture of ' + item.name);
    let heightElement = $('<p>' + 'Height: ' + item.height / 10 + 'm' + '</p>');
    let weightElement = $(
      '<p>' + 'Weight: ' + item.weight / 10 + 'kg' + '</p>'
    );
    let typesElement = $('<p>' + 'Types: ' + item.types + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  let searchPokemon = document.querySelector('#searchBar');

  searchPokemon.addEventListener('input', function() {
    let listPokemon = document.querySelectorAll('li');
    let value = searchPokemon.value.toUpperCase();

    listPokemon.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = 'block';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    //findPokemon: findPokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let myButton = document.getElementById('btn-back-to-top');

// When the user scrolls down 50px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myButton.style.display = 'block';
  } else {
    myButton.style.display = 'none';
  }
}
// When the user clicks on the button, scroll to the top of the document
myButton.addEventListener('click', backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
