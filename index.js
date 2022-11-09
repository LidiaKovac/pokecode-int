const getPokemon = async () => {
  //fetch().then(response => response.json()).then(jsonResponse => dom manip!)
  //
  //do the fetch, THEN do...
  let unreadableResult = await fetch("https://pokeapi.co/api/v2/pokemon/")
  //api that return 20 pokemons

  //let pokemonResult = await unreadableResult.json()
  //let results = pokemonResult.results

  let { results } = await unreadableResult.json() //array

  renderPkmns(results)
  //WAIT until the fetch is over, then...

  // return 0 is actually return Promise<0>
  //return results //Promise<[pkmn1, pkmn2, etc. etc.]>
}

const renderPkmns = (arrayOfPokemons) => {
  // 1. get an element
  // 2. edit the element
  // 3. append if necessary

  //   let ul = document.querySelector(".list-group")
  let row = document.querySelector(".container .row#pokemon__container")
  //NAMEOFTHEARRAY.NAMEOFTHEMETHOD
  //OBJECT.ARRAY.METHOD
  // for (const singleEl of array) {

  // }
  //li format => <li class="list-group-item">An active item</li>

  arrayOfPokemons.forEach((pokemon) => {
    // arrayOfPokemons.forEach(({name})=> { => not for beginners, but you can build up to it!
    // let { name } = pokemon
    // ul.innerHTML += `<li class="list-group-item">${name}</li>`
    //*ref
    // let li = document.createElement("li")
    // li.classList.add("list-group-item")
    // li.innerText = name
    // ul.appendChild(li)
    //! second part: let's get the details!

    //instead of deconstructing the name, we will deconstruct the url:
    let { url } = pokemon //https://something.com etc. etc.
    getSinglePokemon(url).then((singlePokemon) => {
      let imageUrl =
        singlePokemon.sprites.other["official-artwork"].front_default
      //! creating cards
      //* MAP REVISION: 
    //   [{name: "Lidia"},{name: "Cristina"},{name: "Sabina"}, {name: "Enrico"}].map((familyMember)=> {
        //return familyMember.name + "HELLO"
    //}) => ["LidiaHELLO", "CristinaHELLO", "SabinaHELLO", "EnricoHELLO"]
    let listItems = singlePokemon.abilities.map((abilityObj)=> {
        let {name} = abilityObj.ability //name of the ability
        // return name //["torrent", "anotherAb", "..."]
        return `<li class='list-group-item'> ${name.replaceAll("-", " ")} </li>`
    }).join("")
    console.log(listItems)
    row.innerHTML += `
      <div class='col col-4'>
        <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${singlePokemon.name}</h5>
            <p class="card-text">
                <ul class='list-group'>
                    ${listItems}
                </ul>
            </p>
            
            </div>
        </div>
      </div>`
    })
  })
}

const getSinglePokemon = async (detailsUrl) => {
  //detailsUrl => "https://pokeapi.co/api/v2/pokemon/1/"
  let rawResponse = await fetch(detailsUrl) // fetch("https://pokeapi.co/api/v2/pokemon/1/")
  let details = await rawResponse.json()
  return details //Promise<{...}>
}

//! async await

//old way:
// .then() => promise method, stops the exec of the code until op is over
// .then(()=> {
//     so much confusion :(
// })

//async fun => ALWAYS RETURNS A PROMISE

window.onload = () => {
  getPokemon()
}

//QUESTIONS:
//* how to get the return value from async function?

// const anotherFunction = async() => {
//     let resultOfPokemonFunc = await getPokemon()
// }

// const anotherFunction = () => {
//     getPokemon().then(resultsOfPokemonFunction => {
//pokemons here
//     })
// }
