import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const res = await axios({
                    method: "POST",
                    url: "http://localhost:8000/api/v1/user/signup",
                    data: {
                      username,
                      password,
                      firstName,
                      lastName,
                      withCredentials: true,
                    },
                  });

                  localStorage.setItem("token", res.data.token);

                  navigate("/dashboard");

                  console.log(res);
                } catch (err) {
                  if (err.response) {
                    // The request was made and the server responded with a status code
                    console.error(
                      "Server responded with an error:",
                      err.response.data
                    );
                  } else if (err.request) {
                    // The request was made but no response was received
                    console.error("No response received:", err.request);
                  } else {
                    // Something happened in setting up the request
                    console.error("Error setting up the request:", err.message);
                  }
                }
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
