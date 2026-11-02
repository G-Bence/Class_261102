import type { DogBreed } from '../types/dogBreedType'

export default function Moderator(props: {listDogBreeds: DogBreed[], setListDogBreeds: (data: DogBreed[]) => void}) {
    function changeDogStatus(id: number) {
        const updatedDogBreeds = props.listDogBreeds.map(dog => {
            if (dog.id === id) {
                return {...dog, isActive: !dog.isActive}
            }
            return dog
        })
        props.setListDogBreeds(updatedDogBreeds)
    }

    return (
        <section className="contentContainer container bg-light p-4 rounded">
            <h2>Moderator</h2>
            <p>Turn dog breed listings on or off.</p>
            <ul className="list-group">
                {props.listDogBreeds.map(dog => (
                    <li key={dog.id} className="list-group-item">
                        <div className="moderatorRow">
                            <span>{dog.name} - {dog.origin} - {dog.weight} kg</span>
                            <div className="buttonContainer">
                                <span className={dog.isActive ? "badge bg-success" : "badge bg-secondary"}>{dog.isActive ? "Active" : "Inactive"}</span>
                                <button className={dog.isActive ? "btn btn-warning btn-sm" : "btn btn-success btn-sm"} onClick={() => changeDogStatus(dog.id)}>{dog.isActive ? "Deactivate" : "Activate"}</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {props.listDogBreeds.length === 0 && <p>No dog breeds to display.</p>}
        </section>
    )
}
