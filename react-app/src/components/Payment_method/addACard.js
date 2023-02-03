import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { createCard } from '../../store/payment_method';
import OpenModalButton from '../OpenModalButton'
import LogoutButton from '../auth/LogoutButton';
import PayOrRequest from '../PayOrRequestModal';
import './addcard.css'


const AddNewCardForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [cc_number, setCc_number] = useState('')
  const [sec_code, setSec_code] = useState('')
  const [card_nickname, setCard_nickname] = useState('')

  // console.log(errors)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    const newCard = {
      'user_id': sessionUser.id,
      'cc_number': cc_number,
      'sec_code': sec_code,
      'card_nickname': card_nickname
    }

    const data = await dispatch(createCard(newCard))
      // async (res) => {
      //   console.log("RESssss", res)
        // const data = await res.json()
        if(data && data.errors){
          setErrors([data.errors])
        } else {
          history.push('/paymentmethod')
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
      <div className='add-card-container'>
      <form className='inputs-add-card' onSubmit={handleSubmit} method='post'>
        <div className='title-add-card'>
            Add Card
        </div>
        <div className='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error[ind]}</div>
          ))}
        </div>
        <div className='full-cc-number-container'>
          <input
          className='full-cc-number-input'
            type='text'
            required
            onChange={(e) => setCc_number(e.target.value)}
            value={cc_number}
            placeholder='Full Card Number'
            name='cc_number'
          />
          </div>
          <div className='sec-and-nickname'>
          <div className='sec-code-input'>
          <input
          className='sec-input'
            type='text'
            required
            onChange={(e) => setSec_code(e.target.value)}
            value={sec_code}
            placeholder='3 Digit Security Code'
            name='sec_code'
          />
          </div>
          <div className='card-nickname-add'>
          <input
          className='card-nickname-add-input'
            type='text'
            required
            onChange={(e) => setCard_nickname(e.target.value)}
            value={card_nickname}
            placeholder='Card Nickname'
            name='card_nickname'
          />
          </div>
          </div>
          <button className='submit-add-pmt-method' type='submit'>Submit</button>
      </form>

      </div>
    </div>

    </div>
    </>
  )
}


export default AddNewCardForm
