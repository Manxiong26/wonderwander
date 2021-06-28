import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER_ADMIN',
      payload: {
        username: username,
        password: password,
        email: email,
        first_name: name,

      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register Admin</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label htmlFor="password">
            Email:
        <input
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="name">
            First Name
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default AdminRegister;