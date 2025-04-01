import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }
        const datas = await response.json();
        setProducts(datas);
      } catch (err) {
        setError("Nous avons pas pus trouver votre demande " + err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (error) return <p>Erreur : {error}</p>;
  if (loading) return <p>Chargement...</p>;

  async function addProduct() {
    try {
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
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const data = await response.json();
      alert("Le produit avec l'id " + data.id + " a été créé");
    } catch (err) {
      console.error(err.message);
      alert("Une erreur est survenue a l'ajout du produit.");
    }
  }

  async function editProduct(id) {
    try {
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
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const data = await response.json();
      alert("Le produit avec l'id " + data.id + " a été modifié");
    } catch (err) {
      console.error(err.message);
      alert("Une erreur est survenue a la modification du produit.");
    }
  }

  async function editPrice(id) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 5,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const data = await response.json();
      alert("Le prix du produit avec l'id " + data.id + " a été modifié");
    } catch (err) {
      console.error(err.message);
      alert("Une erreur est survenue a la modification du prix.");
    }
  }
  async function deleteProduct(id) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE", // Indique qu'on supprime une ressource existante
      });
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const data = await response.json();
      alert("Le produit avec l'id " + data.id + " a été supprimé");
    } catch (err) {
      console.error(err.message);
      alert("Une erreur est survenue a la suppression");
    }
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
                  <Card.Text className="description-text">
                    {products.description}
                  </Card.Text>
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
                  Modifier le prix du produit
                </Button>
                <Button
                  variant="outline-danger"
                  className="mb-2 ml-2 mr-2"
                  onClick={() => deleteProduct(products.id)}
                >
                  Supprimer le produit
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