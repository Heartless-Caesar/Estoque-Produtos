//TODO Implementar a busca de todos os produtos em um estoque
//TODO Implementar criar, editar e excluir um estoque
//TODO Implementar criar, editar e excluir produtos de um inventário

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../../Services/auth_header";
import { Link } from "react-router-dom";
const InventoryBody = () => {
  const [products, setProducts] = useState([]);

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "45vw",
    marginTop: "10px",
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/estoque/listar", { headers: authHeader() })
      .then((res) => setProducts(res.data.products))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <p>Selecione o estoque que deseja visualizar:</p>
      {/* GET PRODUTOS */}
      {products.map((x) => {
        const { id, nome, quantidade } = x;
        return (
          <Card variant="outlined" style={cardStyle}>
            <div key={id}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {nome},{quantidade}
                </Typography>
                <Button
                  type="button"
                  color="primary"
                  style={{ marginLeft: "5px" }}
                >
                  <Link to={`/estoque/${id}`}>Opções</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </Container>
  );
};

export default InventoryBody;
