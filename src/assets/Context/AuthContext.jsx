import { useEffect, createContext, useState, useContext } from "react";
import { supbase } from "../../../SuperbaseClient.js"; 

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Signup function
    const signupNewUser = async (email, password) => {
        const { data, error } = await supbase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.log("There was a problem signing up:", error);
            return { success: false, error };
        }

        return { success: true, data };
    };

    // signin fun
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supbase.auth.signInWithPassword({
                email,
                password
            });
    
            if (error) {
                console.error("Sign-in error occurred:", error);
                return { success: false, error: error.message };
            }
    
            console.log("Sign-in success:", data);
            return { success: true, data };
        } catch (error) {
            console.error("An error occurred:", error);
            return { success: false, error: error.message };
        }
    };
    

    useEffect(() => {
        supbase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supbase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    //  sign out
    const signOut = () =>{
        const error = supbase.auth.signOut()

        if(error){
            console.log('there as an error', error)
        }

    } 

    return (
        <AuthContext.Provider value={{ session, signupNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use Auth Context
export const UserAuth = () => {
    return useContext(AuthContext);
};
