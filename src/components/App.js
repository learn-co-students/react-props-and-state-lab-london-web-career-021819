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

  onChangeType = filter => {
    this.setState({
      filters: {
        type: filter
      }
    })
  }

  onFindPetsClick = () => {
    const filter = this.state.filters.type
    const query = (filter === 'all' ? '' : `?type=${filter}`)
    const baseURL = '/api/pets'
    const queryURL = baseURL + query

    this.getPets(queryURL)
  }

  getPets = url => {
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ pets: json }))
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(p =>
      p.id === petId ? {...p, isAdopted: true} : p
    )

    this.setState({ pets });
  }

  render() {
    const { onChangeType, onFindPetsClick, onAdoptPet } = this
    const { pets } = this.state

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
