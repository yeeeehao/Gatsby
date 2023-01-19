import * as React from "react"
import { Card, Button } from "react-bootstrap"

function WineCard(props) {
  const { winery, image, wine, price, handleClick } = props
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img
        variant="top"
        src={image}
        style={{ width: "100%", height: "20rem", objectFit: "scale-down" }}
      />
      <Card.Body>
        <Card.Title>
          {winery} - {price} Baht
        </Card.Title>
        {/* <Card.Text>description}</Card.Text> */}
        <Button variant="primary" onClick={handleClick}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  )
}

export default WineCard
