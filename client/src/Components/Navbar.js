import { AppBar, Grid, Typography, Button, Toolbar, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Estoque
              </Typography>
            </Grid>

            <Grid item>
              <Button
                color="inherit"
                style={{ "margin-left": "920px" }}
                onClick={() => navigate("/login", { replace: true })}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
