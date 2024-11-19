import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyDonations,
  getYearlyDonations,
  getRecentDonations,
} from "../features/donations/donationSlice"; // Updated slice for donations

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

  const monthlyDonations = useSelector((state) => state?.donations?.monthlyData);
  const yearlyDonations = useSelector((state) => state?.donations?.yearlyData);
  const recentDonations = useSelector((state) => state?.donations?.recent);

  const [monthlyData, setMonthlyData] = useState([]);
  const [recentDonationData, setRecentDonationData] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyDonations());
    dispatch(getYearlyDonations());
    dispatch(getRecentDonations());
  }, [dispatch]);

  useEffect(() => {
    // Prepare data for monthly donations chart
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];

    for (let index = 0; index < monthlyDonations?.length; index++) {
      const element = monthlyDonations[index];
      data.push({
        type: monthNames[element?._id?.month],
        amount: element?.amount,
      });
    }

    setMonthlyData(data);

    // Prepare data for recent donations table
    const tableData = [];
    for (let i = 0; i < recentDonations?.length; i++) {
      tableData.push({
        key: i + 1,
        donorName:
          recentDonations[i]?.donor?.firstName +
          " " +
          recentDonations[i]?.donor?.lastName,
        cowshedName: recentDonations[i]?.cowshed?.name,
        amount: `Rs. ${recentDonations[i]?.amount}`,
        date: new Date(recentDonations[i]?.date).toLocaleDateString(),
      });
    }
    setRecentDonationData(tableData);
  }, [monthlyDonations, recentDonations]);

  const chartConfig = {
    data: monthlyData,
    xField: "type",
    yField: "amount",
    color: "#ffd333",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      amount: {
        alias: "Donation Amount",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Donation Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Donations</p>
            <h4 className="mb-0 sub-title">
              Rs.{yearlyDonations && yearlyDonations[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Total donations this year</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Donors</p>
            <h4 className="mb-0 sub-title">
              {yearlyDonations && yearlyDonations[0]?.donorCount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Donors this year</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Monthly Donations</h3>
          <div>
            <Column {...chartConfig} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Donations</h3>
        <div>
          <Table columns={columns} dataSource={recentDonationData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
