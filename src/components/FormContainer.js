import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row >
        <Col xs={12} md={8}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
