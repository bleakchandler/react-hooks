// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import{
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView
} from '../pokemon'

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)

  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.

  

  React.useEffect(() => {

    setState({status: 'pending'})
    if (pokemonName){
      fetchPokemon(pokemonName)
        .then((pokemon) => {
          setState({status: 'resolved', pokemon});
        })
        .catch((error) => {
          setState({status: 'rejected', error});
        });
    } 
   
    else { 
      return;
    }
  }, [pokemonName])


  if(status === 'idle'){
        return ('Submit a Pokemon')
    } 
    else if (status === 'pending') {
      return <PokemonInfoFallback name={pokemonName} />
    } 
    else if (status === 'rejected') {
        throw error
    }
    else if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />
    }
  }



  function ErrorFallback({error}){
    return(
      <div role="alert">
       There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }


  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
    
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
       <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App