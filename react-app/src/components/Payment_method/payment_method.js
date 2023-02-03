import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteACard, getAllPmtMethods } from '../../store/payment_method';
import OpenModalButton from '../OpenModalButton'
import LogoutButton from '../auth/LogoutButton';
import PayOrRequest from '../PayOrRequestModal';
import './paymentmethods.css'


const LoadAllCards = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const paymentMethodsObj = useSelector(state => state.payment_methods.allPaymentMethods)
  const arrayOfPMTMethods = Object.values(paymentMethodsObj)
  const [deleteMessage, setDeleteMessage] = useState('')
  const history = useHistory()





  useEffect(() => {
    dispatch(getAllPmtMethods())
    // async function fetchData() {
    //   const response = await fetch('/api/paymentmethod');
    //   const responseData = await response.json();
    // }

  }, [dispatch, deleteMessage])





  const handleDeletion = async (payment_method_id) => {
    const response =  await dispatch(deleteACard(payment_method_id))
    if (response){
      setDeleteMessage([response.message])
    }
  }






  return (
    <>

    <div className='testing-this-pmt'>
    <div className='logged-in-left-nav-container'>
      <div className='logged-in-cashmo'>
      <NavLink className={'logo'} to='/' exact={true} activeClassName='active'>
        Cashmo
      </NavLink>
      </div>
      <div className='user-info-and-profile-img'>
        <div>
        <img className='user-img-left-nav' src={sessionUser.profile_photo} onError={e => {e.target.src ='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} alt='nav-profile-photo' />
        </div>
        <div className='user-details-left'>
          <p>Hi, {sessionUser.first_name}</p>
          <br></br>
          <p className='username-left-blue'>@{sessionUser.username}</p>
        </div>
      </div>

      <div className='pay-or-req-button'>
        <OpenModalButton
          buttonText={'Pay or Request'}
          modalComponent={<PayOrRequest />}
          className={'left-pay-req-button'}
          // <h1>PAY OR REQ BUTTON</h1>
        />
      </div>

      <div className='container-for-left-links'>
        <div className='left-eachlink'>
          {/* <p>payment method link</p> */}
          <NavLink className={'left-links'} to='/paymentmethod' exact={true} activeClassName='active'>
              Payment Methods
          </NavLink>
        </div>
        <div className='link-to-social'>
          <a className={'left-links'} href='https://github.com/kalebrobi' target="_blank">
          My Github
        </a>
        </div>
        <div className='link-to-social'>
        <a className={'left-links'} href='https://www.linkedin.com/in/kaleb-robi-a5abb0124/' target="_blank">
          My Linkdin
        </a>
        </div>
        {/* <div className='left-eachlink'>
          <p>incomplete 'transactions' link</p>
        </div> */}
        {/* <div className='left-eachlink'>
          <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
        </div> */}
        <div className='left-logout'>
          <LogoutButton  />
        </div>
      </div>

  </div>


<div className='card-info'>
  <div className='card-info-inner'>
      <div className='pmt-methods-title'>
        <p className='title-pmt'>Payment Methods</p>
      </div>
      <div className='card-and-delete-button'>
        {
        arrayOfPMTMethods.map(card => (
          <div key={card.id} className='card-and-delete-button-containter'>
      <div className='eachCard-pmt-details'>
        <div className='card-nickname'>
          {card.card_nickname}
        </div>
      <div className='ccnumber-and-visalogo'>
        <div>
            ***{card.cc_number.slice(-4)}
        </div>
          <div>
            <i class="fa-brands fa-cc-visa fa-2xl"></i>
          </div>
      </div>
          {/* <div> {card.sec_code}</div> */}
      </div>
          <div className='button-for-delete-card'>
            <button className='delete-button' onClick={() => handleDeletion(card.id)}>Remove</button>
          </div>
          </div>
          ))
        }
        <div className='add-a-card-link'>
        <NavLink
        to={'paymentmethod/add'}
        className='add-a-card'>
          Add a card
        </NavLink>
        </div>
      </div>
    </div>
  </div>
</div>
  </>
  )
}


export default LoadAllCards
