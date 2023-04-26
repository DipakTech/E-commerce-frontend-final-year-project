import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RecommendationContext } from "../App";
import Rating from "./Rating";

const SimilarityRecommendation = ({ recommendation }) => {

  const {setRecommendation } = useContext(
    RecommendationContext
  )


    const getProductRecommendation = async (name) => {
      const response = await fetch(
        `http://dipakgiri.pythonanywhere.com/api/get-products?text=${encodeURIComponent(
          name
        )}`
      )
      const data = await response.json()
      setRecommendation(data)
    }

  return (
    <>
      <h1>Similar product recommendation</h1>
      <Row>
        {recommendation.map((product) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={product.id}
            onClick={() => getProductRecommendation(product.name)}
          >
            <Card className='my-3 p-3 rounded'>
              <Link to={`/product/${product.id}`}>
                <Card.Img
                  src={`${product.image}`}
                  variant='top'
                />
              </Link>

              <Card.Body>
                <Link to={`/product/${product.id}`}>
                  <Card.Title as='div'>
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>

                <Card.Text as='div'>
                  <Rating value={`${product.rating}`} text='4 reviews' />
                </Card.Text>

                <Card.Text as='h3'>{`$${product.price}`}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
};

export default SimilarityRecommendation;
