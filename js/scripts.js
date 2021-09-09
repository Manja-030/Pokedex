/* To avoid the mess that comes with global variables
I wrapped the pokemonList in an IIFE.
The functions getAll and add within the Iffy
allow me to access the pokemonList from outside and add pokemons to the array.
*/

let pokemonRepository = (function() {

  let pokemonList = [
    {name: "Spritzee", heightCentimeters: 20.3, types: "Fairy", category: "Perfume"},
    {name: "Gloom", heightCentimeters: 78.7, types: ["Grass", "Poison"], category: "Weed"},
    {name: "Haunter", heightCentimeters: 160,types: ["Ghost", "Poison"], category: "Gas"},
    {name: "Charmander", heightCentimeters: 61, types: "Fire", category: "Lizard"}
    ];

  function add(pokemon) {
    /*
    Before a pokemon can be added to the pokemonList I check if it is
    - an object
    - the keys of this pokemon are right and complete
    */
    let keys = ["name", "heightCentimeters", "types", "category"];

    let keyCheck = Object.keys(pokemon).every(function(key){
      return keys.includes(key);
    });

    if (typeof pokemon === "object" && keyCheck == true && Object.keys(pokemon).length == keys.length) {
    pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }
/*This function should allow to find a specific Pokémon by its name.*/
  function findPokemon(){
    let userSearchName = prompt("Which Pokémon would you like to see? Enter name: ");
    let filteredPokemon = pokemonList.filter(function(pokemon) {
      return pokemon.name == userSearchName;
  });

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon
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

pokemonRepository.getAll().forEach(function(pokemon){
  let big = " - Wow, that´s big!";
  if (pokemon.heightCentimeters > 100){
    document.write(pokemon.name + " (height: " + pokemon.heightCentimeters + "cm)" + big + "<br>");
  } else{
    document.write(pokemon.name + " (height: " + pokemon.heightCentimeters + "cm)" + "<br>");
  }
});
