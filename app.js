$(document).ready(function(){
    fetchData();
    document.getElementById('more').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('pokemons').innerHTML = '';
        fetchData();
    })  
});

let endpoint = 'https://pokeapi.co/api/v2/pokemon/';   

function fetchData(){
    $.ajax({
        url: endpoint,
        dataType: 'json',
        method:"GET",
        success: function(response) {
            endpoint = response.next;
            response.results.forEach(function(pokemon){
                let poke = `<div class="p-4">
                        <div class="card" style="width: 18rem;">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${pokemon.name}</h5>
                                <a href="#" id="${pokemon.name}-${pokemon.url.split('/')[6]}" class="btn btn-info">I wanna know more of this pokemon!</a>
                            </div>
                        </div>
                    </div>`;
                document.querySelector('#pokemons').insertAdjacentHTML('beforeend', poke);
                document.querySelector(`#${pokemon.name}-${pokemon.url.split('/')[6]}`).addEventListener('click', (e) => {
                    e.preventDefault();
                    $('#diModal').modal('show');
                    document.querySelector('#pokemonName').innerHTML = pokemon.name;
                    document.querySelector('#pokeName').innerHTML = "Name: " + pokemon.name;
                    $.ajax({
                        url: pokemon.url,
                        dataType: 'json',
                        method:"GET",
                        success: function(response) {
                            document.querySelector('#abilities').innerHTML = getAbilities(response)
                            document.querySelector('#pokeTypes').innerHTML = getPokeTypes(response)
                            document.querySelector('#firstFiveMoves').innerHTML = getPokeMoves(response)
                        }
                    });
                });
            });
        }
    });
}

function getAbilities(pokemon) {
    let abilities = 'Abilities : '
    pokemon.abilities.forEach(function(ability){
        abilities += ` ${ability.ability.name}`
    })
    return abilities;
}


function getPokeTypes(pokemon) {
    let types = 'Types : '
    pokemon.types.forEach(function(type){
        types += ` ${type.type.name}`
    })
    return types;
}

function getPokeMoves(pokemon) {
    let move = 'Moves : '
    pokemon.moves.forEach(function(movesito, index){
        if (index < 5) {
            move += ` ${movesito.move.name}`
        }
    })
    return move;
}