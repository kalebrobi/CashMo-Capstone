import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteTransaction, getAllTransactions, updateTransaction } from '../../store/transactions';
import OpenModalButton from '../OpenModalButton'
import LogoutButton from '../auth/LogoutButton';
import PayOrRequest from '../PayOrRequestModal';
import EditTransaction from '../EditTransactionModal';
import { getAllPmtMethods } from '../../store/payment_method';

import './homepage.css'
import './iphoneimg.png'



const HomePage = ({loaded}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const transactionsObj = useSelector(state => state.transactions.allTransactions)
  const transactionArr = transactionsObj ? Object.values(transactionsObj) : []
  // const transactionArr = Object.values(transactionsObj)
  const allUsersObj = useSelector(state => state.session)
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('')


  console.log("USERS",users)


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
    dispatch(getAllPmtMethods())

      if (sessionUser){
        dispatch(getAllTransactions(sessionUser.id))
      }

  },[],[dispatch,users, deleteMessage])







  const handleClick = async (id) => {
    setErrors([])
    const transactionToChange = transactionArr.find(transaction => transaction.id === id);
    console.log("ON THE RIGHT TRACK",transactionToChange)
      let payload = {
        amount: transactionToChange.amount,
        sender_id: transactionToChange.sender_id,
        // 'receiver_id': Number(receiver_id),
        receiver_id: transactionToChange.receiver_id,
        note: transactionToChange.note,
        isPending: false,
        isRequest: transactionToChange.isRequest
      }
      const newTransaction = await dispatch(updateTransaction(payload, id)).catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
  };




  const handleDeletion = async (deleteId) => {
    const response = await dispatch(deleteTransaction(deleteId))
    if (response){
      setDeleteMessage(response.message)
      dispatch(getAllTransactions(sessionUser.id))
    }
  }

  function userNameFinder(id) {
    const usersFound = users.filter(user => user.id === id)
    const usernameFound = usersFound[0].first_name
    return usernameFound
}




   let sessionLinks;
  if(sessionUser) {
      if (!users.length) {
    return null;
  }
    sessionLinks =  (
      // <div className='logged-in-left-nav-container'>
<div className='testing-this'>
  <div className='logged-in-left-nav-container'>
      <div className='logged-in-cashmo'>
      <NavLink className={'logo'} to='/' exact={true} activeClassName='active'>
        Cashmo
      </NavLink>
      </div>
      <div className='user-info-and-profile-img'>
        <div>
        <img className='user-img-left-nav' src={sessionUser.profile_photo} alt='nav-profile-photo' />
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

  <div className='transactions-container'>
    <div className='display-transactions-container'>
      <div className='person-transaction-icon'>
        <h2>{sessionUser.username}</h2>
        {/* <h2>{sessionUser.id}</h2> */}
      </div>
      <div className='list-of-all-transaction'>
        {transactionArr.reverse().map(eachTransaction => (
      <div className='each-transaction-container'>
          <div className='user-img-transaction-container'>
            <img className='user-img-transaction-list' src={sessionUser.profile_photo} alt='nav-profile-photo' />
          </div>
      <div className='transaction-details-each'>
        <div>
          <p>
            {eachTransaction.isRequest ?
              (eachTransaction.receiver_id === sessionUser.id ?
               `${userNameFinder(eachTransaction.sender_id)} requested $${eachTransaction.amount} from you`
               : eachTransaction.sender_id === sessionUser.id ?
                `You requested $${eachTransaction.amount} from ${userNameFinder(eachTransaction.receiver_id)}`
                  : ''
             )
             : eachTransaction.receiver_id === sessionUser.id ?
               `You received $${eachTransaction.amount} from ${userNameFinder(eachTransaction.sender_id)}`
               : eachTransaction.sender_id === sessionUser.id ?
                `You sent $${eachTransaction.amount} to ${userNameFinder(eachTransaction.receiver_id)}`
                 : ''
            }
            </p>
          </div>
          <div>
            <p>
              {eachTransaction.note}
            </p>
          </div>
          <div>
          {/* <p>
            { eachTransaction.isRequest ?
              (eachTransaction.isPending ?
                'Request is currently pending' : 'Request was fulfilled' ): ''}
                </p> */}
                <p>
            {eachTransaction.isPending ? 'Transaction is currently pending' : 'Transaction has been resolved'}
                </p>
          </div>
          <div className='each-transaction-buttons'>
            {sessionUser.id === eachTransaction.sender_id && eachTransaction.isPending && eachTransaction.isRequest ? (
              <>
             <OpenModalButton
              modalComponent={<EditTransaction currentTransactionId={ `${eachTransaction.id}`}/>}
              buttonText={'Edit'}
              className={'edit-delete-transaction-button'}
              />
             <button
             onClick={() => handleDeletion(eachTransaction.id)}
             className='edit-delete-transaction-button'
               >Delete
             </button>
              </>
            ) : sessionUser.id === eachTransaction.receiver_id && eachTransaction.isPending && eachTransaction.isRequest ? (
             <>
              <button
              onClick={() => handleClick(eachTransaction.id)}
              className='edit-delete-transaction-button'
              >Pay
              </button>
              <button
              onClick={() => handleClick(eachTransaction.id)}
              className='edit-delete-transaction-button'
              >Reject
              </button>
              </>
              ) : null}
          </div>
        </div>
     </div>
        ))}

      </div>

    </div>
  </div>

    </div>
    )

  } else {
    sessionLinks = (
      <div className='splashPage-container'>
        <div className='splashPage-left'>
          <div className='splash-page-main-words-container'>
            <div className='splash-page-main-words'>
              <div>Fast, Safe,</div>
              <div>Social</div>
              <div>payments</div>
            </div>
            <div className='splash-page-small-words'>
              <div>Pay, Get Paid, Share. Join the exclusive club of</div>
              <div>early cashmo users</div>
            </div>
            <div className='splash-page-button-on-page'>
            <NavLink className={'splash-nav-sign-up-link'} to='/sign-up' exact={true} activeClassName='active'>
            Join Now!
            </NavLink>
          </div>
         </div>
        </div>
        <div className='splashPage-right'>
        {/* <img src={imageHome} /> */}
        </div>
      </div>
    )
   }

   return  (
    <>
    {loaded && sessionLinks}
    </>
   )

}


export default HomePage
