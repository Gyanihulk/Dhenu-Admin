import React, { useEffect } from "react";
import { Table, Card, Statistic, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedDonations } from "../../features/adminDonation/adminDonationSlice";

const tableColumns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Donor",
    dataIndex: "donation_name",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Donation Type",
    dataIndex: "donation_type",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Cow Shed",
    dataIndex: "cow_shed_name",
  },
  {
    title: "User Name",
    dataIndex: "user_name",
  },
];

const CollectedDonations = () => {
  const dispatch = useDispatch();

  const {
    completed = [],
    totalCollected = 0,
    lastWeek = { total: 0, donations: [] },
    lastMonth = { total: 0, donations: [] },
    isLoading = false,
  } = useSelector((state) => state.adminDonations || {});

  useEffect(() => {
    dispatch(getCompletedDonations());
  }, [dispatch]);

  const formatTableData = (donationArray) =>
    donationArray?.map((donation, index) => ({
      key: index + 1,
      donation_name: donation.donation_name,
      amount: `₹${donation.amount}`,
      donation_type: donation.donation_type,
      frequency: donation.frequency,
      date: new Date(donation.donation_date).toLocaleDateString('en-GB'),
      cow_shed_name: donation.cow_shed_name, 
      user_name: donation.user_name, 
    }));

  return (
    <div>
      <h3 className="mb-4 title">Collected Donations</h3>

      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Collected"
              value={totalCollected}
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Last Week"
              value={lastWeek?.total || 0}
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Last Month"
              value={lastMonth?.total || 0}
              prefix="₹"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <h4 className="mb-2">All Donations</h4>
      <Table
        columns={tableColumns}
        dataSource={formatTableData(completed)}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />

      <h4 className="mt-4 mb-2">Last Week</h4>
      <Table
        columns={tableColumns}
        dataSource={formatTableData(lastWeek.donations)}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />

      <h4 className="mt-4 mb-2">Last Month</h4>
      <Table
        columns={tableColumns}
        dataSource={formatTableData(lastMonth.donations)}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CollectedDonations;
