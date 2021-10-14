/* To avoid the mess that comes with global variables
the pokemonList is wrapped in an IIFE.
*/

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item-mine");

    let pokemonButton = document.createElement("button");
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add("pokemon-button", "btn", "text-capitalize");
    pokemonButton.setAttribute("data-target", "#pokemonModal");
    pokemonButton.setAttribute("data-toggle", "modal");

    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);
    pokemonButton.addEventListener("click", function(event) {
      showDetails(pokemon)
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrlFront = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      item.abilities = [];

      Object.keys(details.types).forEach(function(property) {
        item.types.push(details.types[property].type.name);
      });
      Object.keys(details.abilities).forEach(function(property) {
        item.abilities.push(details.abilities[property].ability.name);
      });
    console.log(item);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //let modalContainer = document.querySelector("#modal-container");
  function showModal(item) {

    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");

    let imageElementFront = $("<img class='modal-img float-right img-fluid'>");
    imageElementFront.attr("src", item.imageUrlFront);
    imageElementFront.attr("alt", "picture of " + item.name)
    let heightElement = $("<p>" + "Height: " + item.height/10 + "m" + "</p>");
    let weightElement = $("<p>" + "Weight: " + item.weight/10 + "kg" + "</p>");
    let typesElement = $("<p>" + "Types: " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  let searchPokemon = document.querySelector("#searchBar");

  searchPokemon.addEventListener("input", function() {
    let listPokemon = document.querySelectorAll("li");
    let value = searchPokemon.value.toUpperCase();

    listPokemon.forEach(function (pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = "block";
      } else {
        pokemon.style.display = "none";
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


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 50px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
