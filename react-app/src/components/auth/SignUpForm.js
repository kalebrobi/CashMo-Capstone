import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_photo, setProfile_photo] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();




  // const onSignUp = async (e) => {
  //   e.preventDefault();
  //   setErrors([])
  //   const newUser = {
  //     first_name,
  //     last_name,
  //     username,
  //     email,
  //     profile_photo,
  //     password
  //   }

  //   if (password === repeatPassword) {
  //     const data = await dispatch(signUp(newUser));
  //     if (data && data.errors) {
  //       setErrors(data)
  //     }
  //   }
  // }

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, profile_photo, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords do not match'])
    }
  };
  const updateFirstName = (e) => {
    setFirst_name(e.target.value);
  };

  const updateLastName = (e) => {
    setLast_name(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfile_photo = (e) => {
    setProfile_photo(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-splashPage-container'>

      <form className='form-login' onSubmit={onSignUp}>
      <div className='signup-form-container'>
      <div className='login-form-contents'>
      <div className='login-top'>
        <div>
          <h2 className='login-logo'>Cashmo</h2>
        </div>
        <div>
         <p className='login-word-font'>Sign up</p>
          </div>
        </div>
        <div className='login-bottom'>
        <div className='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='input'>
          <input
          className='login-input'
            required
            type='text'
            name='first_name'
            placeholder='First Name'
           onChange={updateFirstName}
            value={first_name}
          ></input>
        </div>
        <div className='input'>
          <input
          className='login-input'
            required
            type='text'
            name='last_name'
            placeholder='Last Name'
            onChange={updateLastName}
            value={last_name}
          ></input>
        </div>
        <div className='input'>
          <input
          className='login-input'
            type='text'
            required
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='input'>
          <input
          className='login-input'
            type='text'
            required
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>

        <div className='input'>
          <input
          className='login-input'
            type='text'
            name='profile_photo'
            placeholder='Profile Photo'
            onChange={updateProfile_photo}
            value={profile_photo}
          ></input>
        </div>
        <div className='input'>
          <input
          className='login-input'
            type='password'
            required
            name='password'
            placeholder='Passord'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='input'>
          <input
          className='login-input'
            type='password'
            required
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
        </div>
        <div className="login-button-container">
        <button className='login-form-button' type='submit'>Sign Up</button>
        </div>

          </div>
        </div>
        </div>
      </form>

  </div>
    );
  };

  export default SignUpForm;


//   return (
//   <div className='login-splashPage-container'>

//     <form className='form-login' onSubmit={onSignUp}>
//     <div className='signup-form-container'>
//     <div className='login-form-contents'>
//     <div className='login-top'>
//       <div>
//         <h2 className='login-logo'>Cashmo</h2>
//       </div>
//       <div>
//        <p className='login-word-font'>Sign up</p>
//         </div>
//       </div>
//       <div className='login-bottom'>
//       <div className='login-errors'>
//         {errors.map((error, ind) => (
//           <div key={ind}>{error}</div>
//         ))}
//       </div>
//       <div className='input'>
//         <input
//         className='login-input'
//           required
//           type='text'
//           name='first_name'
//           placeholder='First Name'
//           onChange={updateFirstName}
//           value={first_name}
//         ></input>
//       </div>
//       <div className='input'>
//         <input
//         className='login-input'
//           required
//           type='text'
//           name='last_name'
//           placeholder='Last Name'
//           onChange={updateLastName}
//           value={last_name}
//         ></input>
//       </div>
//       <div className='input'>
//         <input
//         className='login-input'
//           type='text'
//           required
//           name='username'
//           placeholder='Username'
//           onChange={updateUsername}
//           value={username}
//         ></input>
//       </div>
//       <div className='input'>
//         <input
//         className='login-input'
//           type='text'
//           required
//           name='email'
//           placeholder='Email'
//           onChange={updateEmail}
//           value={email}
//         ></input>
//       </div>

//       <div className='input'>
//         <input
//         className='login-input'
//           type='text'
//           name='profile_photo'
//           placeholder='Profile Photo'
//           onChange={updateProfile_photo}
//           value={profile_photo}
//         ></input>
//       </div>
//       <div className='input'>
//         <input
//         className='login-input'
//           type='password'
//           required
//           name='password'
//           placeholder='Passord'
//           onChange={updatePassword}
//           value={password}
//         ></input>
//       </div>
//       <div className='input'>
//         <input
//         className='login-input'
//           type='password'
//           required
//           name='repeat_password'
//           placeholder='Repeat Password'
//           onChange={updateRepeatPassword}
//           value={repeatPassword}
//         ></input>
//       </div>
//       <div className="login-button-container">
//       <button className='login-form-button' type='submit'>Sign Up</button>
//       </div>

//         </div>
//       </div>
//       </div>
//     </form>

// </div>
//   );
// };

// export default SignUpForm;

















//   return (
//     <form onSubmit={onSignUp}>
//       <div>
//         {errors.map((error, ind) => (
//           <div key={ind}>{error}</div>
//         ))}
//       </div>
//       <div>
//         <label>First Name</label>
//         <input
//           type='text'
//           name='first_name'
//           onChange={updateFirstName}
//           value={first_name}
//         ></input>
//       </div>
//       <div>
//         <label>Last Name</label>
//         <input
//           type='text'
//           name='last_name'
//           onChange={updateLastName}
//           value={last_name}
//         ></input>
//       </div>
//       <div>
//         <label>User Name</label>
//         <input
//           type='text'
//           name='username'
//           onChange={updateUsername}
//           value={username}
//         ></input>
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type='text'
//           name='email'
//           onChange={updateEmail}
//           value={email}
//         ></input>
//       </div>
//       <div>
//       <div>
//         <label>Profile Photo</label>
//         <input
//           type='text'
//           name='profile_photo'
//           onChange={updateProfile_photo}
//           value={profile_photo}
//         ></input>
//       </div>
//         <label>Password</label>
//         <input
//           type='password'
//           name='password'
//           onChange={updatePassword}
//           value={password}
//         ></input>
//       </div>
//       <div>
//         <label>Repeat Password</label>
//         <input
//           type='password'
//           name='repeat_password'
//           onChange={updateRepeatPassword}
//           value={repeatPassword}
//           required={true}
//         ></input>
//       </div>
//       <button type='submit'>Sign Up</button>
//     </form>
//   );
// };

// export default SignUpForm;
