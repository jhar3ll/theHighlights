import "./Home.css";
import React from 'react'

const Home = () => {
  return (
    <div >
      <img src={require("../../assets/bandImage.jpg")} alt="band" className="homeImage" width={"80%"}/>
    </div>
  )
}

export default Home;