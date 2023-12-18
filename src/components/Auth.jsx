import { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch user profile information
  const fetchUserProfile = async (user) => {
    if (user) {
      const displayName = user.displayName;
      setUserName(displayName);
      const photoURL = user.photoURL
      setProfilePic(photoURL);

      
    } else {
      setUserName("");
    }
  };

  // Function to handle Google sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Function to handle regular sign-in
  const signIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      fetchUserProfile(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {currentUser ? (
        <div>
          <p>Welcome {email}</p>
          {userName && <p>Hello, {userName}</p>}
          {profilePic && <img src={profilePic} /> }
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      )}
    </div>
  );
}
