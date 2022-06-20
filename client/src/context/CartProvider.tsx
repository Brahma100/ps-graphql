import { createContext, FC, useEffect, useState } from "react";
import { Props, IProduct, ICartItem, CartContextType } from '../interfaces/interfaces';

const addCartItem = (cartItems: ICartItem[], product: IProduct) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem._id === product._id
    )
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem._id === product._id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    return [...cartItems, { ...product, quantity: 1 }];
}
const removeCartItem = (cartItems: ICartItem[], product: IProduct) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem._id === product._id
    )
    if (existingCartItem && existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem._id === product._id ?
                { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
    }
    return cartItems.filter((cartItem) =>
        cartItem._id !== product._id
    )
}


export const CartContext = createContext<CartContextType>({
    cartItems: JSON.parse((localStorage.getItem('cartItems') as string)) || [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0
})

const CartProvider: FC<Props> = ({ children }) => {
    const [cartItems, setCartItems] = useState<ICartItem[]>(JSON.parse(localStorage.getItem('cartItems') as string) || []);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCount: number = cartItems.reduce(
            (total: number, cartItem: ICartItem) => total + cartItem.quantity, 0
        )
        setCartCount(newCount);
    }, [cartItems])

    const addItemToCart = (product: IProduct) => {
        let temp = addCartItem(cartItems, product);
        localStorage.setItem('cartItems', JSON.stringify(temp))
        setCartItems(temp);
    }
    const removeItemFromCart = (product: IProduct) => {
        let temp = removeCartItem(cartItems, product);
        localStorage.setItem('cartItems', JSON.stringify(temp))
        setCartItems(temp);
    }

    const value: CartContextType = { cartItems, cartCount, addItemToCart, removeItemFromCart };

    return <CartContext.Provider value={value} > {children} </CartContext.Provider>;

}
export default CartProvider;