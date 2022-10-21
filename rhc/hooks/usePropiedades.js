import React from 'react'
import Cards from '../components/Cards'

export default function usePropiedades(propiedades) {
 console.log(propiedades)
  const Propiedades = () =>{
      return propiedades.map((offer)=> <Cards offer={offer} key={offer.id}/>)
  }

  return {
    Propiedades
  }
}
