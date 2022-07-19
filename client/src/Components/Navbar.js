import { AppBar, Grid, Typography, Button, Toolbar, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Typography variant="h6" component="div" style={{ flex: 1 }}>
                Estoque
              </Typography>
            </Grid>

            <Grid item>
              <div>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login", { replace: true })}
                  style={{ marginLeft: "920px" }}
                >
                  Login
                </Button>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
