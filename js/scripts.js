let pokemonList = [
  {name: "Spritzee", heightCentimeters: 20.3, types: "Fairy", category: "Perfume"},
  {name: "Gloom", heightCentimeters: 78.7, types: ["Grass", "Poison"], category: "Weed"},
  {name: "Haunter", heightCentimeters: 160,types: ["Ghost", "Poison"], category: "Gas"},
  {name: "Charmander", heightCentimeters: 61, types: "Fire", category: "Lizard"}
  ];


for (let i = 0; i < pokemonList.length; i++){
  let big = " - Wow, that´s big!";
  if (pokemonList[i].heightCentimeters > 100){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].heightCentimeters + "cm)" + big + "<br>");
  } else{
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].heightCentimeters + "cm)" + "<br>");
  }
}
