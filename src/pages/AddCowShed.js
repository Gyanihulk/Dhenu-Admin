import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput"; // Custom input component
import { useLocation, useNavigate } from "react-router-dom"; // React Router hooks
import { toast } from "react-toastify"; // Toast notifications
import * as yup from "yup"; // Yup for validation schema
import { useFormik } from "formik"; // Formik for form handling
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import {
  createCowShed, // Redux action for creating a cow shed
  getCowShed, // Redux action for getting a specific cow shed
  resetState, // Redux action to reset the state
  updateCowShed, // Redux action for updating a cow shed
} from "../features/cowShed/cowshedSlice";
import Dropzone from "react-dropzone";
import { formatAddress } from "../utils/helpers";
// Define Yup validation schema
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
  const getCowShedId = location.pathname.split("/")[3]; // Extract cow shed ID from the URL

  const cowshedState = useSelector((state) => state.cowshed); // Access cow shed state from Redux
  const { isSuccess, isError, createdCowShed, updatedCowShed, cowShedData } =
    cowshedState;
  const [images, setImages] = useState([]);
  const [picture, setPicture] = useState(null);
  useEffect(() => {
    if (cowShedData?.resources?.images?.length > 0) {
      const existingImages = cowShedData.resources.images.map((img) => ({
        id: img.id, // Keep the image ID for reference
        preview: img.path, // Use the `path` for preview
      }));
      setImages(existingImages);
    }
    if (cowShedData?.picture) {
      setPicture({
        preview: cowShedData.picture, // Use the picture URL for preview
      });
    } else {
      setPicture(null); // Reset if no picture is available
    }
  }, [cowShedData]);

  // Fetch cow shed data if ID exists, otherwise reset state
  useEffect(() => {
    if (getCowShedId !== undefined) {
      dispatch(getCowShed(getCowShedId));
    } else {
      dispatch(resetState());
    }
  }, [getCowShedId, dispatch]);

  // Show toast notifications based on success or error states
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

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: null, // New files won't have an ID
      preview: URL.createObjectURL(file),
      file, // Keep the actual file for submission
    }));
    setImages([...images, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };
  const handlePictureDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setPicture({
      preview: URL.createObjectURL(selectedFile),
      file: selectedFile,
    });
  };
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: cowShedData?.name || "",
      total_capacity: cowShedData?.total_capacity || "",
      current_capacity: cowShedData?.current_capacity || "",
      productive_cows: cowShedData?.productive_cows || "",
      unproductive_cows: cowShedData?.unproductive_cows || "",
      description_line1: cowShedData?.description_line1 || "",
      GST: cowShedData?.GST || "",
      total_area: parseInt(cowShedData?.total_area) || "",
      total_employees: cowShedData?.total_employees || "",
      incorporation_date: cowShedData?.incorporation_date || "",
      monthly_expenses: cowShedData?.monthly_expenses || "",
      address: formatAddress(cowShedData?.address || ""),
      phone_number: cowShedData?.phone_number || "",
    },
    enableReinitialize: true, // Reinitialize form with fetched cow shed data
    validationSchema: schema, // Attach validation schema
    onSubmit: (values) => {
      const formData = new FormData();

      // Append form values
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Append only new images
      images.forEach((image) => {
        if (image.file) {
          formData.append("images[]", image.file); // Add new images only
        }
      });
      if (picture?.file) {
        formData.append("picture", picture.file);
      }
      if (getCowShedId !== undefined) {
        dispatch(updateCowShed({ id: getCowShedId, formData }));
      } else {
        dispatch(createCowShed(formData));
        formik.resetForm();
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
          {/* Name Input */}
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

          {/* Total Capacity Input */}
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

          {/* Current Capacity Input */}
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

          {/* Productive Cows Input */}
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

          {/* Unproductive Cows Input */}
          <CustomInput
            type="number"
            label="Unproductive Cows"
            name="unproductive_cows"
            onChng={formik.handleChange("unproductive_cows")}
            onBlr={formik.handleBlur("unproductive_cows")}
            val={formik.values.unproductive_cows}
          />
          <div className="error">
            {formik.touched.unproductive_cows &&
              formik.errors.unproductive_cows}
          </div>

          {/* Description Input */}
          <CustomInput
            type="text"
            label="Description"
            name="description_line1"
            onChng={formik.handleChange("description_line1")}
            onBlr={formik.handleBlur("description_line1")}
            val={formik.values.description_line1}
          />
          <div className="error">
            {formik.touched.description_line1 &&
              formik.errors.description_line1}
          </div>

          {/* GST Input */}
          <CustomInput
            type="text"
            label="GST Number"
            name="GST"
            onChng={formik.handleChange("GST")}
            onBlr={formik.handleBlur("GST")}
            val={formik.values.GST}
          />
          <div className="error">{formik.touched.GST && formik.errors.GST}</div>

          {/* Total Area Input */}
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

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={handlePictureDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop picture here, or click to select a file</p>
                  </div>
                </section>
              )}
            </Dropzone>
            {picture && (
              <div className="showimages mt-3">
                <img
                  src={picture.preview}
                  alt="picture-preview"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>

          {/* Dropzone for image upload */}
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="showimages d-flex flex-wrap gap-3 mt-3">
              {images.map((img, index) => (
                <div className="position-relative" key={index}>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img
                    src={img.preview}
                    alt="preview"
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Total Employees Input */}
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

          {/* Incorporation Date Input */}
          <CustomInput
            type="date"
            label="Incorporation Date"
            name="incorporation_date"
            onChng={formik.handleChange("incorporation_date")}
            onBlr={formik.handleBlur("incorporation_date")}
            val={formik.values.incorporation_date}
          />
          <div className="error">
            {formik.touched.incorporation_date &&
              formik.errors.incorporation_date}
          </div>

          {/* Monthly Expenses Input */}
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

          {/* Address Input */}
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

          {/* Phone Number Input */}
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

          {/* Submit Button */}
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
