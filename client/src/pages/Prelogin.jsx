import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/AllPage.module.css';
import shape from '../assets/shape.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Prelogin = () =>{
      const { loginUser } = useContext(AuthContext);
      const type1 = "USER";
      const type2 = "MEDIC"
      const saveTypeAcct =() => {
          localStorage.setItem("accType", type1)
      }
      const saveotherTypeAcct =()=>{
          localStorage.setItem("accType", type2)
      }
    return ( 
    <>
      <main>
      <div className={styles.bigwrapper}>
      <div className={styles.bigwrapper}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardcontent}>
              <div className={styles.subcard}>
                <h2 className={styles.bigtitle}>User Login</h2>
                <p className={styles.text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, similique!</p>
                <Link className={styles.btn} onClick={saveTypeAcct} to='/login'>   <i className="fas fa-user"></i>LOGIN Now</Link>
              </div>
              <div className={styles.subcard}>
                <h2 className={styles.bigtitle}>Medic Login</h2>
                <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, adipisci.</p>
                <Link className={styles.btn} onClick={saveotherTypeAcct} to='/login'>   <i className="fas fa-user"></i>lOGIN Now</Link>
              </div>
             </div>
          </div>
        </div>
      </div>
      <button className={styles.togglebtn}></button>
      </div>
      </main>
    </>
    );
  }
  
  export default Prelogin;
  