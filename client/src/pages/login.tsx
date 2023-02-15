import React from 'react';
import { useRouter } from 'next/router';
import { createCookie } from '_utils/utils';
import { DataContext } from 'contexts';

export default function Login() {
  const router = useRouter();
  const { state, fetchLogin } = React.useContext(DataContext);
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const { login, loading, error } = state;

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  React.useEffect(() => {
    if (login.success!) {
      (window as any).token = login.token!;
      createCookie('token', login.token!, 0.5);
      router.push({ pathname: '/session' });
    }
  }, [login.success!]);

  const handleSubmit = async () => {
    fetchLogin(emailValue, passwordValue);
  };

  const handleSign = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push('/register');
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <h1>Login</h1>
        <input
          className="input"
          type="text"
          placeholder="email"
          value={emailValue}
          name="email"
          onChange={handleEmail}
        />

        <input
          className="input"
          type="password"
          placeholder="password"
          value={passwordValue}
          name="password"
          onChange={handlePassword}
        />

        <button
          className="buttonSubmit"
          type="submit"
          disabled={loading}
          onClick={() => handleSubmit()}
        >
          {loading ? '.....' : 'login'}
        </button>
        <div className="message">{error}</div>
        <div className="sign">
          <a href="/register" onClick={() => handleSign}>
            Don't have an account? Register now!
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
