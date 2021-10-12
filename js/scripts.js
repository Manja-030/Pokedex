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
    listItem.classList.add("group-list-item");

    let pokemonButton = document.createElement("button");
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add("pokemon-button", "btn");
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

    let imageElementFront = $("<img class='modal-img float-right' style='width:50%'>");
    imageElementFront.attr("src", item.imageUrlFront);
    imageElementFront.attr("alt", "picture of " + item.name)

    //let imageElementBack = $("img class='modal-img' style='width:50%'>");
    //imageElementBack.attr("src", itemImageUrlBack);



    let heightElement = $("<p>" + "Height: " + item.height/10 + "m" + "</p>");
    let weightElement = $("<p>" + "Weight: " + item.weight/10 + "kg" + "</p>");
    let typesElement = $("<p>" + "Types: " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");




    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    //modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }
  /*  //let modalContainer = document.querySelector("#modal-container");
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
    let titleElement = document.createElement("h2");
    titleElement.innerText = pokemon.name;
    //to create modal content:
    let contentElement = document.createElement("p");
    let pokeHeight = pokemon.height/10; //m
    let pokeWeight = pokemon.weight/10; //kg
    let pokeTypes = [];
    let pokeAbilities = [];
    Object.keys(pokemon.types).forEach(function(property) {
      pokeTypes.push(pokemon.types[property].type.name);
    });
    Object.keys(pokemon.abilities).forEach(function(property) {
      pokeAbilities.push(pokemon.abilities[property].ability.name);
    });

    contentElement.innerText = `Height: ${pokeHeight}m
    Weight: ${pokeWeight}kg
    Types: ${pokeTypes}
    Abilities: ${pokeAbilities}`;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", pokemon.imageUrl);
    imageElement.classList.add("img");

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
    //let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //to close modal with Esc-key on keyboard:
  window.addEventListener("keydown", (e) => {
    //let modalContainer = document.querySelector("#modal-container");
    if(e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //to close modal by clicking somewhere outside of the modal:
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }

  });
  */

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
