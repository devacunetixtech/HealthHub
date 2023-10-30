import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const navigateTo = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);


    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);    
    const [ registerInfo, setRegisterInfo] = useState({
        acctType: "",
        name: "",
        username: "",
        email: "",
        password: "",
        phoneNo: "",
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [ loginInfo, setLoginInfo] = useState({
        acctType: "",
        email: "",
        password: "",
    });

    const [profileError, setProfileError] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [ profileInfo, setProfileInfo] = useState({
        userDoctor: "",
        userAge: "",
        userBlood: "",
        userGenotype: "",
        userWeight: "",
        userAllergies: "",
    });

    const [chatError, setChatError] = useState(null);
    const [isChatLoading, setIsChatLoading] = useState(false);
    // const [ chatInfo, setChatInfo] = useState({
    //     senderID: "",
    //     recipientID: "",
    //     content: "",
    // });
    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    }, []);

    console.log("registerInfo", registerInfo);
    console.log("loginInfo", loginInfo);
    console.log("profileInfo", profileInfo);
    // console.log("chatInfo", chatInfo);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, [])
    const updateProfileInfo = useCallback((info) => {
        setProfileInfo(info);
    }, [])
    // const updateChatInfo = useCallback((info) => {
    //     setChatInfo(info);
    // }, [])
     
    const registerUser = useCallback(async(e)=> {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
            `${baseUrl}/users/register`, JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false)
        if(response.error){
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))    
        setUser(response)
        navigateTo('/login')
    }, [registerInfo]);

    const loginUser = useCallback(async(e) =>{
        e.preventDefault();
        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(
            `${baseUrl}/users/login`, JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false)
        if(response.error){
            return setLoginError(response);
        }
        
        localStorage.setItem("User", JSON.stringify(response))    
        setUser(response)
        navigateTo('/dashboard')
    }, [loginInfo]);    

    const saveProfile = useCallback(async (e) => {
        e.preventDefault(); 
        const userID = user._id;
        const userName = user.name;

        if (profileInfo.userAge && profileInfo.userBlood && profileInfo.userGenotype && profileInfo.userWeight && profileInfo.userAllergies) {
            sendProfileInfoToBackend(userID, userName, profileInfo.userDoctor, profileInfo.userAge, profileInfo.userBlood, profileInfo.userGenotype, profileInfo.userWeight, profileInfo.userAllergies);
          } else {
            alert("Please input all details");
          }
        setFormSubmitted(true);
    }, [profileInfo]);

    const sendProfileInfoToBackend = async (userID, userName, userDoctor, userAge, userBlood, userGenotype, userWeight, userAllergies) => {
        try {
            const response = await postRequest(
                `${baseUrl}/users/save-profile`, 
                JSON.stringify({ userID, userName, userDoctor, userAge, userBlood, userGenotype, userWeight, userAllergies })
            );
            setIsProfileLoading(false)
            if(response.error){
                return setProfileError(response);
            }
            // Handle the successful response from the backend
            // You can redirect or perform any other necessary actions
            navigateTo('/dashboard')
        } catch (error) {
            console.error(error);
            setProfileError({ error: 'Failed to save profile on the server' });
        }
    };

    // const sendMessage = useCallback(async (senderID, newMessage) => {
    //     // const senderID = user.name;
    //     const recipientID = localStorage.getItem('randomDoctorName');
    //     // const senderID = user._id;
    //      sendChatInfoToBackend(senderID, recipientID, chatInfo.content);
    // }, [chatInfo]);

    const sendMessage = async (senderID, newMessage) => {
        try {
            const recipientID = localStorage.getItem('randomDoctorName');
            const response = await postRequest(
                `${baseUrl}/users/send-message`, 
                JSON.stringify({ senderID, recipientID, newMessage })
            );
            setIsChatLoading(false)
            if(response.error){
                return setChatError(response);
            }
            // Handle the successful response from the backend
            // You can redirect or perform any other necessary actions
        } catch (error) {
            console.error(error);
            setChatError({ error: 'Failed to save profile on the server' });
        }
    };

    const logoutUser = useCallback(() =>{
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    return (
    <AuthContext.Provider 
        value ={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser,
            loginUser,
            loginInfo,
            updateLoginInfo,
            loginError,
            isLoginLoading,
            saveProfile,
            profileInfo,
            updateProfileInfo,
            profileError,
            isProfileLoading,
            formSubmitted,
            setFormSubmitted,
            sendMessage,
        }}>
        {children}
    </AuthContext.Provider>
    );
};

