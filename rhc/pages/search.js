import React,{useState} from 'react'
import Select from 'react-select'
import Layout from '../components/Layout'
import Cards from '../components/Cards'
import getConfig from "next/config"
import {useQuery,useQueryClient} from 'react-query'
import {numRooms,numBedRooms, numBathRooms, pets} from '../pages/offers/sevices/const'



const { publicRuntimeConfig } = getConfig()

const getOffers = async (key)=>{
  // console.log(key.queryKey[1])
  const catId = key.queryKey[1].category
  const bedId = key.queryKey[1].bedrooms
  const bathId = key.queryKey[1].bathrooms
  const roomId = key.queryKey[1].rooms
  const petsId = key.queryKey[1].pets
  const fromID = key.queryKey[1].priceF
  const toID = key.queryKey[1].priceT

  const query = []

  if(catId){query.push(`category.id=${catId}`)}
  if(bedId){query.push(`bedroom=${bedId}`)}
  if(bathId){query.push(`bathroom=${bathId}`)}
  if(roomId){query.push(`rooms=${roomId}`)}
  if(petsId){query.push(`pets_allowed=${petsId}`)}
  if(fromID){query.push(`price_gte=${fromID}`)}
  if(toID){query.push(`price_lte=${toID}`)}

  console.log(catId,bedId,bathId,roomId,petsId,fromID,toID,query)
  const str =`?${query.join('&')}`

  console.log(str)

  const resOffers = await fetch(`${publicRuntimeConfig.API_URL}/offers${str}`)
  return resOffers.json()
}


export default function Search({offers,category,intervals}) {

  const [categoryID,setCategoryID] =useState(null)
  const [numBedRoomsID,setNumBedRoomsID] =useState(null)
  const [numBathRoomsID,setNumBathRoomsID] =useState(null)
  const [numRoomsID,setNumRoomsID] =useState(null)
  const [allowed,setAllowed] =useState(null)
  const [fromID,setFromID] =useState(null)
  const [toID,setToID] =useState(null)







  const queryClient = useQueryClient()
  const {data,status} =useQuery(['offers',{category:categoryID, 
                                           bedrooms:numBedRoomsID,
                                           bathrooms:numBathRoomsID,
                                           rooms:numRoomsID,
                                           pets:allowed,
                                           priceF:fromID,
                                           priceT:toID
                                          }],getOffers,{initialData: offers})



  const handlePets = (value)=>{
    //console.log(value)
   (value ? setAllowed(value):setAllowed(false)) 
  }

  const handlePrice = (prices)=>{
    if(prices){
      setToID(prices.to)
      setFromID(prices.from)

    }else
    {
      setToID(null)
      setFromID(null)

    }
  }
  

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-12 col-md-2">
            <Select
            getOptionLabel={option=>option.name}
            getOptionValue={option=>option.id}
            options={category}
            instanceId="category"
            isClearable
            onChange={value=>setCategoryID(value ? value.id: null)} 
            className="small"
            placeholder="filter by Category"
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
            getOptionLabel={option=>option.value+' bedrooms'}
            getOptionValue={option=>option.value}
            options={numBedRooms}
            instanceId="numBedRooms"
            isClearable
            onChange={value=>setNumBedRoomsID(value ? value.value: null)} 
            className="small"
            placeholder="filter by Bedrooms"
            />

<Select
            getOptionLabel={option=>option.value+' bathdrooms'}
            getOptionValue={option=>option.id}
            options={numBathRooms}
            instanceId="numBathRooms"
            isClearable
            onChange={value=>setNumBathRoomsID(value ? value.value: null)} 
            className="small"
            placeholder="filter by Bathrooms"
            />

<Select
            getOptionLabel={option=>option.value+' Rooms'}
            getOptionValue={option=>option.id}
            options={numRooms}
            instanceId="numRooms"
            isClearable
            onChange={value=>setNumRoomsID(value ? value.value: null)} 
            className="small"
            placeholder="filter by Rooms"
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

          </div>
          <div className="col-12 col-md-10">
            <div className="col-12 col-md-3">
              {status === 'loading' && <div>Data is loading</div>}
              {status === 'error' && <div>Error in loading</div>}

           {status === 'success' && data.map((offer)=> <Cards offer={offer} key={offer.id}/>)}        
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function  getServerSideProps() {


  const res = await fetch(`${publicRuntimeConfig.API_URL}/offers`)
  const data = await res.json()

  const resCategory = await fetch(`${publicRuntimeConfig.API_URL}/categories`)
  const dataCategory = await resCategory.json()

  const resIntervals = await fetch(`${publicRuntimeConfig.API_URL}/intervals`)
  const intervals = await resIntervals.json()

  return{
    props:{
      offers: data,
      category:dataCategory,
      intervals
    }
  }
  
}