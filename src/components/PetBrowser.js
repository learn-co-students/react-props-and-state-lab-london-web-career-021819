import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  render() {
    const { pets, onAdoptPet } = this.props;

    return (
      <div className="ui cards">
        {pets.map(pet => (
          <Pet
            pet={pet}
            key={pet.id}
            isAdopted={pet.isAdopted}
            onAdoptPet={onAdoptPet}
          />
        ))}
      </div>
    );
  }
}

export default PetBrowser;
