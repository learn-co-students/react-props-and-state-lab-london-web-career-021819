import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  getAllPets = () => {

    let endpoint = '/api/pets'
    
    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`
    }
    return fetch(endpoint)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets }))
  }

  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  }

  onAdoptPet = (petId) => { 
    let foundPet = this.state.pets.find(pet => pet.id === petId)
    return foundPet ? foundPet.isAdopted = true : foundPet
  }
  
  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });
  };



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.getAllPets} onChangeType={this.onChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
