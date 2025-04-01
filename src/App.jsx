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

  async function addProduct() {
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
  async function editProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Produit mis à jour",
        price: 49.99,
        description: "Description mise à jour",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });
    const data = await response.json();
    alert("Le produit avec l'id " + data.id + " a été modifié");
  }
  async function editPrice(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: 5,
      }),
    });
    const data = await response.json();
    alert("Le prix du produit avec l'id " + data.id + " a été modifié");
  }

  return (
    <main>
      <Container className="my-4">
        <Button variant="outline-primary" className="mb-3" onClick={addProduct}>
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
                <Button
                  variant="outline-info"
                  className="mb-2 ml-2 mr-2"
                  onClick={() => editProduct(products.id)}
                >
                  Modifier le produit complet
                </Button>
                <Button
                  variant="outline-warning"
                  className="mb-2 ml-2 mr-2"
                  onClick={() => editPrice(products.id)}
                >
                  Modifier le produit complet
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default App;
