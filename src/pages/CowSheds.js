import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteCowShed, getCowSheds } from "../features/cowShed/cowshedSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Total Capacity",
    dataIndex: "total_capacity",
    sorter: (a, b) => a.total_capacity - b.total_capacity,
  },
  {
    title: "Current Capacity",
    dataIndex: "current_capacity",
    sorter: (a, b) => a.current_capacity - b.current_capacity,
  },
  {
    title: "Productive Cows",
    dataIndex: "productive_cows",
  },
  {
    title: "Unproductive Cows",
    dataIndex: "unproductive_cows",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CowShedList = () => {
  const [open, setOpen] = useState(false);
  const [cowShedId, setCowShedId] = useState("");
  
  const dispatch = useDispatch();

  const showModal = (id) => {
    setOpen(true);
    setCowShedId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCowSheds());
  }, [dispatch]);

  const cowShedState = useSelector((state) => state?.cowshed?.cowSheds);

  const data1 = cowShedState && cowShedState.length > 0
  ? [...cowShedState] // Create a shallow copy of the array
      .sort((a, b) => a.id - b.id) // Sort by ID in ascending order
      .map((shed, index) => ({
        sno: index + 1, // Serial number
        key: shed.id,
        name: shed.name,
        total_capacity: shed.total_capacity,
        current_capacity: shed.current_capacity,
        productive_cows: shed.productive_cows,
        unproductive_cows: shed.unproductive_cows,
        action: (
          <>
            <Link
              to={`/admin/cow-shed/${shed.id}`}
              className="fs-3 text-success"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(shed.id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }))
  : [];


  const deleteCowShedHandler = () => {
    dispatch(deleteCowShed(cowShedId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCowSheds());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Cow Sheds</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={deleteCowShedHandler}
        title="Are you sure you want to delete this Cow Shed?"
      />
    </div>
  );
};

export default CowShedList;
