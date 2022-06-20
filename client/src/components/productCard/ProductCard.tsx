import { FC, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import './ProductCard.scss';
import { CartContext } from '../../context/CartProvider';
import { CartContextType, IStyleVisible, PropsCard } from '../../interfaces/interfaces';

const ProductCard: FC<PropsCard> = ({ _id, name, price, imageUrl }) => {

    const navigate = useNavigate();
    const [style, setStyle] = useState<IStyleVisible>({ display: 'none' });
    const [quantity, setQuantity] = useState<number>(0);
    const { addItemToCart, removeItemFromCart, cartItems } = useContext(CartContext) as CartContextType;
    useEffect(() => {
        const existing = cartItems.find((item: PropsCard) => item._id === _id);
        if (existing)
            setQuantity(existing.quantity);
        else
            setQuantity(0);

    }, [cartItems])

    const deleteItem = (_id: string) => {
        fetch(`/api/items/${_id}`,
            {
                method: 'DELETE'
            }
        ).then(res => {
            navigate('/')
        })
    }
    return (
        <div className='product'
            onMouseEnter={e => {
                setStyle({ display: 'block' });
            }}
            onMouseLeave={e => {
                setStyle({ display: 'none' })
            }}
        >
            <div className={`product_image ${style.display !== 'none' ? 'cover' : ''}`}
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div
                className="button-group"
                style={style}
            >
                <div className="inner-btn-group">
                    {quantity > 0 &&
                        <button className='cart-btn ' onClick={(e) => addItemToCart({ _id, name, price, imageUrl })}>+</button>
                    }
                    <button
                        onClick={() => addItemToCart({ _id, name, price, imageUrl })}
                        className='cart-btn '
                    >
                        {quantity > 0 ? `${quantity}` : 'Add to Cart'}
                    </button>
                    {quantity > 0 &&
                        <button className='cart-btn ' onClick={() => removeItemFromCart({ _id, name, price, imageUrl })}>-</button>
                    }
                </div>
                {/* <button
                    onClick={() => deleteItem(_id)}
                    className='delete-btn '
                >Delete</button> */}
            </div>
            <div className='product_data'>
                <span className='product_name'>{name}</span>
                <span className='product_price'>₹{price}</span>
            </div>

        </div>
    )
}
ProductCard.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
}

export default ProductCard;