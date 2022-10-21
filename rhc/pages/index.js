import Layout from "../components/Layout"
import Link from "next/link"
import getConfig from "next/config"
import axios from "axios"
import NumberFormat from 'react-number-format'
import { useRouter } from 'next/router'



const limit = 3



const Index = ({ offers, page, numOffers }) => {
  const { API_URL } = process.env
  //console.log(resultados,publicRuntimeConfig.API_URL)
  const lastPage = Math.ceil(numOffers / limit)
  const router = useRouter()


  return (
    <Layout>
      {/* Porfolio */}
      <section>
        <div className='row'>
          <div className='col-12 col-md-12'>
            <div className='card card-body bg-dark'>
              <div className='row'>
                <div className='col-md-12 my-2'>
                  <h1 className='text-center text-light'>Offers</h1>
                </div>
                {offers.map((offer) => {
                  return (
                    <div className='col-md-4 p-2 h-80' key={offer.id}>
                      <div className='card h-100'>
                        <div className='overflow'>
                          <img
                            src={publicRuntimeConfig.API_URL + offer.cover?.url}
                            alt={offer.offer}
                            className='card-img-top img-thumbnail'
                          />
                        </div>
                        
                        <div className='card-body'>
                          <h3>{offer.offer}</h3>
                          <p>{offer.detail.substr(0, 180)}</p>
                          <h4>Price <strong>
                          <NumberFormat value={offer.price} displayType={'text'} 
                             thousandSeparator={true} prefix={'$'} /></strong>
                          /mo
                         </h4>
                          <div className='row'>
                            <div className='col-md-6'>
                              <ul className='list-group'>
                                <li className='list-group-item py-1'>
                                  rooms : {offer.rooms}
                                </li>
                                <li className='list-group-item py-1'>
                                  bedrooms : {offer.bedroom}
                                </li>
                                <li className='list-group-item py-1'>
                                  bathrooms : {offer.bathroom}
                                </li>
                              </ul>
                            </div>
                            <div className='col-md-6'>
                              <ul className='list-group'>
                                <li className='list-group-item py-1'>
                                  sqft : {offer.sqft} ft
                                </li>
                                <li className='list-group-item py-1'>
                                  pets :{offer.pets_allowed}
                                </li>
                                <li className='list-group-item py-1'>
                                  garage : {offer.garage}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-center">
                          <Link href='/offers/[id]' as={`/offers/${offer.id}`} >  
                          <a href='#!' className='btn btn-info mb-4 my-2' >Know More</a>
                          </Link>

                          <Link href='/tour'>  
                          <a href='#!' className='btn btn-success mb-4 my-2' >Request Tour</a>
                          </Link>
                          </div>                 

                        </div>
                      </div>
                    </div>
                 )
                })}

                <div className='col-md-12 mt-4'>
                  <div className='text-center'>
                    <Link href='/offers'>
                      <a className='btn btn-outline-light'>More Offers</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</Layout>
  )
}

const { publicRuntimeConfig } = getConfig()
export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * limit

  const resOffers = await fetch(`${publicRuntimeConfig.API_URL}/offers/count`)
  const numOffers = await resOffers.json()

  const res = await fetch(`${publicRuntimeConfig.API_URL}/offers?_sort=id:desc`)
  const offers = await res.json()
  

  const resultados = await axios.get(`${publicRuntimeConfig.API_URL}/offers`)

  return {
    props: {
      offers: offers,
      resultados: resultados.data,
      page: +page,
      numOffers: numOffers,
    }, // will be passed to the page component as props
  }
}

export default Index
