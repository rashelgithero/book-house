import React from 'react';
import './Card.css'
const Card = (props) => {
    const card = props.cart;
    const total = card.reduce((total, card)=>(total+ card.price*card.quantity),0);
    const offer = total*5 / 100;
    const getNumber = (num) => (Number(num));
    return (
        <div className='carder'>
            <div>
            <h4>Order Summary</h4>
            <h5><span className='money'>Order List:</span>{card.length}</h5>
            <h5><span className='money'>Price:</span>{getNumber(total)}</h5>
            <h5><span className='money'>Offer:</span>{offer}</h5>
            <h5><span id='total' className='money'>Total Price:</span>{total - offer}</h5>
            </div>
            <div>
                {props.children}
            </div>
        </div>
        

    );
};

export default Card;