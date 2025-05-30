import React from 'react'
import './Home.css'
import fishData from './fishData'
import FishCard from './fishCard'
import FishList from './fishList'

type Props = {}

function Home({}: Props) {
  return (
    <div >

   {/*  {fishData.map((fish) => (
        <div key={fish.id}>
          <h2>{fish.name}</h2>
          <img src={fish.image} alt={fish.name} width="200" />
          <p>{fish.description}</p>
          <p>Price: {fish.pricePerKg} QR/kg</p>
          <p>Min Weight: {fish.minWeight} kg</p>
          <p>Cleaning Options: {fish.cleaningOptions.join(', ')}</p>
        </div>
      ))} */}
    <FishList/>
    <img src="https://masskaronline.com/uploads/images/poster/center2.jpg" alt="poster ad" style={{maxWidth:'100%'}} />

    </div>
  )
}

export default Home