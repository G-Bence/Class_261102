import { useState } from 'react'
import type { DogBreed } from '../types/dogBreedType'

export default function Admin(props: {listDogBreeds: DogBreed[], setListDogBreeds: (data: DogBreed[]) => void}) {
    const [name, setName] = useState<string>("")
    const [origin, setOrigin] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(true)
    const [editId, setEditId] = useState<number>(0)
    const [errorMessage, setErrorMessage] = useState<string>("")

    function clearForm() {
        setName("")
        setOrigin("")
        setWeight("")
        setIsActive(true)
        setEditId(0)
        setErrorMessage("")
    }

    function saveDogBreed() {
        if (name.trim() === "" || origin.trim() === "" || weight.trim() === "") {
            setErrorMessage("Please fill in every field.")
            return
        }
        if (!Number.isFinite(Number(weight)) || Number(weight) <= 0) {
            setErrorMessage("Weight must be a number greater than 0.")
            return
        }

        if (editId === 0) {
            let newId = 1
            props.listDogBreeds.forEach(dog => {
                if (dog.id >= newId) {
                    newId = dog.id + 1
                }
            })
            const newDog: DogBreed = {id: newId, name: name.trim(), origin: origin.trim(), weight: Number(weight), isActive: isActive}
            props.setListDogBreeds([...props.listDogBreeds, newDog])
        } else {
            const updatedDogBreeds = props.listDogBreeds.map(dog => {
                if (dog.id === editId) {
                    return {...dog, name: name.trim(), origin: origin.trim(), weight: Number(weight), isActive: isActive}
                }
                return dog
            })
            props.setListDogBreeds(updatedDogBreeds)
        }
        clearForm()
    }

    function editDogBreed(dog: DogBreed) {
        setEditId(dog.id)
        setName(dog.name)
        setOrigin(dog.origin)
        setWeight(String(dog.weight))
        setIsActive(dog.isActive)
        setErrorMessage("")
    }

    function deleteDogBreed(id: number) {
        props.setListDogBreeds(props.listDogBreeds.filter(dog => dog.id !== id))
        if (editId === id) {
            clearForm()
        }
    }

    return (
        <section className="contentContainer container bg-light p-4 rounded">
            <h2>Admin</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr><th>Name</th><th>Origin</th><th>Weight (kg)</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {props.listDogBreeds.map(dog => (
                            <tr key={dog.id}>
                                <td>{dog.name}</td><td>{dog.origin}</td><td>{dog.weight}</td><td>{dog.isActive ? "Active" : "Inactive"}</td>
                                <td><div className="buttonContainer">
                                    <button className="btn btn-primary btn-sm" onClick={() => editDogBreed(dog)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteDogBreed(dog.id)}>Delete</button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {props.listDogBreeds.length === 0 && <p>No dog breeds to display.</p>}
            <article className="formContainer mt-4">
                <h3>{editId === 0 ? "Add dog breed" : "Edit dog breed"}</h3>
                <form onSubmit={event => {event.preventDefault(); saveDogBreed()}} noValidate>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="breedName">Name</label>
                            <input id="breedName" className="form-control" value={name} onChange={event => setName(event.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="breedOrigin">Origin</label>
                            <input id="breedOrigin" className="form-control" value={origin} onChange={event => setOrigin(event.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="breedWeight">Weight (kg)</label>
                            <input id="breedWeight" className="form-control" type="number" min="1" step="1" value={weight} onChange={event => setWeight(event.target.value)} required />
                        </div>
                    </div>
                    <div className="form-check my-3">
                        <input id="breedActive" className="form-check-input" type="checkbox" checked={isActive} onChange={event => setIsActive(event.target.checked)} />
                        <label className="form-check-label" htmlFor="breedActive">Active listing</label>
                    </div>
                    {errorMessage !== "" && <p className="text-danger" role="alert">{errorMessage}</p>}
                    <div className="buttonContainer">
                        <button className="btn btn-success" type="submit">{editId === 0 ? "Add breed" : "Save changes"}</button>
                        {editId !== 0 && <button className="btn btn-secondary" type="button" onClick={clearForm}>Cancel</button>}
                    </div>
                </form>
            </article>
        </section>
    )
}
