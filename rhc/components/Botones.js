import React from 'react'
import { useRouter } from 'next/router'


export default function Botones({page,lastPage}) {
  const router = useRouter()

  return (
    <>
      <div className="btnPaginate">
      <button onClick={() => router.push(`/offers?page=${page - 1}`)}
        disabled={page <= 1} className="previous">previous</button>
      <button onClick={() => router.push(`/offers?page=${page + 1}`)}
        disabled={page >= lastPage} className="next">next</button>
      </div>
    </>
  )
}
