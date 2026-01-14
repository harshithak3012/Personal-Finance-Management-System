import React, { useContext, useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from "../../context/UserContext";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-full flex flex-col justify-center">

        <h3 className="text-2xl md:text-3xl font-semibold text-[#1E40AF]">
          Create an Account
        </h3>

        <p className="text-sm md:text-base text-slate-600 mt-2 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          {/* NAME + EMAIL + PROFILE PHOTO */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Profile image top-right */}
            <div className="absolute right-0 -top-28 md:-top-24">
              <ProfilePhotoSelector
      image={profilePic}
      setImage={setProfilePic}
      className="w-28 h-28 md:w-32 md:h-32"
    />

            </div>

            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
              className="text-base"
              labelClassName="text-sm md:text-base text-slate-800"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
              className="text-base"
              labelClassName="text-sm md:text-base text-slate-800"
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-4">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 char"
              type="password"
              className="text-base"
              labelClassName="text-sm md:text-base text-slate-800"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary text-base md:text-lg mt-4"
          >
            SIGN UP
          </button>

          <p className="text-sm md:text-base text-slate-700 mt-4">
            Already have an account?{" "}
            <Link className="font-medium text-blue-600 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default SignUp;
