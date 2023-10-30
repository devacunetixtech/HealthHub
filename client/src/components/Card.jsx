// import React from 'react';
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from 'react-router-dom'; 

// const Card = ({ logoSrc }) => {
//     const { user } = useContext(AuthContext);
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mx-4 md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
//       <img src={logoSrc} alt="Logo" className="mx-auto mb-2" />
//       <div className="text-center">
//         <div className="text-xl font-semibold mb-2">ACCT NAME: {user.acctType}</div>
//         <div className="text-xl font-semibold mb-2">ACCT NAME: {user.name}</div>
//         <div className="text-md font-semibold">EMAIL: {user.email}</div>
//         {/* <div className="text-md font-semibold">Type :{user.saveAcctType}</div> */}
//         <Link to="/chat" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-gray-900 hover:bg-gray-600"> Consult A Medic</Link>

//       </div>
//     </div>
//   );
// };

// export default Card;
import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom'; 

const Card = ({ logoSrc }) => {
  const { user } = useContext(AuthContext);

  // Define different content based on the account type
  const renderContentBasedOnAccountType = () => {
    if (user.acctType === "USER") {
      return (
        <>
          <div className="text-l font-semibold mb-2">ACCT: {user.acctType}</div>
          <div className="text-l font-semibold mb-2">ACCT NAME: {user.name}</div>
          <div className="text-md font-semibold">EMAIL: {user.email}</div>
          <Link to="/chat" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-gray-900 hover:bg-gray-600">Consult A Medic</Link>
        </>
      );
    } else if (user.acctType === "MEDIC") {
      return (
        <>
          <div className="text-l font-semibold mb-2">ACCT: {user.acctType}</div>
          <div className="text-l font-semibold mb-2">ACCT NAME: {user.name}</div>
          <div className="text-md font-semibold">EMAIL: {user.email}</div>
          <Link to="/chat" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-gray-900 hover:bg-gray-600">Consult A Client</Link>
        </>
      );
    } else {
      return null;
      console.log("Error") // Unknown account type or no specific content to display
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mx-4 md:mx-0 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img src={logoSrc} alt="Logo" className="mx-auto mb-2" />
      <div className="text-center">
        {renderContentBasedOnAccountType()}
      </div>
    </div>
  );
};

export default Card;
