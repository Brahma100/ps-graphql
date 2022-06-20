import React, { FC, useContext } from 'react';
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard';
import { ProductContext } from '../../context/ProductProvider';
import Pagination from '../pagination/Pagination';
import { ProductContextType } from '../../interfaces/interfaces';
import Loader from '../Loader/Loader';
// import PropTypes  from 'prop-types';

const ProductList: FC = () => {
    const { products, loading } = useContext(ProductContext) as ProductContextType;

    return <>
            <div className='container'>
        {loading ?<Loader/> :
                <article>
                    <div className='product-wrapper'>
                        {products?.length > 0 && products.map(({ _id, ...otherDataPorps },i) => (
                            <ProductCard key={_id}  _id={_id} {...otherDataPorps} />
                        ))}
                    </div>
                </article>
            }
                <Pagination />
            </div>
    </>
}
// ProductList.propTypes = {
//     children: PropTypes.element.isRequired
//   };
export default ProductList;