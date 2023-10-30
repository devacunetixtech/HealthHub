import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../styles/AllPage.module.css';
import shape from '../assets/shape.png';

const PreRegister = () =>{
    return ( 
    <>
      <main className="mb-3">
        {/* <div className={styles.bigwrapper}> */}
          <div className={styles.bigwrapper}>
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.cardcontent}>
                  <div className={styles.subcard}>
                    <h2 className={styles.bigtitle}>User Register</h2>
                    <p className={styles.text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, similique!</p>
                    <Link className={styles.btn} to='/register'>   <i className="fas fa-user"></i>Register Now</Link>
                  </div>
                  <div className={styles.subcard}>
                    <h2 className={styles.bigtitle}>Medic Register</h2>
                    <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, adipisci.</p>
                    <Link className={styles.btn} to='/register'>   <i className="fas fa-user"></i>Register Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <button className={styles.togglebtn}>hhhhh</button> */}
        {/* </div> */}
      </main>
    </>
    );
  }
  
  export default PreRegister;