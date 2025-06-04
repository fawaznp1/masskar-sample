import React from 'react'
import './Home.css'
import fishData from './fishData'
import FishCard from './fishCard'
import FishList from './fishList'
import Cart from './Cart'

type Props = {}

function Home({}: Props) {
  return (
    <div className='' >

  
    <FishList/>
    <img className='mt-5' src="https://masskaronline.com/uploads/images/poster/center2.jpg" alt="poster ad" style={{maxWidth:'100%'}} />

    </div>
  )
}

export default Home