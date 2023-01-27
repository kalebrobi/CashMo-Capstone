import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './homepage.css'
import './iphoneimg.png'


const HomePage = ({loaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  const imageHome = './iphoneimg.png'
   let sessionLinks;
  if(sessionUser) {
    sessionLinks =  (
      <h1>CashMo</h1>
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
