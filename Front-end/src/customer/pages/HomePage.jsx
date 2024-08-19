import React, { useEffect, useState } from 'react'
import MainCrosel from '../components/HomeCrosel/MainCrosel'
import HomeSectionCarosel from '../components/HomeSectionCrosel/HomeSectionCarosel'
import All_API from '../../State/Auth/All_API';

const HomePage = () => {

  const [productsTopSell, setProductsTopSell] = useState([]);
  const [productsNew, setProductsNew] = useState([]);



  async function getProductTopSell(data) {
    try{
      const response = await All_API.getAllProducts(data)
      setProductsTopSell(response.data.data.products)

    }catch {
      
    }
  }


  async function getProductNew(data) {
    try{
      const response = await All_API.getAllProducts(data)
      setProductsNew(response.data.data.products)

    }catch {
      
    }
  }

  useEffect(()=> {
    const dataTopSell = {
      categoryId: '',
      colors:  '',
      sizes:  '',
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort:'stock_high',
      page: '',
      limit: 10,
      keyword:'',
    }

    const dataProductNew = {
      categoryId: '',
      colors:  '',
      sizes:  '',
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort:'id_high',
      page: '',
      limit: 10,
      keyword:'',
    }
    
    getProductTopSell(dataTopSell)
    getProductNew(dataProductNew)
  }, [])


  return (
    <div>
      <MainCrosel/>
      <HomeSectionCarosel data={productsTopSell} sectionName={"Top Selling"}/>
      <HomeSectionCarosel data={productsNew} sectionName={"New Arrival"}/>

    </div>
  )
}

export default HomePage
