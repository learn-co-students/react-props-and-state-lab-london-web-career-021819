import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  // function to update App's state.filters.type
  // when the filter changes (animal type is selected)
  handleChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    });
  };

  // function to fetch a list of pets when the find pets button is clicked
  handleFindPetsClick = () => {
    // get the selected type from state
    // determine url based on choice
    const chosen = this.state.filters.type;
    const baseUrl = "/api/pets";
    const url = chosen === "all" ? baseUrl : baseUrl + `?type=${chosen}`;
    // make fetch request with that type
    // return is array of only that type animal
    // set state.pets = that array of pets
    fetch(url)
      .then(resp => resp.json())
      .then(results =>
        this.setState({
          pets: results
        })
      );
  };

  // function called when user clicks 'adopt pet' button:
  // can't use find - returns the OBJECT, not the instance of the component 
  // have to map over the existing array in state.pets, when the clicked pet is located, change its state.isAdopted to true.  All the other pets will be added to the new array as is.
  handleAdoptPet = petId => {
    const newPets = this.state.pets.map(pet =>
      // no curly braces here so return keyword is not needed
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    );
    // debugger;
    this.setState({
      pets: newPets
    });
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
              <Filters
                onChangeType={this.handleChangeType}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
