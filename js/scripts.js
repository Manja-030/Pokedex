/* To avoid the mess that comes with global variables
I wrapped the pokemonList in an IIFE.
The functions getAll and add within the Iffy
allow me to access the pokemonList from outside and add pokemons to the array.
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
      console.log(item);
    });
  }


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


/* To loop through my List of Pokémons I could use a for Loop like this:

for (let i = 0; i < pokemonList.length; i++){
  let big = " - Wow, that´s big!";
  if (pokemonList[i].heightCentimeters > 100){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].heightCentimeters + "cm)" + big + "<br>");
  } else{
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].heightCentimeters + "cm)" + "<br>");
  }
}
But there is a simpler way. Here I use JavaScripts built in function forEach.
And after I wrapped the pokemonList in an Iffy
I now need to refer to the getAll function within the Iffy. */

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
/*
Old code snippet from former task:
  let big = " - Wow, that´s big!";
  if (pokemon.heightCentimeters > 100){
    document.write(pokemon.name + " (height: " + pokemon.heightCentimeters + "cm)" + big + "<br>");
  } else{
    document.write(pokemon.name + " (height: " + pokemon.heightCentimeters + "cm)" + "<br>");
  }
*/
