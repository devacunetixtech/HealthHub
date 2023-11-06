import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/Reglog.module.css';
import acunetix from '../assets/acunetix.jpg';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import 'boxicons/css/boxicons.min.css';

const Login = () => {
  const [file, setFile] = useState();
  const { loginUser, loginInfo, updateLoginInfo, loginError, isLoginLoading } = useContext(AuthContext);

  return (
    <>
      {/* HERO SECTION */}
      <div className={[styles.signin].join(' ')}>
        <div className={styles.row}>
          <div className={[styles.lop, styles.alignitemscenter, styles.flexcol].join(' ')}>
            <div className={[styles.formwrapper, styles.alignitemscenter].join(' ')}>
              <div className={[styles.form, styles.signin].join(' ')}>
                <form onSubmit={loginUser}>
                  <div className="mt-2">
                  <label>ACCOUNT TYPEE: </label>
                  <select name="accountType" id="accountType"                   
                    onChange={(e) => 
                      updateLoginInfo({...loginInfo, acctType: e.target.value})
                    } 
                  > 
                    <option value="">choose one</option>
                    <option value="USER">USER</option>
                        <option value="MEDIC">MEDIC</option>
                  </select>
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bxs-envelope'></i>
                    <input type="email" placeholder="Email"
                      onChange={(e) =>
                        updateLoginInfo({...loginInfo, email: e.target.value})
                      }
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bxs-lock-open-alt'></i>
                    <input type="password" placeholder="Password" 
                      onChange={(e) => 
                        updateLoginInfo({...loginInfo, password: e.target.value})
                      }
                    />
                  </div>
                  <button className="border bg-blue-800 hover:bg-blue-600">
                  {isLoginLoading ? "...logging in" : "LOGIN"}
                </button>
                {loginError?.error && (
                  <div className="bg-red-500 text-white p-2">
                    <p>{loginError?.message}</p>
                  </div>
                )}
                </form>
                <p><b>Forgot password?</b></p>
                <p><span className='text-gray-600 font-bold'> Don't have an account?</span>
                  <b className={styles.pointer}><Link to='/preregister'> Register Now</Link></b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
