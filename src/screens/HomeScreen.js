import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import PopularProduct from '../components/PopularProduct'
import { RecommendationContext } from '../App'

const HomeScreen = ({ match }) => {
  const { recommendation, setRecommendation } = useContext(RecommendationContext);
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const [similarProducts, setSimilarProducts] = useState([]);
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber,recommendation])

  const getProductRecommendation = async(name) => {
    const response = await fetch(
      `http://dipakgiri.pythonanywhere.com/api/get-products?text=${encodeURIComponent(
        name
      )}`
    )
    const data = await response.json();
    setRecommendation(data);
  }
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
{/*
 <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">popular products</h2>

        <div className="mt-6 grid grid-cols-3 gap-y-10 gap-x-6 sm:grid-cols-1 bg-gray-500 lg:grid-cols-2 xl:gap-x-8">
          {popularProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className=" object-cover object-center h-[300px] w-[300px] "
                />
              </div>
              <p className="py-10 text-2xl text-white">hello</p>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
 */}
              {/* <PopularProduct data={ similarProducts} /> */}

          <h1>Latest Products</h1>

          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}
              onClick={()=>getProductRecommendation(product.name)}
              >
                <Product product={product} data={ similarProducts} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
