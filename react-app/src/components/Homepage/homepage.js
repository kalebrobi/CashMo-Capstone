import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './homepage.css'
import './iphoneimg.png'


const HomePage = ({loaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  const imageHome = './iphoneimg.png'
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
        <h1>PAY OR REQ BUTTON</h1>
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
        <h2>Icon Showing person</h2>
      </div>
      <div className='list-of-all-transaction'>
        <div className='each-transaction-container'>
          <h2>Transaction details</h2>

        </div>
        <div className='each-transaction-container'>
        <h2>Transaction details</h2>
        </div>
        <div className='each-transaction-container'>
        <h2>Transaction details</h2>

        </div>
        <div className='each-transaction-container'>
        <h2>Transaction details</h2>

        </div>
        <div className='each-transaction-container'>
        <h2>Transaction details</h2>

        </div>
        <div className='each-transaction-container'>
        <h2>Transaction details</h2>

        </div>
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
        <img src={imageHome} />
        </div>
      </div>
    )
   }



  //  } else {
  //   sessionLinks = (
  //     <div className='splashPage-container'>
  //       <div className='splashPage-left'>
  //         <div className='splash-page-main-words-container'>
  //           <p className='splash-page-main-words'>
  //             Fast, Safe, Social payments
  //           </p>
  //         <div className='splash-page-smaller-words-button-container'>
  //           <div className='splash-page-small-words'>
  //             <p>Pay, Get Paid, Share</p>
  //           </div>
  //           <div className='splash-page-button-on-page'>

  //           </div>
  //         </div>
  //        </div>
  //       </div>
  //       <div className='splashPage-right'></div>
  //     </div>
  //   )
  //  }










   return (
    <>
    {loaded && sessionLinks}
    </>
   )


}


export default HomePage
