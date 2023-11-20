import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password';
import React, { useState } from 'react'
import './style.css';
import { Button } from 'primereact/button';
import supabase from '../../lib/helper/supabaseClient';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      signInSuccess(data);
      setError(false);
    }
    catch {
      setError(true);
    }
  }

  const signInSuccess = (data) => {
    localStorage.setItem('tk', data.session.access_token);
    navigate('/');
  }

  let tip = <p></p>;

  if (error) {
    tip = <p className='error-tip'>Usuário ou senha incorretos!</p>
  }

  return (
    <div>
      <Card className="card flex justify-content-center align-items-center">
        <div className='flex justify-content-center'><div className='jjba_ref02'></div></div>
        <div className='login-header flex justify-content-center'>Login</div>
        <p style={{ textAlign: 'center', opacity: '50%' }}>É bom te-los conosco de novo!</p>
        <div className='flex flex-column'>
          <div className='m-3'>
            <span className='p-float-label'>
              <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)}>
              </InputText>
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className='m-3'>
            <span className='p-float-label'>
              <Password feedback={false} id="password" value={password} onChange={(e) => setPassword(e.target.value)}>
              </Password>
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <div className='flex justify-content-between m-4'>
              {tip}
              <Button label='Entrar' onClick={onLogin}/>
          </div>
        </div>
      </Card>
    </div>
  )
}
