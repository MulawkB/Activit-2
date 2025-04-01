import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const datas = await response.json();
      setProducts(datas);
    }
    fetchProducts();
  }, []);

  async function AddProducts() {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Produit de test",
        price: 29.99,
        description: "Un super produit ajouté via API",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });
    const data = await response.json();

    alert("Le produit avec l'id " + data.id + " a été créé");
  }
  return (
    <main>
      <Container className="my-4">
        <Button variant="primary" className="mb-3" onClick={AddProducts}>
          Ajouter un produit
        </Button>
        <Row className="gy-3">
          {products.map((products) => (
            <Col md={3} lg={3} key={products.id}>
              <Card className="h-100">
                <Card.Img
                  variant={top}
                  src={products.image}
                  alt={products.title}
                />
                <Card.Body>
                  <Card.Title>{products.title}</Card.Title>
                  <Card.Text>{products.description}</Card.Text>
                  <Card.Text>Prix : {products.price} €</Card.Text>
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
