import React, { useEffect } from "react";
import { Table, Card, Statistic, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingDonations } from "../../features/adminDonation/adminDonationSlice";

const columns = [
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

const UpcomingDonations = () => {
  const dispatch = useDispatch();

  const {
    upcoming = { tomorrow: [], next_week: [], next_month: [] },
    isLoading,
  } = useSelector((state) => state.adminDonations);

  useEffect(() => {
    dispatch(getUpcomingDonations());
  }, [dispatch]);

  const formatTableData = (arr) =>
    arr.map((donation, index) => ({
      key: index + 1,
      donation_name: donation.donation_name,
      amount: `₹${donation.amount}`,
      donation_type: donation.donation_type,
      frequency: donation.frequency,
      date: new Date(donation.donation_date).toLocaleDateString('en-GB'),
      cow_shed_name: donation.cow_shed_name, 
      user_name: donation.user_name, 
    }));
  
  console.log("UPCOMING STATE FROM REDUX", upcoming);
  return (
    <div>
      <h3 className="mb-4 title">Upcoming Donations</h3>

      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Card>
            <Statistic
              title="Tomorrow"
              value={upcoming?.tomorrow?.length || 0}
              suffix="Donations"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Next Week"
              value={upcoming?.next_week?.length || 0}
              suffix="Donations"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Next Month"
              value={upcoming?.next_month?.length || 0}
              suffix="Donations"
            />
          </Card>
        </Col>
      </Row>

      <h4 className="mb-2">Tomorrow</h4>
      <Table
        columns={columns}
        dataSource={formatTableData(upcoming.tomorrow)}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />

      <h4 className="mt-4 mb-2">Next Week</h4>
      <Table
        columns={columns}
        dataSource={formatTableData(upcoming.next_week)}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />

      <h4 className="mt-4 mb-2">Next Month</h4>
      <Table
        columns={columns}
        dataSource={formatTableData(upcoming.next_month)}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UpcomingDonations;
