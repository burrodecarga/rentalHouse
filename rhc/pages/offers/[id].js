import React,{useState,useEffect} from "react"
import Link from 'next/link'
import Layout from "../../components/Layout"
import getConfig from "next/config"
import styles from "../offers/Offers.module.css"
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import NumberFormat from 'react-number-format'


export default function Detail({ offer }) {
  const [fotos,setFotos] = useState([])
  const [cantidad, setCantidad] = useState(0)
  const [current, setCurrent] = useState(0)
  const [length,setLength] = useState(0);




  useEffect(()=>{
      if(offer.images){
    const imagenes = offer.images.map(img=>(img.formats.medium.url))
    console.log(imagenes)
    setCantidad(imagenes.length)
    setLength(imagenes.length)
    setFotos(imagenes)
  }
  },[])

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(fotos) || fotos.length <= 0) {
    return null;
  }

  return (
    <>
      <Layout>
      <section className={styles.slider}>
      <FaArrowAltCircleLeft className={styles.leftArrow} onClick={prevSlide} enabled={current !== 0}/>
      <FaArrowAltCircleRight className={styles.rightArrow} onClick={nextSlide} enabled={current !== length}/>
      {fotos.map((slide, index) => {
        return (
          <div
            className={index === current ? 'styles.slide, styles.active' : 'styles.slide'}
            key={index}
          >
            {index === current && (
              <img  src={publicRuntimeConfig.API_URL + slide}
               alt='travel image' 
               className={styles.image} />
            )}
          </div>
        );
      })}
    </section>
    <section className="mt-10">
      <div className="row">
        <div className="col-12 col-md-6">
        <ul class="list-group">
  <li class="list-group-item active" aria-current="true"><h3><strong>{offer.offer}</strong></h3></li>
  <li class="list-group-item"> <p>{offer.detail}</p></li>
  <li class="list-group-item"><h4><strong>Price : 
              <NumberFormat value={offer.price} displayType={'text'} 
              thousandSeparator={true} prefix={'$'} /></strong>
           /mo</h4></li>
  <li class="list-group-item"><strong>{(offer.pets_allowed ? 'Pets Allowed':' No allowed Pets')}</strong></li>
  <li class="list-group-item">{offer.address}</li>
</ul>
          
         
          
          <p>{new Date(offer.created_at).toLocaleString()}</p>
        </div>
        <div className="col-12 col-md-3">
        <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Dteails, Square feets : {offer.sqft} </li>
  <li class="list-group-item">Rooms : {offer.rooms}</li>
  <li class="list-group-item">Bathrooms : {offer.bathroom}</li>
  <li class="list-group-item">Bedrooms : {offer.bedroom}</li>
  <li class="list-group-item">Livin Romm : {offer.living_room}</li>
  <li class="list-group-item">Garage : {offer.garage}</li>
  <li class="list-group-item">Porch : {offer.porch}</li>
  <li class="list-group-item">Nursey : {offer.nursey}</li>
</ul>
        </div>
        <div className="col-12 col-md-3">
        <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Aditional</li>
  {offer.pets.map(pet=>{
    return(
      <>
      <ul class="list-group">
         <li class="list-group-item">Pet: {pet.type} Limit: {pet.limit} Fees : 
         <strong> <NumberFormat value={pet.fees} displayType={'text'} 
              thousandSeparator={true} prefix={'$'} /></strong>
          </li>
      </ul>
      <div>
        <h4>Policy</h4>
         <p>{pet.policy}</p>
      </div>
     
      </>
    )    

  } )}
</ul>
        </div>

      </div>
    </section>
  

</Layout>
    </>
  )}

const { publicRuntimeConfig } = getConfig()

export async function getServerSideProps(context) {
  const { id } = context.query
  const res = await fetch(`${publicRuntimeConfig.API_URL}/offers?id=${id}`)
  const data = await res.json()

  return {
    props: {
      offer: data[0],
    },
  }
}
