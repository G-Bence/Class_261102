import type { DogBreed } from '../types/dogBreedType'

export default function Home(props: {listDogBreeds: DogBreed[]}) {
    return (
        <section className="contentContainer container bg-light p-4 rounded">
            <h2>Dog breeds</h2>
            <p>Some dog breeds and their approximate adult weights.</p>
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr><th>Name</th><th>Origin</th><th>Weight (kg)</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {props.listDogBreeds.map(dog => (
                            <tr key={dog.id}>
                                <td>{dog.name}</td><td>{dog.origin}</td><td>{dog.weight}</td>
                                <td><span className={dog.isActive ? "badge bg-success" : "badge bg-secondary"}>{dog.isActive ? "Active" : "Inactive"}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {props.listDogBreeds.length === 0 && <p>No dog breeds to display.</p>}
        </section>
    )
}
