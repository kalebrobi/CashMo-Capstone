import React, {useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAUser } from "../../store/session";
import { updateTransaction } from "../../store/transactions";
import './edittransactions.css'



function EditTransaction(props) {
  const sessionUser = useSelector(state => state.session.user);
  const currentTransaction = props.currentTransactionId
  const thisTransaction = useSelector(state => state.transactions.allTransactions[currentTransaction])
  const history = useHistory()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(thisTransaction.amount)
  const [receiver_id, setReceiver_id] = useState(props.recUserName)
  const [note, setNote] = useState(thisTransaction.note)
  const [errors, setErrors] = useState([]);
  const {closeModal} = useModal();
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

    let payload = {
      amount,
      sender_id: sessionUser.id,
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
              {/* <option value={receiver_id}>{props.recUserName}</option> */}
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
