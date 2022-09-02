import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { sendNotification } from "../../../../App";
import { fetchNotifications } from "../../../../app/slices/notificationSlice";
import auth from "../../../../firebase.init";
import useUser from "../../Hooks/useUser";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

const ECheck = () => {
  const fullDate = new Date().toLocaleDateString();
  const date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
  const time = new Date().toLocaleTimeString();
  const [user] = useAuthState(auth);
  const [mongoUser] = useUser(user);
  const dispatch = useDispatch();
  const seriulNumber = uuidv4();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // USE EMAIL JS
  const form = useRef();
  const onSubmit = (data) => {
    const amount = data?.amount;
    const email = data?.email;
    const reference = data?.reference;
    toast.loading("Money is being Process.", { id: "apply-eCheck" });
    const eCheckInfo = {
      type: "E-Check",
      email: user?.email,
      amount: amount,
      name: mongoUser?.name,
      from: user?.email,
      to: email,
      reference: reference,
      fullDate,
      date,
      time,
      serialNumber: seriulNumber,
      image: mongoUser?.avatar,
    };

    fetch("http://localhost:5000/eCheck", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ eCheckInfo }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("apply-eCheck");
        toast.dismiss();
        if (result?.error) {
          toast.error(result.error);
        } else {
          reset();
          if (user.email === email) {
            dispatch(fetchNotifications(email));
          } else {
            sendNotification(email, "eCheck");
          }
          emailjs
            .sendForm(
              // "YOUR_SERVICE_ID",
              "service_q11i3to",
              // "YOUR_TEMPLATE_ID",
              "template_60e7bmp",
              form.current,
              // "YOUR_PUBLIC_KEY"
              "_BZVGBP7_QzIIrIGO"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
          toast.success(result.success);
        }
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">E-Check</h2>
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("amount", {
              min: {
                value: 5,
                message: "$5 is the minimum amount.",
              },
              max: {
                value: 1000,
                message: "$1000 is the maximum amount at a time.",
              },
            })}
            type="number"
            className="h-12 p-2 w-full rounded"
            placeholder="How much to issue"
            required
            name="user_amount"
          />
          {errors.amount?.message && (
            <span className="text-[12px] text-red-600">
              {errors.amount?.message}
            </span>
          )}
          <div className="hidden">
            <input
              name="sender_name"
              type="text"
              defaultValue={mongoUser?.name}
            />
            <input name="sender_email" type="text" defaultValue={user?.email} />

            <input
              name="user_serialNumber"
              type="text"
              defaultValue={seriulNumber}
            />
            <input name="user_date" type="text" defaultValue={fullDate} />
          </div>

          <input
            {...register("email")}
            type="email"
            className="h-12 p-2 mt-4 w-full rounded"
            placeholder="Who to issue"
            required
            name="user_email"
          />
          <input
            {...register("reference")}
            type="text"
            className="h-12 p-2 mt-4 w-full rounded"
            placeholder="Reference"
            required
            name="user_reference"
          />
          <input
            type="submit"
            className="actionButton mt-12 border-0"
            value="Issue"
          />
        </form>
      </div>
    </div>
  );
};

export default ECheck;