import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../pages/Firebase";
import { useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const SignIn = ({ setTab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [progress, setprogress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  console.log(auth?.currentUser?.email);

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("signIn successfully");
    } catch (err) {
      alert("not register");
      console.error(err);
    }
  };
  let uploadimg;

  const userDetail = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + fileUrl.name);
    const uploadTask = uploadBytesResumable(storageRef, fileUrl);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          alert("uploded successfully");
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="border rounded-xl bg-slate-500 py-[150px] lg:w-[500px] w-auto border-black p-5 flex flex-col">
      <p className=" text-2xl text-center my-4 ">Sign In</p>
      <form >
      <input
        className=" m-2 w-[90%] border mx-5 border-black p-2 rounded"
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className=" m-2 w-[90%] border mx-5 border-black p-2 rounded"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      </form>
      <button
        className=" border mx-5 border-black p-2 px-4 rounded bg-orange-400"
        type=""
        onClick={logIn}
      >
        Sign In
      </button>

      <p className="mx-5 mt-5 text-center">
        {" "}
        if you are not register
        <button
          className=" border ml-2 border-black p-2 px-4 rounded bg-orange-400"
          onClick={() => setTab((prev) => prev - 1)}
        >
          Sign Up
        </button>
      </p>
      <br />
      <hr className=" border border-black" />
      <label className="text-white">
        <input
          type="file"
          id="input-file"
          className="mt-5 bg-white rounded-lg text-black border border-black mx-5 px-9 py-3 "
          onChange={(e) => setFileUrl(e.target.files[0])}
        />
      </label>
      <button
        onClick={userDetail}
        className="p-2 px-4  mt-3 border rounded border-black bg-orange-400 mx-5 btn-warning fs-5"
      >
        Upload Pic
      </button>
      <p className="my-5 mx-5 uppercase">
        {" "}
        the uploaded image is below:
        {imageUrl && (
          <img className="w-[450px]" src={imageUrl} alt="Uploaded" />
        )}
      </p>
    </div>
  );
};

export default SignIn;
