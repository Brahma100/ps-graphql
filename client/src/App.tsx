
import React,{FC} from "react";
import {Link,BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import ProductList from "./components/productList/ProductList";
import CartProvider from "./context/CartProvider";
import ProductProvider from "./context/ProductProvider";
import './App.css';
import Auth from "./components/auth/Auth";
import AddProduct from "./components/addproduct/AddProduct";

const App:FC = () => {
    return (
        <ProductProvider>
            <CartProvider>
                <Router>
                   
                <header>
                    <nav className="nav" style={{ textAlign: 'center' }}>
                        <ul>
                            <li className="logo"><Link to='/'><span>PS Kart</span></Link></li>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/auth'>Login</Link></li>
                            <li><Link to='/addItem'>Add Item</Link></li>
                           
                        </ul>
                    </nav>
                </header>
                <Routes>
                        <Route index element={<ProductList/>}/>
                        <Route path='/auth' element={<Auth/>}/>
                        <Route path='/addItem' element={<AddProduct/>}/>
                        {/* <Route index element={<App/>}/> */}
                    </Routes>
                {/* <ProductList /> */}
                </Router>
            </CartProvider>
        </ProductProvider>

    )
}

export default App