import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createCowShed,
  getCowShed,
  resetState,
  updateCowShed,
} from "../features/cowShed/cowshedSlice";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  total_capacity: yup.number().required("Total capacity is required"),
  current_capacity: yup.number().required("Current capacity is required"),
  productive_cows: yup.number().required("Productive cows are required"),
  unproductive_cows: yup.number().required("Unproductive cows are required"),
  description_line1: yup.string().required("Description is required"),
  GST: yup.string().required("GST number is required"),
  total_area: yup.number().required("Total area is required"),
  total_employees: yup.number().required("Total employees are required"),
  incorporation_date: yup.date().required("Incorporation date is required"),
  monthly_expenses: yup.number().required("Monthly expenses are required"),
  address: yup.string().required("Address is required"),
  phone_number: yup.string().required("Phone number is required"),
});

const AddCowShed = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCowShedId = location.pathname.split("/")[3];
  
  const cowshedState = useSelector((state) => state.cowshed);
  const {
    isSuccess,
    isError,
    createdCowShed,
    updatedCowShed,
    cowShedData,
  } = cowshedState;

  useEffect(() => {
    if (getCowShedId !== undefined) {
      dispatch(getCowShed(getCowShedId));
    } else {
      dispatch(resetState());
    }
  }, [getCowShedId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCowShed) {
      toast.success("Cow Shed added successfully!");
      navigate("/admin/list-cow-sheds");
    }
    if (isSuccess && updatedCowShed) {
      toast.success("Cow Shed updated successfully!");
      navigate("/admin/list-cow-sheds");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdCowShed, updatedCowShed, navigate]);
console.log(cowShedData)
  const formik = useFormik({
    initialValues: {
      name: cowShedData?.name || "",
      total_capacity: cowShedData?.total_capacity || "",
      current_capacity: cowShedData?.current_capacity || "",
      productive_cows: cowShedData?.productive_cows || "",
      unproductive_cows: cowShedData?.unproductive_cows || "",
      description_line1: cowShedData?.description_line1 || "",
      GST: cowShedData?.GST || "",
      total_area: cowShedData?.total_area || "",
      total_employees: cowShedData?.total_employees || "",
      incorporation_date: cowShedData?.incorporation_date || "",
      monthly_expenses: cowShedData?.monthly_expenses || "",
      address: cowShedData?.address || "",
      phone_number: cowShedData?.phone_number || "",
    },
    enableReinitialize: true,
    // validationSchema: schema,
    onSubmit: (values) => {
      if (getCowShedId !== undefined) {
        const data = { id: getCowShedId, cowShedData: values };
        dispatch(updateCowShed(data));
      } else {
        dispatch(createCowShed(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCowShedId !== undefined ? "Edit" : "Add"} Cow Shed
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Cow Shed Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          
          <CustomInput
            type="number"
            label="Total Capacity"
            name="total_capacity"
            onChng={formik.handleChange("total_capacity")}
            onBlr={formik.handleBlur("total_capacity")}
            val={formik.values.total_capacity}
          />
          <div className="error">
            {formik.touched.total_capacity && formik.errors.total_capacity}
          </div>

          <CustomInput
            type="number"
            label="Current Capacity"
            name="current_capacity"
            onChng={formik.handleChange("current_capacity")}
            onBlr={formik.handleBlur("current_capacity")}
            val={formik.values.current_capacity}
          />
          <div className="error">
            {formik.touched.current_capacity && formik.errors.current_capacity}
          </div>

          <CustomInput
            type="number"
            label="Productive Cows"
            name="productive_cows"
            onChng={formik.handleChange("productive_cows")}
            onBlr={formik.handleBlur("productive_cows")}
            val={formik.values.productive_cows}
          />
          <div className="error">
            {formik.touched.productive_cows && formik.errors.productive_cows}
          </div>

          <CustomInput
            type="number"
            label="Unproductive Cows"
            name="unproductive_cows"
            onChng={formik.handleChange("unproductive_cows")}
            onBlr={formik.handleBlur("unproductive_cows")}
            val={formik.values.unproductive_cows}
          />
          <div className="error">
            {formik.touched.unproductive_cows && formik.errors.unproductive_cows}
          </div>

          <CustomInput
            type="text"
            label="Description"
            name="description_line1"
            onChng={formik.handleChange("description_line1")}
            onBlr={formik.handleBlur("description_line1")}
            val={formik.values.description_line1}
          />
          <div className="error">
            {formik.touched.description_line1 && formik.errors.description_line1}
          </div>

          <CustomInput
            type="text"
            label="GST Number"
            name="GST"
            onChng={formik.handleChange("GST")}
            onBlr={formik.handleBlur("GST")}
            val={formik.values.GST}
          />
          <div className="error">
            {formik.touched.GST && formik.errors.GST}
          </div>

          <CustomInput
            type="number"
            label="Total Area (sq ft)"
            name="total_area"
            onChng={formik.handleChange("total_area")}
            onBlr={formik.handleBlur("total_area")}
            val={formik.values.total_area}
          />
          <div className="error">
            {formik.touched.total_area && formik.errors.total_area}
          </div>

          <CustomInput
            type="number"
            label="Total Employees"
            name="total_employees"
            onChng={formik.handleChange("total_employees")}
            onBlr={formik.handleBlur("total_employees")}
            val={formik.values.total_employees}
          />
          <div className="error">
            {formik.touched.total_employees && formik.errors.total_employees}
          </div>

          <CustomInput
            type="date"
            label="Incorporation Date"
            name="incorporation_date"
            onChng={formik.handleChange("incorporation_date")}
            onBlr={formik.handleBlur("incorporation_date")}
            val={formik.values.incorporation_date}
          />
          <div className="error">
            {formik.touched.incorporation_date && formik.errors.incorporation_date}
          </div>

          <CustomInput
            type="number"
            label="Monthly Expenses"
            name="monthly_expenses"
            onChng={formik.handleChange("monthly_expenses")}
            onBlr={formik.handleBlur("monthly_expenses")}
            val={formik.values.monthly_expenses}
          />
          <div className="error">
            {formik.touched.monthly_expenses && formik.errors.monthly_expenses}
          </div>

          <CustomInput
            type="text"
            label="Address"
            name="address"
            onChng={formik.handleChange("address")}
            onBlr={formik.handleBlur("address")}
            val={formik.values.address}
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>

          <CustomInput
            type="text"
            label="Phone Number"
            name="phone_number"
            onChng={formik.handleChange("phone_number")}
            onBlr={formik.handleBlur("phone_number")}
            val={formik.values.phone_number}
          />
          <div className="error">
            {formik.touched.phone_number && formik.errors.phone_number}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCowShedId !== undefined ? "Edit" : "Add"} Cow Shed
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCowShed;
