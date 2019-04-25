import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

  onChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  getPets = url => {
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ pets: json}))
  }

  onFindPetsClick = () => {
    const filter = this.state.filters.type
    const query = (filter === 'all' ? '' : `?type=${filter}`)
    const baseURL = '/api/pets'
    const queryURL = baseURL + query
    this.getPets(queryURL)
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet =>
      pet.id === petId? {...pet, isAdopted: true} : pet )
    this.setState({ pets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
