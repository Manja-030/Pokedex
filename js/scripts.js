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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
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
