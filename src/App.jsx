import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
function App() {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products/1");
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, []);
  return (
    product && (
      <main>
        <Container>
            <Card>
              <Card.Img src={product.image} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <strong>Prix :</strong> {product.price} €
                </Card.Text>
                {product.description}
              </Card.Body>
            </Card>
        </Container>
      </main>
    )
  );
}

export default App;
