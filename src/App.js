import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    id: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        const searchedPokemon = response.data;
        setPokemon({
          name: pokemonName,
          img: searchedPokemon.sprites.other.dream_world.front_default,
          id: searchedPokemon.id,
          hp: searchedPokemon.stats[0].base_stat,
          attack: searchedPokemon.stats[1].base_stat,
          defense: searchedPokemon.stats[2].base_stat,
          type: searchedPokemon.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  const style = `pokemon ${pokemon.type}`;
  
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>PokeDex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>View Card</button>
      </div>
      <div className="poke-container">
        {!pokemonChosen ? (
          <h4>Please search a Pokémon!</h4>
        ) : (
          <>
            <div className={style}>
              <div className="img-container">
                <img src={pokemon.img} />
              </div>
              <h1>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
              <h2>#{pokemon.id.toString().padStart(3, "0")}</h2>
              <h4>Type: {pokemon.type}</h4>
              <h4>HP: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defence: {pokemon.defense}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
