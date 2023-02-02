
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector  } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import './navbar.css'


function NavBar({loaded}){
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <nav>
        {/* <div className='logged-in-left-nav-container'> */}
          {/* <div>
            <NavLink className={'logo'} to='/' exact={true} activeClassName='active'>
              Cashmo
            </NavLink>
          </div> */}
          {/* <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>
          <div>
            <NavLink to='/paymentmethod' exact={true} activeClassName='active'>
              Payment Method
            </NavLink>
          </div>
          <div>
            <LogoutButton />
        </div> */}
       {/* </div> */}

      </nav>
    )
  } else {
    sessionLinks = (

    <div className='inner-nav-container'>
      <div className='logo-container'>
       <NavLink className={'logo'} to='/' exact={true} activeClassName='active'>
            cashmo
          </NavLink>
        {/* <h3 className='logo'>cashmo</h3> */}
      </div>
      <div>
      <nav>
        {/* <ul> */}
        <div className='navbar-link-container'>
        <div>
          <NavLink className={'nav-log-in-link'} to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink className={'nav-sign-up-link'} to='/sign-up' exact={true} activeClassName='active'>
            Join Cashmo!
          </NavLink>
        </div>
        </div>
        {/* </ul> */}
      </nav>
      </div>
    </div>
    )
  }

  return (
    <div className='nav-container'>
      {loaded && sessionLinks}
    </div>
  )

}

export default NavBar;




















// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector  } from 'react-redux';
// import LogoutButton from '../auth/LogoutButton';

// import './navbar.css'


// function NavBar({loaded}){
//   const sessionUser = useSelector(state => state.session.user);
//   let sessionLinks;
//   if(sessionUser) {
//     sessionLinks = (
//       <nav>
//         {/* <ul> */}
//         <div>CashMo Logo Picture</div>
//         <div>
//           <NavLink to='/' exact={true} activeClassName='active'>
//             Home
//           </NavLink>
//         </div>
//         <div>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </div>
//         <div>
//           <NavLink to='/paymentmethod' exact={true} activeClassName='active'>
//             Payment Method
//           </NavLink>
//         </div>
//         <div>
//           <LogoutButton />
//         </div>
//         {/* </ul> */}
//       </nav>
//     )
//   } else {
//     sessionLinks = (

//     <div className='inner-nav-container'>
//       <div className='logo-container'>
//        <NavLink className={'logo'} to='/' exact={true} activeClassName='active'>
//             cashmo
//           </NavLink>
//         {/* <h3 className='logo'>cashmo</h3> */}
//       </div>
//       <div>
//       <nav>
//         {/* <ul> */}
//         <div className='navbar-link-container'>
//         <div>
//           <NavLink className={'nav-log-in-link'} to='/login' exact={true} activeClassName='active'>
//             Login
//           </NavLink>
//         </div>
//         <div>
//           <NavLink className={'nav-sign-up-link'} to='/sign-up' exact={true} activeClassName='active'>
//             Get Cashmo
//           </NavLink>
//         </div>
//         </div>
//         {/* </ul> */}
//       </nav>
//       </div>
//     </div>
//     )
//   }

//   return (
//     <div className='nav-container'>
//       {loaded && sessionLinks}
//     </div>
//   )

// }

// export default NavBar;










// function NavBar({loaded}){

//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to='/' exact={true} activeClassName='active'>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/login' exact={true} activeClassName='active'>
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/sign-up' exact={true} activeClassName='active'>
//             Sign Up
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/paymentmethod' exact={true} activeClassName='active'>
//             Payment Method
//           </NavLink>
//         </li>
//         <li>
//           <LogoutButton />
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;
