import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductProvider";
import { ProductContextType } from "../../interfaces/interfaces";

const Navbar: FC = () => {
    const { token,setToken } = useContext(ProductContext) as ProductContextType;
    const logout=()=>{
        localStorage.removeItem('token');
        setToken("");
    }
    return (
        <header>
            <nav className="nav" style={{ textAlign: 'center' }}>
                <ul>
                    <li className="logo"><Link to='/'><span>PS Kart</span></Link></li>
                    <li><Link to='/'>Home</Link></li>
                    {
                        token.length === 0 &&
                        <li><Link to='/auth'>Login</Link></li>

                    }
                    {
                        token.length > 0 &&
                        <>
                            <li><Link to='/addItem'>Add Item</Link></li>
                            <li><button className="btn" onClick={logout}>Logout</button></li>
                        </>
                    }

                </ul>
            </nav>
        </header>
    )
}
export default Navbar;