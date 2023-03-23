import './App.css';
import { Typography, Box, AppBar, Toolbar } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Products from './views/Posts';
import ProductsEdit from './views/PostEdit';
import ProductsDetail from './views/PostDetail';


function App() {
  return (
    <div className="App">
      <h1>Fjällripan</h1>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Hem</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/posts">Alla Produkten</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/postEdit">Lägg till i varukorgen</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>


      <div>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route path="/productsEdit" element={<ProductsEdit></ProductsEdit>}></Route>
          <Route path="/productsDetail" element={<ProductsDetail></ProductsDetail>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;