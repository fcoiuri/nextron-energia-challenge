import React from 'react';
import { useRouter } from 'next/router';
import { DataContext } from 'contexts';

export default function Register() {
  const router = useRouter();
  const { state, fetchRegister } = React.useContext(DataContext);
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const { register, loading, error } = state;

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  React.useEffect(() => {
    if (register.success!) {
      router.push('/login');
    }
  }, [register.success!]);

  const handleSubmit = async () => {
    fetchRegister(emailValue, passwordValue, nameValue);
  };

  const handleSign = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="wrapper">
      <h1>Register</h1>
      <input
        className="input"
        type="name"
        placeholder="Name"
        value={nameValue}
        name="name"
        onChange={handleName}
      />
      <input
        className="input"
        type="text"
        placeholder="Email"
        value={emailValue}
        name="email"
        onChange={handleEmail}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={passwordValue}
        name="password"
        onChange={handlePassword}
      />

      <button
        type="submit"
        className="buttonSubmit"
        disabled={loading}
        onClick={() => handleSubmit()}
      >
        {loading ? '.....' : 'Sign Up'}
      </button>
      <div className="message">{error && <p>&bull; {error}</p>}</div>
      <div className="sign">
        <a href="/login" onClick={() => handleSign}>
          Have an account? Login now!
        </a>
      </div>
    </div>
  );
}
