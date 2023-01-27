import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }


    return (
<div className='login-splashPage-container'>

    <form className='form-login' onSubmit={onLogin}>
    <div className='login-form-container'>
    <div className='login-form-contents'>
      <div className='login-top'>
      <div>
        <h2 className='login-logo'>Cashmo</h2>
      </div>
      <div>
       <p className='login-word-font'>Log in</p>
        </div>
      </div>
    <div className='login-bottom'>
      <div className='login-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='input'>
        {/* <label htmlFor='email'>Email</label> */}
        <input
        className='login-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='input'>
        {/* <label htmlFor='password'>Password</label> */}
        <input
        className='login-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
       </div>
       <div className="login-button-container">
        <button className='login-form-button' type='submit'>Login</button>
       </div>

    </div>

        </div>

        </div>
    </form>


  </div>


  );
};

export default LoginForm;





//   return (
//     <div className='splashPage-container'>
//       <div className='log-in-form'>
//     <form onSubmit={onLogin}>
//       <div>
//         {errors.map((error, ind) => (
//           <div key={ind}>{error}</div>
//         ))}
//       </div>
//       <div>
//         <label htmlFor='email'>Email</label>
//         <input
//           name='email'
//           type='text'
//           placeholder='Email'
//           value={email}
//           onChange={updateEmail}
//         />
//       </div>
//       <div>
//         <label htmlFor='password'>Password</label>
//         <input
//           name='password'
//           type='password'
//           placeholder='Password'
//           value={password}
//           onChange={updatePassword}
//         />
//         <button type='submit'>Login</button>
//       </div>
//     </form>

//       </div>

//     </div>
//   );
// };

// export default LoginForm;
