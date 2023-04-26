import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const PopularProduct = ({data}) => {
  return <>
    <h1>Popular products recommendation</h1>
    <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Card className='my-3 p-3 rounded'>
            <Link to="/product/recom-1">
              <Card.Img src="https://www.edesk.com/wp-content/uploads/elementor/thumbs/find-trending-products-sell-ecommerce-pu354k2ujj4ixwcs8k602o6nn2es1ufsy30kw2b9go.png" variant='top' />
            </Link>

            <Card.Body>
              <Link to={`/product/1`}>
                <Card.Title as='div'>
                  <strong>random name</strong>
                </Card.Title>
              </Link>

              <Card.Text as='div'>
                <Rating
                  value="4.5"
                  text="4 reviews"
                />
              </Card.Text>

              <Card.Text as='h3'>$455.66</Card.Text>
            </Card.Body>
        </Card>
        </Col>

      {/* another product */}

        {/* end of product */}

    </Row>
  </>;
};

export default PopularProduct;
