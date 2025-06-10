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
  meet_link: yup.string().url().nullable(),
  map_link: yup.string().url().nullable(),
  distance_from_center: yup.string().nullable(),
  chairman_name: yup.string().nullable(),
  chairman_phone: yup.string().nullable(),
  guardian_name: yup.string().nullable(),
  guardian_phone: yup.string().nullable(),
  bank_account_number: yup.string().nullable(),
  bank_account_name: yup.string().nullable(),
  bank_name: yup.string().nullable(),
  bank_ifsc: yup.string().nullable(),
  bank_branch: yup.string().nullable(),
  feeding_timings: yup.string().nullable(),
  agreement_signed: yup.boolean().nullable(),
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
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch])
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
      meet_link: cowShedData?.meet_link || "",
      map_link: cowShedData?.map_link || "",
      distance_from_center: cowShedData?.distance_from_center || "",
      chairman_name: cowShedData?.chairman_name || "",
      chairman_phone: cowShedData?.chairman_phone || "",
      guardian_name: cowShedData?.guardian_name || "",
      guardian_phone: cowShedData?.guardian_phone || "",
      bank_account_number: cowShedData?.bank_account_number || "",
      bank_account_name: cowShedData?.bank_account_name || "",
      bank_name: cowShedData?.bank_name || "",
      bank_ifsc: cowShedData?.bank_ifsc || "",
      bank_branch: cowShedData?.bank_branch || "",
      feeding_timings: cowShedData?.feeding_timings || "",
      agreement_signed: cowShedData?.agreement_signed === 1 ? 1 : 0,
    },
    enableReinitialize: true, // Reinitialize form with fetched cow shed data
    validationSchema: schema, // Attach validation schema
    onSubmit: (values) => {
      const formData = new FormData();
      // console.log("Submitting form with values:", values);
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
        // console.log("Dispatching createCowShed...");
        dispatch(createCowShed(formData));
        formik.resetForm();
      }
    },
  });
  // console.log("❌ Validation Errors:", formik.errors)
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
            label="Pan Number"
            name="GPan Number"
            onChng={formik.handleChange("GST")}
            onBlr={formik.handleBlur("GST")}
            val={formik.values.GST}
          />
          <div className="error">{formik.touched.GST && formik.errors.GST}</div>

          {/* Total Area Input */}
          <CustomInput
            type="number"
            label="Total Area (In Acres)"
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
          <CustomInput
            type="text"
            label="Chairman Name"
            name="chairman_name"
            onChng={formik.handleChange("chairman_name")}
            onBlr={formik.handleBlur("chairman_name")}
            val={formik.values.chairman_name}
          />
 <div className="error">
            {formik.touched.chairman_name && formik.errors.chairman_name}
          </div>
          <CustomInput
            type="text"
            label="Chairman Phone"
            name="chairman_phone"
            onChng={formik.handleChange("chairman_phone")}
            onBlr={formik.handleBlur("chairman_phone")}
            val={formik.values.chairman_phone}
          />
          <div className="error">
            {formik.touched.chairman_phone && formik.errors.chairman_phone}
          </div>

          <CustomInput
            type="text"
            label="Guardian Name"
            name="guardian_name"
            onChng={formik.handleChange("guardian_name")}
            onBlr={formik.handleBlur("guardian_name")}
            val={formik.values.guardian_name}
          />
          <div className="error">
            {formik.touched.guardian_name && formik.errors.guardian_name}
          </div>

          <CustomInput
            type="text"
            label="Guardian Phone"
            name="guardian_phone"
            onChng={formik.handleChange("guardian_phone")}
            onBlr={formik.handleBlur("guardian_phone")}
            val={formik.values.guardian_phone}
          />
          <div className="error">
            {formik.touched.guardian_phone && formik.errors.guardian_phone}
          </div>

          <CustomInput
            type="text"
            label="Bank Account Number"
            name="bank_account_number"
            onChng={formik.handleChange("bank_account_number")}
            onBlr={formik.handleBlur("bank_account_number")}
            val={formik.values.bank_account_number}
          />
          <div className="error">
            {formik.touched.bank_account_number && formik.errors.bank_account_number}
          </div>

          <CustomInput
            type="text"
            label="Bank Account Name"
            name="bank_account_name"
            onChng={formik.handleChange("bank_account_name")}
            onBlr={formik.handleBlur("bank_account_name")}
            val={formik.values.bank_account_name}
          />
          <div className="error">
            {formik.touched.bank_account_name && formik.errors.bank_account_name}
          </div>

          <CustomInput
            type="text"
            label="Bank Name"
            name="bank_name"
            onChng={formik.handleChange("bank_name")}
            onBlr={formik.handleBlur("bank_name")}
            val={formik.values.bank_name}
          />
          <div className="error">
            {formik.touched.bank_name && formik.errors.bank_name}
          </div>

          <CustomInput
            type="text"
            label="IFSC Code"
            name="bank_ifsc"
            onChng={formik.handleChange("bank_ifsc")}
            onBlr={formik.handleBlur("bank_ifsc")}
            val={formik.values.bank_ifsc}
          />
          <div className="error">
            {formik.touched.bank_ifsc && formik.errors.bank_ifsc}
          </div>

          <CustomInput
            type="text"
            label="Bank Branch"
            name="bank_branch"
            onChng={formik.handleChange("bank_branch")}
            onBlr={formik.handleBlur("bank_branch")}
            val={formik.values.bank_branch}
          />
          <div className="error">
            {formik.touched.bank_branch && formik.errors.bank_branch}
          </div>

          <CustomInput
            type="text"
            label="Feeding Timings"
            name="feeding_timings"
            onChng={formik.handleChange("feeding_timings")}
            onBlr={formik.handleBlur("feeding_timings")}
            val={formik.values.feeding_timings}
          />
          <div className="error">
            {formik.touched.feeding_timings && formik.errors.feeding_timings}
          </div>

          <CustomInput
            type="url"
            label="Meet Link"
            name="meet_link"
            onChng={formik.handleChange("meet_link")}
            onBlr={formik.handleBlur("meet_link")}
            val={formik.values.meet_link}
          />
          <div className="error">
            {formik.touched.meet_link && formik.errors.meet_link}
          </div>

          <CustomInput
            type="url"
            label="Map Link"
            name="map_link"
            onChng={formik.handleChange("map_link")}
            onBlr={formik.handleBlur("map_link")}
            val={formik.values.map_link}
          />

          <div className="error">
            {formik.touched.map_link && formik.errors.map_link}
          </div>
          <CustomInput
            type="text"
            label="Distance from Center"
            name="distance_from_center"
            onChng={formik.handleChange("distance_from_center")}
            onBlr={formik.handleBlur("distance_from_center")}
            val={formik.values.distance_from_center}
          />
          <div className="error">
            {formik.touched.distance_from_center && formik.errors.distance_from_center}
          </div>

          <div className="form-check mt-3">
          <input
  className="form-check-input"
  type="checkbox"
  id="agreement_signed"
  name="agreement_signed"
  checked={formik.values.agreement_signed}
  onChange={(e) =>
    formik.setFieldValue("agreement_signed", e.target.checked)
  }
/>

            <label className="form-check-label" htmlFor="agreement_signed">
              Agreement Signed
            </label>
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
