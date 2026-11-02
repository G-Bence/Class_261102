import { useState } from 'react'
import Header from './components/header'
import Home from './components/home'
import Admin from './components/admin'
import Moderator from './components/moderator'
import Footer from './components/footer'
import type { DogBreed } from './types/dogBreedType'

function App() {
  const [currentPage, setCurrentPage] = useState<string>("Home")
  const [listDogBreeds, setListDogBreeds] = useState<DogBreed[]>([
    {id: 1, name: "Labrador Retriever", origin: "United Kingdom", weight: 30, isActive: true},
    {id: 2, name: "German Shepherd", origin: "Germany", weight: 35, isActive: true},
    {id: 3, name: "Beagle", origin: "United Kingdom", weight: 12, isActive: false},
    {id: 4, name: "Puli", origin: "Hungary", weight: 13, isActive: true},
    {id: 5, name: "Shiba Inu", origin: "Japan", weight: 10, isActive: false}
  ])

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container my-4 p-0">
        {currentPage === "Home" && <Home listDogBreeds={listDogBreeds} />}
        {currentPage === "Admin" && <Admin listDogBreeds={listDogBreeds} setListDogBreeds={setListDogBreeds} />}
        {currentPage === "Moderator" && <Moderator listDogBreeds={listDogBreeds} setListDogBreeds={setListDogBreeds} />}
      </main>
      <Footer />
    </>
  )
}

export default App
