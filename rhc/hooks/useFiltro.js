import React,{useEffect,useState} from 'react'
import axios from 'axios'
import getConfig from "next/config"
import {numRooms,numBedRooms, numBathRooms, pets} from '../pages/offers/sevices/const'


const { publicRuntimeConfig } = getConfig()


export default function useFiltro() {
  const [category,setCategory] = useState('')
  const [categoryQ,setCategoryQ] = useState('')

  const [categories,setcategories] = useState([])
  
  const [intervalos,setIntervalos] = useState([])
  const [intervalo,setIntervalo] = useState('')
  const [intervaloQ,setIntervaloQ] = useState('')

  const [rooms,setRooms] = useState('')
  const [roomsQ,setRoomsQ] = useState('')

  const [bedrooms,setBedrooms] = useState('')
  const [bathrooms,setBathrooms] = useState('')
  const [pets,setPets] = useState('')
  const [valores,setValores] = useState(null)
  const [seleccion,setSeleccion] =useState('')


  const handleCategory = (e)=>{
    setCategory(e.target.value)
    setCategoryQ(`p.category.id==`+ e.target.value)
    obtenerQuery()
  }
  const handlePrice = (prices)=>{
    if(prices){
      setValores(`price>=${prices.from}&price<=${prices.to}`)
    }else
    {setValores(null)}  
  }



useEffect(() => {
    const obtenercategorys = async ()=>{
      const resultado  = await axios.get(`${publicRuntimeConfig.API_URL}/categories`)
     setcategories(resultado.data) }

     obtenercategorys()

     const obtenerIntervalos = async ()=>{
      const resultadoIntervalos  = await axios.get(`${publicRuntimeConfig.API_URL}/intervals`)
     setIntervalos(resultadoIntervalos.data) }

     console.log('veces')
     obtenerIntervalos()},[])
    

     
const obtenerQuery = ()=>{const str = [(category ? categoryQ : ''),
             (rooms ? rooms : ''),
             (bedrooms ? bedrooms : ''),
             (bathrooms ? bathrooms : ''),
             (pets ? pets : ''),
             (valores ? valores : '')]
const query = []
str.map(s=>{
  if(s!=='') query.push(s)
})
setSeleccion(query.join('&&'))
//console.log('filtro',str,'seleccion',seleccion) 
}

const FiltroUI = ()=>{
  return (
    <>
      <form action=''>
        <div className='row'>
          <div className='col-12 mb-2 my-2'>
            <select
              className='col-12 col-md-2 small custom-select'
              value={category}
              onChange={(e) => handleCategory(e)}
            >
              <option value=''>Filter by Category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              className='col-12 col-md-2 small custom-select'
              value={intervalo}
              onChange={(e) => handlePrice(e.target.value)}
            >
              <option value=''>Filter by Price</option>
              {intervalos.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.from}-{item.to}
                </option>
              ))}
            </select>
            <select
              className='col-12 col-md-2 small custom-select'
              value={bedrooms}
              onChange={(e) => setBedrooms(`p.bedroom==`+e.target.value)}
            >
              <option value=''>Filter by Bedrooms</option>
              {numRooms.map((num) => (
                <option value={num.id} key={num.value}>
                  {num.value} Bedrooms
                </option>
              ))}
            </select>
            <select
              className='col-12 col-md-2 small custom-select'
              value={bathrooms}
              onChange={(e) => setBathrooms(`p.bathroom==`+e.target.value)}
            >
              <option value=''>Filter by Bathrooms</option>
              {numRooms.map((num) => (
                <option value={num.id} key={num.value}>
                  {num.value} Bathrooms
                </option>
              ))}
            </select>
            <select
              className='col-12 col-md-2 small custom-select'
              value={rooms}
              onChange={(e) => setRooms(`p.rooms==`+e.target.value)}
            >
              <option value=''>Filter by Rooms</option>
              {numRooms.map((num) => (
                <option value={num.id} key={num.value}>
                  {num.value} Rooms
                </option>
              ))}
            </select>
            <select
              className='col-12 col-md-2 small custom-select'
              value={pets}
              onChange={(e) => setPets(`pets_allowed==`+e.target.value)}
            >
              <option value=''>Filter by Pets</option>
              <option value='1'>Allowed Pets</option>
              <option value='0'>Filter by Pets</option>
            </select>
          </div>
        </div>
      </form>

      <button className='btn btn-info btn-block'>Reset</button>
    </>
  )
}

  return {
    FiltroUI,
    filtro:seleccion,
    
  }
  
}
