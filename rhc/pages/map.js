import React, { useState, useRef } from "react";
import useSwr from "swr";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import getConfig from "next/config"
import styles from '../components/map.module.css'
import Link from 'next/link'
import Layout from '../components/Layout';


const { publicRuntimeConfig } = getConfig()

const fetcher = (...args) =>fetch(...args).then(response=>response.json())

export default function offersMap() {

  const base ={
    latitude:  10.261404748708388, 
    longitude:-68.01590820704736,
    width:"100vw",
    height:"100vh",
    zoom:12 
  }
  //configurar Mapa
  const [viewport, setViewport] = useState({
    latitude:  10.261404748708388, 
    longitude:-68.01590820704736,
    width:"100vw",
    height:"100vh",
    zoom:12
  })


  const mapRef = useRef()

  //cargar datos
  const url = `${publicRuntimeConfig.API_URL}/offers`
  const {data, error} = useSwr(url,fetcher)

  const houses = data && !error ? data:[]
  
  const points = houses.map(house => ({
    type: "Feature",
    properties: { cluster: false, houseId: house.id, category: house.category },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(house.longitude),
        parseFloat(house.latitude)
      ]
    }
  }));

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

const botonea = (e)=>{
  console.log(e)
  alert(e.target.value,e)

}


  return (
    <>
      <ReactMapGL {...viewport} 
      maxZoom={20} 
      mapboxApiAccessToken={"pk.eyJ1IjoiYnVycm9kZWNhcmdhIiwiYSI6ImNrbWdvYTZlczEyYnMycHBxN3FlOGdnM3gifQ.RkZ-uCjHRBG5ggm2ocAnvw"}
      onViewportChange={(newViewport)=>{
        setViewport({...newViewport} )
      }}
      ref={mapRef}
      >
                          <Link href='/' >  
                          <a href='#!' className='btn btn-info m-2 ' >Home</a>
                          </Link>
      {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className={styles.clusterMarker}
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                  setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}

                  onDoubleClick={() => {
                   
                  setViewport({
                      ...viewport,
                      latitude:  10.261404748708388, 
                      longitude:-68.01590820704736,
                      width:"100vw",
                      height:"100vh",
                       zoom:12,  
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}                 
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`house-${cluster.properties.houseId}`}
              latitude={latitude}
              longitude={longitude}
              
            >
                <Link href='/offers/[id]' as={`/offers/${cluster.properties.houseId}`} > 
<button className={styles.houseMarker} 
              onClick={botonea}
              value={cluster.properties.houseId}
              >
                <img src="/home.svg" alt="home-swett" 
                className={styles.houseMarkerImg}                           
                />
              </button>
              </Link>
             
            </Marker>
          );
        })}
      </ReactMapGL>
      </>
  )
}


