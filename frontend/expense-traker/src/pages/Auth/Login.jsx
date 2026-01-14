import React, { useContext, useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        
        <h3 className="text-2xl md:text-3xl font-semibold text-black">
          Welcome Back
        </h3>

        <p className="text-sm md:text-base text-slate-700 mt-2 mb-6">
          Please enter details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            className="text-base"
            labelClassName="text-sm md:text-base"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 char"
            type="password"
            className="text-base"
            labelClassName="text-sm md:text-base"
          />

          {error && (
            <p className="text-red-500 text-sm pb-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary text-base md:text-lg"
          >
            LOGIN
          </button>

          <p className="text-sm md:text-base text-slate-800 mt-4">
            Don't have an account?{" "}
            <Link
              className="font-medium text-primary underline"
              to="/SignUp"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Login;
