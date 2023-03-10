import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { createTransaction } from "../../store/transactions";
import './payorreq.css'


function PayOrRequest() {
  const sessionUser = useSelector(state => state.session.user);
  const allPmts = useSelector(state => state.payment_methods.allPaymentMethods)
  const arrayOfPmtMethods = Object.values(allPmts)
  const history = useHistory()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')
  const [receiver_id, setReceiver_id] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState([]);
  const [formattedAmount, setFormattedAmount] = useState("$0.00");
  const {closeModal} = useModal();
  const userId = sessionUser.id
  const [users, setUsers] = useState([])



  useEffect(() => {
    if (!users.length) {


    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }
  },[], [dispatch])








  const handlePayment = async (e) => {
    e.preventDefault()
    setErrors([])

    const selectedUser = users.find(user => user.username === receiver_id);

      if(e.target.name === 'pay'){

      let payload = {
        amount,
        sender_id: sessionUser.id,
        receiver_id: selectedUser ? selectedUser.id : '',
        note,
        isPending: false,
        isRequest: false
      }

      const data = await dispatch(createTransaction(payload, userId))

        if(data && data.errors){
          setErrors([data.errors])
        } else {
          closeModal()
          history.push('/')
        }


    } else if(e.target.name === 'request'){
      let payload = {
        amount,
        sender_id: sessionUser.id,
        receiver_id: selectedUser ? selectedUser.id : '',
        note,
        isPending: true,
        isRequest: true
      }
      const data = await dispatch(createTransaction(payload, userId))

      if(data && data.errors){
        setErrors([data.errors])
      } else {
        closeModal()
        history.push('/')
      }

    }

  }

const newList = users.filter(user => user.id !== sessionUser.id)
return (
<>
{arrayOfPmtMethods.length === 0 ? (
<div className="pay-modal-container">
<div className="title-add-transaction">
<NavLink className={'left-links'} to='/paymentmethod' exact={true} activeClassName='active' onClick={() => closeModal()}>
 Click here to add a<br>
 </br> Payment method first!
</NavLink>
</div>
  <div className="formContainer">
    <form className="modal-form" method="post" onSubmit={handlePayment}>
    <div className='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error[ind]}</div>
          ))}
        </div>
      <div className="modal-amount-number">
        <input
        className="amount-input-pay"
          type="text"
          disabled
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder='$0'
          name="amount"
          />
      </div>
      <div className="modal-reciver-name">
        <select
        className="users-drop-down"
          disabled
          onChange={(e) => setReceiver_id(e.target.value)}
          value={receiver_id}
          name='receiver_id'
          >
          <option value="">Select a Receiver</option>
          {newList.map(user => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="modal-note">
      <textarea
      className="note-for-pay"
          type="text"
          disabled
          onChange={(e) => setNote(e.target.value)}
          value={note}
          placeholder='Note'
          name="note"
          />
      </div>
    </form>
  </div>
</div>

) : (
  <div className="pay-modal-container">
<div className="title-add-transaction">Pay & Request users</div>
  <div className="formContainer">
    <form className="modal-form" method="post" onSubmit={handlePayment}>
    <div className='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error[ind]}</div>
          ))}
        </div>
      <div className="modal-amount-number">
        <input
        className="amount-input-pay"
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value).toFixed(2))}
          placeholder='$0.00'
          name="amount"

          />
      </div>
      <div className="modal-reciver-name">
        <select
        className="users-drop-down"
          required
          onChange={(e) => setReceiver_id(e.target.value)}
          value={receiver_id}
          name='receiver_id'
          >
          <option value="">Select a Receiver</option>
          {newList.map(user => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="modal-note">
      <textarea
      className="note-for-pay"
          type="text"
          required
          onChange={(e) => setNote(e.target.value)}
          value={note}
          placeholder='Note'
          name="note"
          />
      </div>
      <div className="modal-buttons">
        <button
        type="submit"
        name="pay"
        className="modal-pay-button"
        onClick={handlePayment}
        >Pay
        </button>
        <button
        type="submit"
        name="request"
        className="modal-req-button"
        onClick={handlePayment}
        >Request
        </button>
      </div>
    </form>
  </div>
</div>

)}

</>
  )
}

export default PayOrRequest
