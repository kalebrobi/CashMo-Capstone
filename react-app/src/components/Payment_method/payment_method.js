import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPmtMethods } from '../../store/payment_method';


const LoadAllCards = () => {
  const dispatch = useDispatch();

  const paymentMethodsObj = useSelector(state => state.payment_methods.allPaymentMethods)
  const arrayOfPMTMethods = Object.values(paymentMethodsObj)


  useEffect(() => {
    dispatch(getAllPmtMethods())
    async function fetchData() {
      const response = await fetch('/api/paymentmethod');
      const responseData = await response.json();
    }

  }, [dispatch])



  return (
    <>
    <div>
      <h1>Your cards</h1>
      <div>
        {
        arrayOfPMTMethods.map(card => (
          <div key={card.id}>
          <div>{card.card_nickname}</div>
          <div> {card.cc_number}</div>
          <div> {card.sec_code}</div>
          <button>Edit</button> <button>Delete</button>
          </div>
          ))
        }
      </div>
      <div>
        <h1>Add A New Card</h1>
        <div>
          <NavLink to={'paymentmethod/add'}>
            Click here to add a card
          </NavLink>
        </div>
      </div>
    </div>
  </>
  )
}


export default LoadAllCards
