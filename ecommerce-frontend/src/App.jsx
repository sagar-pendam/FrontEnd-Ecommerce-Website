import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import { PrivateRoute } from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FavoritePage from "./pages/FavoritePage";
import ProfilePage from "./pages/ProfilePage";
function App() {
  return (
 
    
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<FavoritePage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
