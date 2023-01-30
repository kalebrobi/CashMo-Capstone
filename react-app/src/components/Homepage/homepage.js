import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllTransactions, updateTransaction } from '../../store/transactions';
import OpenModalButton from '../OpenModalButton'
import LogoutButton from '../auth/LogoutButton';
import PayOrRequest from '../PayOrRequestModal';
import './homepage.css'
import './iphoneimg.png'
import EditTransaction from '../EditTransactionModal';


const HomePage = ({loaded}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const transactionsObj = useSelector(state => state.transactions.allTransactions)
  const transactionArr = Object.values(transactionsObj)
  const allUsersObj = useSelector(state => state.session)
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState([]);
  // const [isPending, setIsPending] = useState(true)


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();

    if (!users) {
      return null
    }else if (sessionUser){
        dispatch(getAllTransactions(sessionUser.id))
      }

  },[],users, [dispatch])

  // if (!users) {
  //   return null
  // }

  function userNameFinder(id) {
    const usersFound = users.filter(user => user.id === id)
    const usernameFound = usersFound[0].first_name
    return usernameFound
  }

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




  // console.log("TRANSACTION",transactionArr)


   let sessionLinks;
  if(sessionUser) {
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
        <h1>USER INFO AND PIC</h1>
      </div>


      <div className='pay-or-req-button'>
        <OpenModalButton
          buttonText={'Pay or Request'}
          modalComponent={<PayOrRequest />}
          // <h1>PAY OR REQ BUTTON</h1>
        />
      </div>

      <div className='container-for-left-links'>
        <div className='left-eachlink'>
          {/* <p>payment method link</p> */}
          <NavLink to='/paymentmethod' exact={true} activeClassName='active'>
              <h2>Payment Method</h2>
          </NavLink>
        </div>
        <div className='left-eachlink'>
          <p>incomplete 'transactions' link</p>
        </div>
        <div className='left-eachlink'>
          <p>other users link</p>
        </div>
        <div className='left-eachlink'>
          <LogoutButton />
        </div>
      </div>

  </div>

  <div className='transactions-container'>
    <div className='display-transactions-container'>
      <div className='person-transaction-icon'>
        <h2>{sessionUser.username}</h2>
        <h2>{sessionUser.id}</h2>
      </div>
      <div className='list-of-all-transaction'>
        {transactionArr.reverse().map(eachTransaction => (
      <div className='each-transaction-container'>
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

          <div>
            {sessionUser.id === eachTransaction.sender_id && eachTransaction.isPending && eachTransaction.isRequest ? (
              <>
             <OpenModalButton
              modalComponent={<EditTransaction currentTransactionId={ `${eachTransaction.id}`}/>}
              buttonText={'Edit'}
              />
             <button>Delete</button>
              </>
            ) : sessionUser.id === eachTransaction.receiver_id && eachTransaction.isPending && eachTransaction.isRequest ? (
             <>
              <button
              onClick={() => handleClick(eachTransaction.id)}
              >Pay
              </button>
              <button
              onClick={() => handleClick(eachTransaction.id)}
              >Reject
              </button>
              </>
              ) : sessionUser.id === eachTransaction.receiver_id && eachTransaction.isPending && !eachTransaction.isRequest ? (
            <button>Accept Payment</button>
           ) : null}
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
            Get Cashmo
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

   return (
    <>
    {loaded && sessionLinks}
    </>
   )

}


export default HomePage
