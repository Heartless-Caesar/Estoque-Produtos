//TODO Fix GET for single page, involves React routing
import { Container, Card, CardContent, Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authHeader from "../../Services/auth_header";

const InventoryPage = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/estoque/${params.id}`, {
        headers: authHeader(),
      })
      .then((res) => setData(res.data.estoque));
  }, []);

  const updateInventory = () => {
    axios.patch(
      "http://localhost:3000/estoques/atualizar",
      {
        nomeAtual: data.nome,
        nome: input,
      },
      { headers: authHeader() }
    );
  };

  return (
    <div>
      {data.map((x) => {
        const { id, nome } = x;

        {
          edit === false ? (
            <Container key={id}>
              <Card>
                <CardContent>{nome}</CardContent>
              </Card>
              <Button onClick={() => setEdit(true)}>Edit</Button>
              <Button>Delete</Button>
            </Container>
          ) : (
            <Container key={id}>
              <Card>
                <CardContent>
                  <Input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button onClick={() => updateInventory()}></Button>
                </CardContent>
              </Card>
              <Button color="danger" onClick={() => setEdit(false)}>
                Cancel
              </Button>
            </Container>
          );
        }
      })}
    </div>
  );
};

export default InventoryPage;
