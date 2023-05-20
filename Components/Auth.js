import { useState } from "react";
import { auth } from "../pages/Firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const Auth = ({ setTab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("register successfully");
    } catch (err) {
      alert("user register already");
      console.error(err);
    }
    setTab((prev) => prev + 1)
  };

  return (
    <div className=" border rounded-xl bg-slate-500 py-[150px] lg:w-[500px] w-auto  border-black p-5 flex flex-col">
      <p className=" text-2xl text-center my-4">Sign Up Form</p>
      <form>
        
      
      <input
        className=" m-2 w-[90%] border mx-5 border-black p-2 rounded"
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className=" m-2 w-[90%] border mx-5 my-4 border-black p-2 rounded"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      </form>
      <button
        className=" border mx-5 border-black p-2 px-4 rounded bg-orange-400"
        type=""
        onClick={signUp}
      >
        Sign Up
      </button>
      <p className="mx-5 mt-5 text-center"> if you are already register
      <button
        type=""
        className=" text-blue-900 underline ml-2"
        onClick={() => setTab((prev) => prev + 1)}
      >
        login?
      </button>
      </p>
      
    </div>
  );
};

export default Auth;
