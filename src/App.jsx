import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
function App() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, []);
  return (
      <main>
        <Container>
          <Row>
            {product.map((product) => (
            <Col md={3} span={10} key={product.id}>
              <Card>
                <Card.Img src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                  {product.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Prix :</strong> {product.price} €
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
              ))}
          </Row>
        </Container>
      </main>
  );
}

export default App;
