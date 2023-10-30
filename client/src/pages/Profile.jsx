import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import acunetix from '../assets/acunetix.jpg';
// import { Toaster } from 'react-hot-toast';
import styles from '../styles/Profile.module.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () =>{
    const { user, logoutUser } = useContext(AuthContext);
    const [ file, setFile ] = useState()
    const { profileInfo, updateProfileInfo, saveProfile, profileError, isProfileLoading, formSubmitted, setFormSubmitted } = useContext(AuthContext);

    const clearFormDiv = () => {
      updateProfileInfo({
        userDoctor: '',
        userAge: '',
        userBlood: '',
        userGenotype: '',
        userWeight: '',
        userAllergies: '',
      });

      // Hide the new div
      setFormSubmitted(false);
    };

    const [randomDoctorName, setRandomDoctorName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchRandomDoctorName = () => {
      setIsLoading(true);
  
      fetch("http://localhost:5000/api/users/doctors") // Replace with the actual API endpoint
        .then((response) => response.json())
        .then((data) => {
          setRandomDoctorName(data._id); // Assuming the response contains the 'name' field
          localStorage.setItem('randomDoctorName', data._id);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    // Retrieve randomDoctorName from localStorage in another component
    const savedRandomDoctorName = localStorage.getItem('randomDoctorName');

    useEffect(() => {
      // Fetch a random user's name when the component mounts
      fetchRandomDoctorName();
      updateProfileInfo({...profileInfo, userDoctor: savedRandomDoctorName})
    }, []);
    
    const displayFormBasedOnCondition = () => { 
      if (user.acctType === "USER") {
        return (
          <form className="py-1" onSubmit={saveProfile}>
            <div className="textbox flex flex-col items-center gap-6">
              <input required className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-gray-300 focus:ring-4" 
              type="number" placeholder="enter your age"
              onChange={(e) => 
                updateProfileInfo({...profileInfo, userAge: e.target.value})
              } 
              />
              <label>Select Blood Group:</label>
                <select required name="bloodGroup" id="bloodGroup"                   
                  onChange={(e) => 
                    updateProfileInfo({...profileInfo, userBlood: e.target.value})
                  } 
                >
                  <option value="">select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              <label>Select Genotype:</label>
                <select id="genotype" name="genotype" required 
                  onChange={(e) => 
                    updateProfileInfo({...profileInfo, userGenotype: e.target.value})
                  } 
                >
                    <option value="">select</option>
                    <option value="AA">AA</option>
                    <option value="AS">AS</option>
                    <option value="SS">SS</option>
                    <option value="AC">AC</option>
                    <option value="CC">CC</option>
                </select>
              <input required className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-gray-300 focus:ring-4" 
              type="text" placeholder="enter your weight"
              onChange={(e) => 
                updateProfileInfo({...profileInfo, userWeight: e.target.value})
              } 
              />
              <input required className="border-gray-700 border-2 px-1 py-2 rounded-xl w-3/4 shadow-sm text-lg rounded-lg border cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-gray-300 focus:ring-4" 
              type="text" placeholder="enter all allergies"
              onChange={(e) => 
                updateProfileInfo({...profileInfo, userAllergies: e.target.value})
              } 
              />

              <button className="border bg-blue-500 hover:bg-red-400 w-3/4 py-3 rounded-lg text-gray-50 text-xl shadow-sm text-center {styles.btn}" type='submit'>
              {isProfileLoading ? "Saving Data" : "Save Profile"}
              </button>
              {profileError?.error && (
                <div className="bg-red-500 text-white p-2">
                    <p>{profileError?.message}</p>
                </div>
                )}
            </div>
          </form>
        );
      } else if (user.acctType === "MEDIC") {
          return (
            // <form className="py-1" onSubmit={saveProfile}>
            <div>
                  <h2>Details</h2>
                  <p>Name {user.name}</p>
                  <p>Email {user.email}</p>
            </div>
            // </form>
          );
      } 
    };

    return (
      <>
        <div className="container mx-auto my-2">
        {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}
        <div className="flex justify-center itemscenter h-screen">
          <div className={styles.glass} >

            <div className="title flex flex-col items-center">
              <h4 className='text-2xl text-gray-800 font-bold'>PROFILE</h4>
              <span className='py-4 w-2/3 text-center text-gray-500 text-xl font-bold'>
                ACTIVE : {user.name}
              </span>
            </div>

            {formSubmitted ? (  // Display the new div if the form has been submitted
              <div>
                <h2>Form Submitted Successfully</h2>
                <p>Age: {profileInfo.userAge}</p>
                <p>Blood Group: {profileInfo.userBlood}</p>
                <p>Genotype: {profileInfo.userGenotype}</p>
                <p>Weight: {profileInfo.userWeight}</p>
                <p>Allergies: {profileInfo.userAllergies}</p>
                <button onClick={clearFormDiv}>Clear Form</button>
              </div>
            ) : (
            // <form className='py-1' onSubmit={saveProfile}>

            // </form>
            displayFormBasedOnCondition()
            )}
            <div className="text-center py-4">
              <span className='text-gray-900'>Want to LogOut?
                <Link onClick={()=>{logoutUser()}} className='text-red-800 hover:underline cursor-pointer' to='/'>Log Out</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Profile;