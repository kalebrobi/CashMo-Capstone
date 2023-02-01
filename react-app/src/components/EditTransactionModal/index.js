import React, {useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAUser } from "../../store/session";
import { updateTransaction } from "../../store/transactions";
import './edittransactions.css'



function EditTransaction(currentTransactionId) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')
  const [receiver_id, setReceiver_id] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState([]);
  const {closeModal} = useModal();
  const [users, setUsers] = useState([])


  const currentTransaction = currentTransactionId.currentTransactionId


  useEffect(() => {
    if (!users.length) {
      // return null


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

    let payload = {
      amount,
      sender_id: sessionUser.id,
      // 'receiver_id': Number(receiver_id),
      receiver_id: selectedUser ? selectedUser.id : '',
      note,
      isPending: true,
      isRequest: true
    }


     const data = await dispatch(updateTransaction(payload, currentTransaction))

          if(data && data.errors){
            setErrors([data.errors])
          } else {
            closeModal()
            history.push('/')
          }

  }



  return (
  <div className="pay-modal-container">
    <div className="title-add-transaction">Pay & Request users</div>
      <div className="formContainer">
        <form className="modal-form" method="post" onSubmit={handlePayment} >
      <div className="pay-req-error">
        {errors.map((error, idx) => (
         <div
          className="each-pay-req-error" key={idx}>{error}
        </div>
          ))}
       </div>
          <div className="modal-amount-number">
            <input
              className="amount-input-pay"
              type="text"
              required
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder='Enter Amount'
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
              {users.map(user => (
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
            >submit changes
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}


export default EditTransaction









{/* <>

<div className="pay-modal-container">
<div className="title-add-transaction">Pay & Request users</div>
  <div className="formContainer">
    <form className="modal-form" method="post" onSubmit={handlePayment}>
    <div className="pay-req-error">
        {errors.map((error, idx) => (
          <div
          className="each-pay-req-error" key={idx}>{error}
          </div>
        ))}
    </div>
      <div className="modal-amount-number">
        <input
        className="amount-input-pay"
          type="text"
          required
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder='$0'
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
          {users.map(user => (
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
        // onClick={setClickedButton('pay')}
        // value={clickedButton}
        onClick={handlePayment}
        >Pay
        </button>
        <button
        type="submit"
        name="request"
        className="modal-req-button"
        // onClick={setClickedButton('request')}
        // value={clickedButton}
        onClick={handlePayment}
        >Request
        </button>
      </div>
    </form>
  </div>
</div>
</> */}
