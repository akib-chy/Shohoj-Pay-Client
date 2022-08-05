import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../../firebase.init";
import Spinner from "../../Shared/Spinner/Spinner";

const AllTransaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [user] = useAuthState(auth);
  const todayDate = new Date().toLocaleDateString();
  console.log(transactionData);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/transactionStatus/${user.email}`)
      .then((res) => setTransactionData(res.data));
    if (shareLinkCopied) {
      toast.success("Copied Transaction Information");
    }
  }, [user.email, shareLinkCopied]);
  if (transactionData.length === 0) {
    return <Spinner />;
  }
  //   COPY TRANSACTION DATA FUNCTION
  const onShare = (data) => {
    navigator.clipboard.writeText(`
    Date: ${data.date}
    Email: ${data.email}
    Type: ${data.type}
    Amount: ${data.amount}$
    `);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };
  return (
    <div className="container mx-auto lg:mt-24 lg:px-10 py-10 mt-10">
      <div className=" px-2 lg:w-8/12 mx-auto">
        <h3 className="font-bold text-xl border-b-4 border-black pb-2 w-48">
          All Transaction
        </h3>
        <div className="mt-8">
          <ul>
            {transactionData.map((transAction) => (
              <li
                className={`flex items-center my-4 p-3 rounded-lg w-full ${
                  transAction.type === "addMoney" ||
                  transAction.type === "receiveMoney"
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
                key={transAction._id}
              >
                <div className="lg:mr-8 w-36">
                  <h5>
                    {transAction.date === todayDate
                      ? "Today"
                      : transAction.date}
                  </h5>
                  <h6>{transAction.time}</h6>
                </div>
                <div className="avatar">
                  <div className="w-16 rounded-full ">
                    <img
                      src="https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg"
                      alt="User Image"
                    />
                  </div>
                </div>
                <div className="ml-5 flex items-center justify-between w-full">
                  <div>
                    <h5
                      className={`font-bold text-lg ${
                        transAction.type === "addMoney" ||
                        transAction.type === "receiveMoney"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {transAction.type}
                    </h5>
                    <h5 className="">
                      {transAction.type === "receiveMoney"
                        ? transAction.from
                        : transAction.email}
                    </h5>
                  </div>
                  <div className="" onClick={() => onShare(transAction)}>
                    <i className="fa-solid fa-copy cursor-pointer"></i>
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold text-right ${
                        transAction.type === "addMoney" ||
                        transAction.type === "receiveMoney"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {transAction.type === "addMoney" ||
                      transAction.type === "receiveMoney"
                        ? "+" + transAction.amount
                        : "-" + transAction.amount}{" "}
                      $
                    </h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllTransaction;