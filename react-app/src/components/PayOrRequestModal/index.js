import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { createTransaction } from "../../store/transactions";
import './payorreq.css'


function PayOrRequest() {
  const sessionUser = useSelector(state => state.session.user);
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
  // const [clickedButton, setClickedButton] = useState(null);


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




  // const handleRequest = () => {
  //   console.log("Request is being handled.");
  // };






  const handlePayment = async (e) => {
    e.preventDefault()
    setErrors([])

    const selectedUser = users.find(user => user.username === receiver_id);

      if(e.target.name === 'pay'){
        console.log("THIS SHOULD BE A PAY")

      let payload = {
        amount,
        sender_id: sessionUser.id,
        // 'receiver_id': Number(receiver_id),
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
      console.log("THIS SHOULD BE A REQUEST")
      let payload = {
        amount,
        sender_id: sessionUser.id,
        // 'receiver_id': Number(receiver_id),
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


  return (

    <div className="pay-modal-container">
      <div className="formContainer">
        <form className="modal-form" method="post" onSubmit={handlePayment}>
        `<ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
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
          <div className="modal-reciver_name">
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
          <input
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

  )
}


export default PayOrRequest





// const newTransaction = await dispatch(createTransaction(payload, userId)).catch(
//   async (res) => {
//     const data = await res.json()
//     if (data && data.errors) setErrors(data.errors)
//   }
// )
// if (newTransaction) {
//   (closeModal)
//     (history.push('/'))
// }



// const newTransaction = await dispatch(createTransaction(payload, userId)).catch(
//   async (res) => {
//     const data = await res.json()
//     if (data && data.errors) setErrors(data.errors)
//   }
// )
// if (newTransaction) {
//   (closeModal)
//     (history.push('/'))
// }
