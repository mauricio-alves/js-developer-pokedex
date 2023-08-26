const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi({ type, id, name, types, sprites }) {
  return `
        <li class="pokemon ${types[0].type.name}">
            <span class="number">#${id}</span>
            <span class="name">${name}</span>

            <div class="detail">
                <ol class="types">
                    ${types
                      .map(
                        ({ type }) =>
                          `<li class="type ${type.name}">${type.name}</li>`
                      )
                      .join("")}
                </ol>
                <img src="${
                  sprites.other.dream_world.front_default
                }" alt="${name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
