import "./Home.css";
import React from 'react'

const Home = () => {
  return (
    <div >
      *This image will be replaced with a high resolution image of the band.*
      <img src={require("../../assets/bandImage.jpg")} alt="band" className="homeImage" width={"80%"}/>
    </div>
  )
}

export default Home;