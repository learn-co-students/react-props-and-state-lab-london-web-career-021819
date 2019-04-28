import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()
//state contains the array of pets and the
//type of filter to be set on the displayed pets
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

// this callback is sent down to filter. it is
// triggered when the <select> value is changed.
// The selected value (event.target.value) is sent
// through the callback to App to change the state.
  onChangeType = filter => {
    this.setState({
      filters: {
        type: filter
      },
      pets: []
    })
  }
// this callback is sent down to filter. it is
// triggered when the "Find Pets" button is
// clicked. It runs a fetch based on which filter
// is selected.
  onFindPetsClick = () => {
    const filter = this.state.filters.type
    const query = (filter === 'all' ? '' : `?type=${filter}`)
    const baseURL = '/api/pets'
    const queryURL = baseURL + query
    this.getPets(queryURL)
  }
//fetches pets
  getPets = url => {
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ pets: json }))
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map( pet => pet.id === petId ? {...pet, isAdopted: true} : pet)
    this.setState({pets})
  }

  render() {
    const { onChangeType, onFindPetsClick, onAdoptPet} = this
    const { pets } = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              {
                // 1st child of App: Filters.
                // App passes two callback props down to Filter
              }
              <Filters
                onChangeType={onChangeType}
                onFindPetsClick={onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser className="ui grid"
                pets={pets}
                onAdoptPet={onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
