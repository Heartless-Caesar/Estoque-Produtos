//TODO Implementar a busca de todos os produtos em um estoque
//TODO Implementar criar, editar e excluir um estoque
//TODO Implementar criar, editar e excluir produtos de um inventário

import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../../Services/auth_header";

const InventoryBody = () => {
  const [products, setProducts] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/estoque/all", { headers: authHeader() })
      .then((res) => setEstoque(res.data.estoques))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  {
    /*useEffect(() => {
    axios
      .get("http://localhost:3000/estoque/listar", { headers: authHeader() })
      .then((res) => setProducts(res))
      .catch((err) => {
        console.log(err);
      });
  }, [estoque]);
*/
  }
  return (
    <Container>
      <p>Selecione o estoque que deseja visualizar:</p>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertOutlined />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {estoque.map((option) => {
            const { id, nome } = option;
            return (
              <MenuItem key={id} onClick={handleClose}>
                {nome}
              </MenuItem>
            );
          })}
        </Menu>
      </div>

      {/* GET PRODUTOS */}
      {/*{products.map((x) => {
        const { id, nome, quantidade } = x;
        return (
          <Card variant="outlined">
            <div key={id}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {nome},{quantidade}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </div>
          </Card>
        );
        })}*/}
    </Container>
  );
};

export default InventoryBody;
