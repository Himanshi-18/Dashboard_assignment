import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddStudentForm = () => {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjectOptions(response.data.map((sub) => ({ value: sub, label: sub })));
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name must contain only alphabets")
    .min(3, "First Name must be at least 3 characters")
    .max(50, "First Name must be at most 50 characters"),

    lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "First Name must contain only alphabets")
    .min(3, "First Name must be at least 3 characters")
    .max(50, "First Name must be at most 50 characters"),

    studentId: Yup.string()
    .required("Student ID is required")
    .matches(/^[0-9]+$/, "Student ID must contain only numbers")
    .min(2, "Student ID must be at least 2 numbers")
    .max(10, "Student ID must be at most 10 numbers"),

    email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),

    address: Yup.string()
    .required("Address is required")
    .min(3, "Address must be at least 3 characters")
    .max(100, "Address must be at most 100 characters"),

    subjects: Yup.array()
    .min(1, "At least one subject is required"),
  });

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          studentId: "",
          email: "",
          address: "",
          image: "",
          subjects: [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post("http://localhost:5000/students", values);
            Navigate("/students");
          } catch (error) {
            console.error("Error adding student:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-3">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* First Name */}
              <label className="block text-sm font-medium text-gray-900">First Name</label>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border px-3 py-2 w-full"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

              {/* Last Name */}
              <label className="block text-sm font-medium text-gray-900">Last Name</label>
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border px-3 py-2 w-full"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

              {/* Student ID */}
              <label className="block text-sm font-medium text-gray-900">Student ID</label>
              <Field
                type="text"
                name="studentId"
                placeholder="Student ID"
                className="border px-3 py-2 w-full"
              />
              <ErrorMessage name="studentId" component="div" className="text-red-500 text-sm" />

              {/* Email */}
              <label className="block text-sm font-medium text-gray-900">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border px-3 py-2 w-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

              {/* Address */}
              <label className="block text-sm font-medium text-gray-900">Address</label>
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className="border px-3 py-2 w-full"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Image Upload */}
            <label className="block text-sm font-medium text-gray-900">Upload Image</label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFieldValue("image", reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full"
            />

            {/* Subject Selection */}
            <label className="block text-sm font-medium text-gray-900">Select Subjects</label>
            <Select
              options={subjectOptions}
              isMulti
              onChange={(selectedOptions) =>
                setFieldValue("subjects", selectedOptions.map((option) => option.value))
              }
              placeholder="Select Subjects"
            />
            <ErrorMessage name="subjects" component="div" className="text-red-500 text-sm" />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Student"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudentForm;
