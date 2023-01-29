import React, {useState} from "react";
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


  const handlePayment = async (e) => {
    e.preventDefault()
    setErrors([])



    const payload = {
      amount,
      sender_id: sessionUser.id,
      'receiver_id': Number(receiver_id),
      // receiver_id,
      note,
      isPending: true,
      is_request: false
    }


    const newTransaction = await dispatch(createTransaction(payload, userId)).catch(
      async (res) => {
        console.log("DATA FRONT-----",res)
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      }
    )
    if (newTransaction) {
      (closeModal)
        (history.push('/'))
    }


  }







  return (

    <div className="pay-modal-container">
      <div className="formContainer">
        <form className="modal-form">
          <div className="modal-amount-number">
            <input
              type="text" required
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder='Enter Amount'>
            </input>
          </div>
          <div className="modal-reciver_name">
          <input
              type="text" required
              onChange={(e) => setReceiver_id(e.target.value)}
              value={receiver_id}
              placeholder='To: username'>
          </input>
          </div>
          <div className="modal-note">
          <input
              type="text" required
              onChange={(e) => setNote(e.target.value)}
              value={note}
              placeholder='Note'>
          </input>
          </div>
          <div className="modal-buttons">
            <button
            className="modal-pay-button"
            onClick={handlePayment}>Pay
            </button>
            {/* <button
            className="modal-req-button"
            onClick={handleRequest}>Request
            </button> */}
          </div>

        </form>
      </div>
    </div>

  )
}


export default PayOrRequest
