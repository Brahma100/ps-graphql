
import React, { FC, useEffect, useState } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/productList/ProductList";
import CartProvider from "./context/CartProvider";
import ProductProvider from "./context/ProductProvider";
import './App.css';
import Auth from "./components/auth/Auth";
import AddProduct from "./components/addproduct/AddProduct";
import Navbar from "./components/Navbar/Navbar";

const App: FC = () => {
    return (
        <ProductProvider>
            <CartProvider>
                <Router>
                   <Navbar/>
                    <Routes>
                        <Route index element={<ProductList />} />
                        <Route path='/auth' element={<Auth />} />
                        <Route path='/addItem' element={<AddProduct />} />
                        {/* <Route index element={<App/>}/> */}
                    </Routes>
                    {/* <ProductList /> */}
                </Router>
            </CartProvider>
        </ProductProvider>

    )
}

export default App