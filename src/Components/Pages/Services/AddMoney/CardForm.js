import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import "./CardForm.css";
import { sendNotification } from "../../../../App";

const CardForm = ({ addAmount, setAmountErr }) => {
  const fullDate = new Date().toLocaleDateString();
  const date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
  const time = new Date().toLocaleTimeString();

  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [user] = useAuthState(auth);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (addAmount < 10) {
      setClientSecret("");
      setAmountErr("");
      setAmountErr("$10 is the minimum add amount.");
      return;
    }
    if (addAmount > 1000) {
      setClientSecret("");
      setAmountErr("");
      setAmountErr("$1000 is the maximum add amount at a time.");
      return;
    }
    if (addAmount.slice(0, 1) === "0") {
      setClientSecret("");
      setAmountErr("");
      setAmountErr("Invalid add amount.");
      return;
    }

    if (addAmount)
      if (
        addAmount >= 5 &&
        addAmount <= 1000 &&
        addAmount.slice(0, 1) !== "0"
      ) {
        setAmountErr("");
        fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ addAmount }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.clientSecret) {
              setClientSecret(data.clientSecret);
            }
          });
      }
  }, [addAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addAmount < 5) {
      setClientSecret("");
      setAmountErr("");
      setAmountErr("$5 is the minimum add amount.");
      return;
    }
    if (addAmount > 1000) {
      setClientSecret("");
      setAmountErr("");
      setAmountErr("$1000 is the maximum add amount at a time.");
      return;
    }
    if (addAmount.slice(0, 1) === "0") {
      setClientSecret("");
      setAmountErr("");
      setAmountErr("Invalid add amount.");
      return;
    }

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    toast.loading("Money is being added.", {
      id: "waitingToast",
    });

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");

    const { paymentIntent, error: intentErr } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: `${user?.displayName}`,
            email: `${user?.email}`,
          },
        },
      }
    );
    const image =
      "https://previews.123rf.com/images/stockgiu/stockgiu1802/stockgiu180203103/94855033-color-finance-bank-economy-with-bills-cash-money.jpg";
    if (intentErr) {
      toast.dismiss("waitingToast");
      setCardError(intentErr?.message);
    } else {
      const id = paymentIntent?.id;
      const addMoneyInfo = {
        image,
        type: "Add Money",
        email: user?.email,
        name: user?.displayName,
        amount: addAmount,
        transactionId: id,
        fullDate,
        date,
        time,
      };

      fetch("http://localhost:5000/addMoney", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ addMoneyInfo }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.dismiss("waitingToast");
          setCardError("");
          setClientSecret("");
          if (data?.success) {
            document.getElementById("addAmountInput").value = "";
            card.clear();
            sendNotification(user?.email, "addMoney");
            toast.success(data.success);
          } else {
            toast.error(data.error);
          }
        });
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              padding: "10px",
              base: {
                fontSize: "16px",
                color: "#424770",
                lineHeight: "3rem",
                borderRadius: 30,
                "::placeholder": {
                  color: "#aab7c4",
                },
                backgroundColor: "#fff",
                // height: "12rem"
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="my-3">No fees when adding money from your card</p>
        <p className="text-xs text-red-500 mt-1">{cardError && cardError}</p>
        <button
          className="actionButton btn mt-11"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CardForm;
