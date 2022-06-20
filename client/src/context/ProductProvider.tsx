import { createContext, FC, useEffect, useState } from "react";
// import SHOP_DATA from "../data/data";
import { IProduct, ProductContextType, Props } from "../interfaces/interfaces";
import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from "../gqloperations/queries";

export const ProductContext = createContext<ProductContextType>({
    pageNo: localStorage.getItem('pageNo') || 1,
    token: localStorage.getItem('token') || "",
    setToken: () => { },
    setPageNo: () => { },
    products: [],
    totalItems: 0,
    dataLimit: 8,
    loading: false
})
const ProductProvider: FC<Props> = ({ children }) => {

    const { loading, error, data } = useQuery(GET_ALL_ITEMS)
    const [token, setToken] = useState<string>(localStorage.getItem('token') || "");
    const [items, setItems] = useState([]);
    const [pageNo, setPageNo] = useState<number | string>(localStorage.getItem('pageNo') || 1);
    const [dataLimit] = useState<number>(8);
    const [totalItems, setTotalItems] = useState<number>(data?.items.length);
    const [products, setProducts] = useState<IProduct[]>(data?.items);
    useEffect(() => {
        console.log("Data:", data)
        setTotalItems(data?.items.length);
        setProducts(data?.items);
    }, [pageNo, data])
    useEffect(() => {
        setProducts(items);
    }, [pageNo, items])
    // console.log("Data::", items)
    const value = { token,setToken, loading, products, pageNo, dataLimit, setPageNo, totalItems };
    return <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
}
export default ProductProvider;