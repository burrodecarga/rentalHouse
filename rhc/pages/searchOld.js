import React, {useEffect,useState} from 'react'
import axios from 'axios'
import usePropiedades from '../hooks/usePropiedades'
import useFiltro from '../hooks/useFiltro'
import getConfig from "next/config"
import Layout from '../components/Layout'


const { publicRuntimeConfig } = getConfig()


export default function Search() {
  const [propiedades,setPropiedades] = useState([])
  const [filtradas,setFiltradas] = useState([])
  const {Propiedades} = usePropiedades(filtradas)
  const {FiltroUI,filtro} = useFiltro()

useEffect(() => {
    console.log(filtro,'filtro')
 if(filtro){
   

  }else{
  const obtenerPropiedades = async ()=>{
   const resultado  = await axios.get(`${publicRuntimeConfig.API_URL}/offers`)
   setPropiedades(resultado.data)
   setFiltradas(resultado.data)
  } 
  obtenerPropiedades()
  console.log('Sin filtro')
  }
  
}, [filtro])

  return (
    <>
    <Layout>
      <div className="col-12">
       <FiltroUI />
      </div>
       <div className="col-12 col-md-12 d-flex flex-wrap">
         <div className="col-12 d-flex flex-wrap align-items-center">
           <Propiedades/>
        </div>
      </div>
      </Layout>
    </>
  )
}
