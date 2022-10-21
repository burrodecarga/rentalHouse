import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import getConfig from "next/config"
import Botones from '../../components/Botones'
import Cards from '../../components/Cards'
import Select from 'react-select'
import {numRooms,numBedRooms, numBathRooms, pets} from '../offers/sevices/const'


export default function MapOffers({offers,page,numOffers,allOffers,categories,intervals}) {
const lastPage = Math.ceil(numOffers / limit)
const [datos,setDatos] = useState(allOffers)
const [filtrado,setFiltrado] = useState([])
  
const [category,setCategory] = useState(null)
const [valores,setValores] = useState(null)

const [room,setRoom] = useState(null)
const [bathRoom,setBathRoom] = useState(null)
const [bedRoom,setBedRoom] = useState(null)
const [pet,setPet] = useState(false)
  
// const [opciones,setOpciones] = useState('')

const handleCategory = (value)=>{
  (value ? setCategory(`category.id=${value}`):setCategory('')) 
}

const handlePrice = (prices)=>{
  if(prices){
    setValores(`price>=${prices.from}&price<=${prices.to}`)
  }else
  {setValores(null)}

}

const handleRoom = (room)=>{
  (room && setRoom(`rooms=${room.value}`)) 
}

const handleBedRoom = (bedRoom)=>{
  (bedRoom ? setBedRoom(`bedroom=${bedRoom.value}`):setBedRoom('')) 
}

const handleBathRoom = (bathRoom)=>{
  (bathRoom ? setBathRoom(`bathroom=${bathRoom.value}`):setBathRoom('')) 
}

const handlePets = (value)=>{
  (value ? setPet(`pets=1`):setPet(false)) 
}

useEffect(() => {
const str = [(category ? category : ''),(room ? room : ''),(bedRoom ? bedRoom : ''),(bathRoom ? bathRoom : ''),(pet ? pet : ''),(valores ? valores : '')]
//console.log('filtro',str)  
const query = []
str.map(s=>{
  if(s!=='') query.push(s)
})
const filtro =query.join('&')
if(filtro){
console.log('hayFiltro',filtro)
const obtenerFiltradas= async ()=>{
const resFiltradas = await fetch(`${publicRuntimeConfig.API_URL}/offers?${filtro}`)
const allFilterOffers = await resFiltradas.json()
setFiltrado(allFilterOffers)
console.log(filtrado)
} 
obtenerFiltradas()
}else{
console.log('No Hay Filtro')
}

  
}, [category,valores,room,bedRoom,bathRoom,pet])


  return (
    <Layout>
     <div className="row">
{/*        <div className="col-12 col-md-2 ">
       <button className="btn btn-info btn-block mb-2">Filter</button>  

        <Select
         isClearable = "true"
         getOptionLabel = {option=>option.name}
         options  = {categories}
         instanceId="categories"
         placeholder = "by Category"
         className="mb-2 small"
         onChange ={value=>handleCategory(value? value.id:null)}
          />
        <Select
         getOptionLabel = {option=>option.from +' $ - '+option.to+' $'}
         options  = {intervals} 
         instanceId="intervals"
         placeholder = "by Price ($)"
         className="small"
         className="mb-2 small"
         isClearable = "true"
         onChange ={value=>handlePrice(value? value:null)}
         />

        <Select
         isClearable = "true"
         getOptionLabel = {option=>option.label+' rooms'}
         options  = {numRooms}
         instanceId="numRooms"
         placeholder = "by Rooms"
         className="mb-2 small"
         onChange ={value=>handleRoom(value? value:null)}
          />

<Select
         isClearable = "true"
         getOptionLabel = {option=>option.label+ ' bedrooms'}
         options  = {numBedRooms}
         instanceId="numBedRooms"
         placeholder = "by Bedrooms"
         className="mb-2 small"
         onChange ={value=>handleBedRoom(value? value:null)}

          />

<Select
         isClearable = "true"
         getOptionLabel = {option=>option.label + ' bathrooms'}
         options  = {numBathRooms}
         instanceId="numBathRooms"
         placeholder = "by Bathrooms"
         className="mb-2 small"
         onChange ={value=>handleBathRoom(value? value:null)}

          />

<Select
         isClearable = "true"
         getOptionLabel = {option=>option.label}
         options  = {pets}
         instanceId="pets"
         placeholder = "by Pets"
         className="mb-2 small"
         onChange ={value=>handlePets(value? value.value:null)}
          />
        <button className="btn btn-info btn-block">Reset</button>  
          
       </div>
        */}
        <div className="col-12 col-md-12 d-flex flex-wrap">
         <div className="col-12 d-flex flex-wrap align-items-center">
        {
          offers.map((offer)=> <Cards offer={offer} key={offer.id}/>)
        }
         </div>
       <div className="col-12 mt-2 mr-2">
              <Botones page={page} lastPage={lastPage}/>
       </div>
      
       </div>
     </div>
    </Layout>
  )
}

const { publicRuntimeConfig } = getConfig()
const limit = 12
export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * limit

  const resOffers = await fetch(`${publicRuntimeConfig.API_URL}/offers/count`)
  const numOffers = await resOffers.json()

  const resCategories = await fetch(`${publicRuntimeConfig.API_URL}/categories`)
  const categories = await resCategories.json()

  const resProperties = await fetch(`${publicRuntimeConfig.API_URL}/properties`)
  const properties = await resProperties.json()

  const resIntervals = await fetch(`${publicRuntimeConfig.API_URL}/intervals`)
  const intervals = await resIntervals.json()




  const resPets = await fetch(`${publicRuntimeConfig.API_URL}/pets`)
  const pets = await resPets.json()

  const resAll = await fetch(`${publicRuntimeConfig.API_URL}/offers`)
  const allOffers = await resAll.json()


  const res = await fetch(`${publicRuntimeConfig.API_URL}/offers?_limit=${limit}&_start=${start}`)
  const offers = await res.json()
  


  return {
    props: {
      offers: offers,
      allOffers:allOffers,
      page: +page,
      numOffers: numOffers,
      pets:pets,
      categories:categories,
      properties:properties,
      intervals:intervals
    }, // will be passed to the page component as props
  }
}

