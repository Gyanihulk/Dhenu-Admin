import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyDonations,
  getYearlyDonations,
  getRecentDonations,
} from "../features/donations/donationSlice"; // Updated slice for donations
import { getMetrics } from "../features/adminDonation/adminDonationSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Donor Name",
    dataIndex: "donorName",
  },
  {
    title: "Cowshed Name",
    dataIndex: "cowshedName",
  },
  {
    title: "Donation Amount",
    dataIndex: "amount",
  },
  {
    title: "Donation Date",
    dataIndex: "date",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state?.adminDonations?.metrics);



  useEffect(() => {
    dispatch(getMetrics());

  }, [dispatch]);

 


    // Prepare data for recent donations table
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-3 mt-3">
  <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white rounded-3">
    <div>
      <p className="desc">Total Donations</p>
      <h4 className="mb-0 sub-title">Rs.{metrics?.total_donations}</h4>
    </div>
    <div className="d-flex flex-column align-items-end">
      <p className="mb-0 desc">Lifetime Total</p>
    </div>
  </div>

  <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white rounded-3">
    <div>
      <p className="desc">Total Cow Sheds</p>
      <h4 className="mb-0 sub-title">{metrics?.total_cow_sheds}</h4>
    </div>
    <div className="d-flex flex-column align-items-end">
      <p className="mb-0 desc">Across all locations</p>
    </div>
  </div>

  <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white rounded-3">
    <div>
      <p className="desc">Total Cows</p>
      <h4 className="mb-0 sub-title">{metrics?.total_cows}</h4>
    </div>
    <div className="d-flex flex-column align-items-end">
      <p className="mb-0 desc">Cows being served</p>
    </div>
  </div>

  <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white rounded-3">
    <div>
      <p className="desc">Total Users</p>
      <h4 className="mb-0 sub-title">{metrics?.total_users}</h4>
    </div>
    <div className="d-flex flex-column align-items-end">
      <p className="mb-0 desc">Registered Donors</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
