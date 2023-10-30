import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import acunetix from '../assets/acunetix.jpg';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Reglog.module.css';
import 'boxicons/css/boxicons.min.css';

const Register = () =>{
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [ file, setFile ] = useState();
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    const accType = localStorage.getItem("accType")
    console.log(accType)
    return (
      <>
        {/* HERO SECTION */}
        <div id="container" className={[styles.signup].join(' ')}>
        <div className={styles.row}>
          <div className={[styles.lop, styles.alignitemscenter, styles.flexcol].join(' ')}>
            <div className={[styles.formwrapper, styles.alignitemscenter].join(' ')}>
              <div className={[styles.form, styles.signin].join(' ')}>
                <form onSubmit={registerUser}>
                  <div className="mt-2">
                  <label>ACCOUNT TYPE: </label>
                  <select name="accountType" id="accountType"                   
                    onChange={(e) => 
                      updateRegisterInfo({...registerInfo, acctType: e.target.value})
                    } 
                  > 
                    <option value="">choose one</option>
                    <option value="USER">USER</option>
                        <option value="MEDIC">MEDIC</option>
                  </select>
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bxs-user'></i>
                    <input type="text" placeholder="Full Name"
                      onChange={(e) => 
                        updateRegisterInfo({...registerInfo, name: e.target.value})
                      }
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bxs-user'></i>
                    <input type="text" placeholder="Username"
                      onChange={(e) => 
                        updateRegisterInfo({...registerInfo, username: e.target.value})
                      }
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bx-mail-send'></i>
                    <input type="email" placeholder="Email"
                      onChange={(e) => 
                        updateRegisterInfo({...registerInfo, email: e.target.value})
                      }
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bxs-lock-alt'></i>
                    <input type="password" placeholder="Password"
                      onChange={(e) => 
                        updateRegisterInfo({...registerInfo, password: e.target.value})
                      }
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <i className='bx bxs-phone'></i>
                    <input type="text" placeholder="Phone Number"
                      onChange={(e) => 
                        updateRegisterInfo({...registerInfo, phoneNo: e.target.value})
                      }
                    />
                  </div>
                  <button type='submit' className="border bg-blue-800 hover:bg-blue-600">
                  {isRegisterLoading ? "...creating" : "REGISTER"}
                </button>
                {registerError?.error && (
                  <div className="bg-red-500 text-white p-2">
                    <p>{registerError?.message}</p>
                  </div>
                )}
                </form>
                <p><span className='text-gray-600 font-bold'>Already have an account? </span>
                  <b className={styles.pointer}><Link to='/prelogin'> Sign in here</Link></b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  export default Register;