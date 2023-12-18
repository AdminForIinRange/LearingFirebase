import { useState } from "react";

import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const SignIn = async () => {

    await createUserWithEmailAndPassword(auth, email, password)


  };
  return (
    <div>
      <input
      type="email"
        placeholder="Username"
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
      <button onClick={SignIn}>Sign In</button>
    </div>
  );
}
