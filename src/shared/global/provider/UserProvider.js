import React, {useState, useContext, createContext, useEffect} from 'react'
import {auth} from '../../../firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signOut() {
        return auth.signOut()
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function deleteAccount() {
        return currentUser.delete()
    }

    function sendPasswordResetMail(mail) {
        return auth.sendPasswordResetEmail(mail)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])

    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        updatePassword,
        deleteAccount,
        sendPasswordResetMail
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}