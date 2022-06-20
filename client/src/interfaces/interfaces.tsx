export interface Props {
    children: React.ReactNode;
}
export interface IProduct {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
}
export interface ICartItem {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}
export type CartContextType = {
    addItemToCart: (product: IProduct) => void;
    removeItemFromCart: (product: IProduct) => void;
    cartItems: ICartItem[];
    cartCount: number;
}
export type ProductContextType = {
    token: string;
    setPageNo: (page: number) => void;
    setToken: (token:string) => void;
    products: IProduct[];
    pageNo: number | string;
    totalItems: number;
    dataLimit: number;
    loading: boolean;
}
export type DataType = {
    items: IProduct[]
}
export interface PropsCard {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
}
export interface IStyleVisible {
    display: string;
}