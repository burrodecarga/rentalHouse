import React from 'react'
import getConfig from "next/config"


const { publicRuntimeConfig } = getConfig()


export default function Cards({offer}) {
  return (
    <div className="card card-map p-2 mx-auto" >
    <img 
     src={publicRuntimeConfig.API_URL + offer.cover?.url}
     alt={offer.offer}
     className="card-img-top"
     />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  )
}
