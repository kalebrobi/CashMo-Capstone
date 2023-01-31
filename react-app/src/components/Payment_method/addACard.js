import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCard } from '../../store/payment_method';


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
    <div className='credit-card-post'>
      <form onSubmit={handleSubmit} method='post'>
        <h1>Card Details</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div>
          <input
            type='text'
            required
            onChange={(e) => setCc_number(e.target.value)}
            value={cc_number}
            placeholder='Full Card Number'
            name='cc_number'
          />
          </div>
          <div>
          <input
            type='text'
            required
            onChange={(e) => setSec_code(e.target.value)}
            value={sec_code}
            placeholder='3 Digit Security Code'
            name='sec_code'
          />
          </div>
          <div>
          <input
            type='text'
            required
            onChange={(e) => setCard_nickname(e.target.value)}
            value={card_nickname}
            placeholder='Card Nickname'
            name='card_nickname'
          />
          </div>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}


export default AddNewCardForm
