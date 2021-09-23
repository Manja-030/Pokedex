/* To avoid the mess that comes with global variables
the pokemonList is wrapped in an IIFE.
*/

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";

  function add(pokemon) {
    /*
    Before a pokemon can be added to the pokemonList I check if it is
    - an object
    - the keys of this pokemon are right and complete
    *
    let keys = ["name", "heightCentimeters", "types", "category"];

    let keyCheck = Object.keys(pokemon).every(function (key){
      return keys.includes(key);
    });

    if (typeof pokemon === "object" && keyCheck == true && Object.keys(pokemon).length == keys.length) { */
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon)
    });
  }

/*This function should allow to find a specific Pokémon by its name.
  function findPokemon(){
    let userSearchName = prompt("Which Pokémon would you like to see? Enter name: ");
    let filteredPokemon = pokemonList.filter(function(pokemon) {
      return pokemon.name == userSearchName;
    });
  }
*/
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
        console.log(pokemon);
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.add("is-visible");
    //to clear all existing modal content:
    modalContainer.innerHTML = "";
    //to create the modal:
    let modal = document.createElement("div");
    modal.classList.add("modal");
    //to create close button for modal:
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    //calls function to hide Modal when button is clicked:
    closeButtonElement.addEventListener("click", hideModal);
    //to create modal title:
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;
    //to create modal content:
    let contentElement = document.createElement("p");
    let pokeHeight = pokemon.height/10;
    let pokeWeight = pokemon.weight/10;

    contentElement.innerText = `Height: ${pokeHeight}m
    Weight: ${pokeWeight}kg`;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", pokemon.imageUrl);

    //to append modal content to modal:
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    //to append modal to modal container:
    modalContainer.appendChild(modal);

    //adds class for CSS styling when visible:
    modalContainer.classList.add("is-visible");
  }

  //calling this function hides the modal:
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //to close modal with Esc-key on keyboard:
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if(e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //to close modal by clicking somewhere outside of the modal:
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    //findPokemon: findPokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



document.querySelector("#show-modal").addEventListener("click", () => {
  showModal("Modal title", "This is the Modal content!")
});
