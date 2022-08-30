import axios from "axios";
import he from "date-fns/esm/locale/he/index.js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionReport } from "../../../../app/slices/transactionReportSlice";
import TransactionReport from "./TransactionReport";

const current = new Date();
// GET THIS MONTH
const thisMonth = current.toLocaleString("default", {
  year: "numeric",
  month: "short",
});
// GET Year
const year = current.toLocaleString("default", {
  year: "numeric",
});

const AdminSummary = () => {
  const dispatch = useDispatch();
  const { isLoading, transactionReports, error } = useSelector(
    (state) => state.transactionReport
  );

  const [shohojPayInfo, setShohojPayInfo] = useState(null);
  const [monthToFilter, setMonthToFilter] = useState("all");
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    dispatch(fetchTransactionReport(monthToFilter));
  }, [monthToFilter]);

  // Setting available months
  useEffect(() => {
    if (!isLoading) {
      if (
        JSON.stringify(availableMonths) !==
        JSON.stringify(transactionReports?.availableMonths)
      ) {
        setAvailableMonths(transactionReports?.availableMonths);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/getShohojPayInfo", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setShohojPayInfo(data);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  // SERVICE ALL DATA
  const transactionData = [
    {
      id: 1,
      name: "Add Money",
      icon: "fa-credit-card",
      amount: transactionReports?.totalAddMoney,
    },
    {
      id: 2,
      name: "Send Money",
      icon: "fa-paper-plane",
      amount: transactionReports?.totalSendMoney,
    },
    {
      id: 3,
      name: "Receive Money",
      icon: "fa-paper-plane",
      amount: transactionReports?.totalReceiveMoney,
    },
    {
      id: 4,
      name: "Save Money",
      icon: "fa-circle-dollar-to-slot",
      amount: transactionReports?.totalSaveMoney,
    },
    {
      id: 5,
      name: "Request Money",
      icon: "fa-circle-dollar-to-slot",
      amount: transactionReports?.totalRequestMoney,
    },
    {
      id: 6,
      name: "Merchant Pay",
      icon: "fa-money-bill-trend-up",
      amount: transactionReports?.totalMerchantPay,
    },
    {
      id: 7,
      name: "E-Check",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalECheck,
    },
    {
      id: 8,
      name: "M to M",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalMtoM,
    },
    {
      id: 9,
      name: "M to P",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalMtoP,
    },
    {
      id: 10,
      name: "Withdraw Savings",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalWithdrawSavings,
    },
  ];

  return (
    <div className="container mx-auto lg:px-10 py-10">
      {/* START USER INFORMATION AND TRANSACTION */}
      <div className="lg:flex">
        {/* USER INFORMATION */}
        <div className="w-full lg:mt-0">
          <div className="px-2">
            <div className="bg-blue-100 shadow rounded-md lg:px-12 py-8 px-3">
              <h4 className="mb-5 text-xl ml-2">Total Revenue</h4>
              <h1 className="text-6xl font-medium">
                ${shohojPayInfo?.revenue}
              </h1>
              <p className="mt-6 ml-2">26 August, 2022</p>
            </div>
          </div>
          {/* START STATISTIC */}
        </div>
        <div className="divider divider-horizontal divide-black px-9 divider-hidden"></div>
        <div>
          <TransactionReport />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
