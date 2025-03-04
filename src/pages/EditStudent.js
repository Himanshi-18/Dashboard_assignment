import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditStudentForm = () => {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [student, setStudent] = useState(null);
  const Navigate = useNavigate();
  const { id } = useParams(); // Get student ID from URL

  useEffect(() => {
    fetchSubjects();
    fetchStudentData();
  }, []);

  // Fetch subjects for dropdown
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjectOptions(
        response.data.map((sub) => ({ value: sub.name, label: sub.name }))
      );
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Fetch existing student data
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only alphabets")
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be at most 50 characters"),

    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only alphabets")
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be at most 50 characters"),

    studentId: Yup.string()
      .required("Student ID is required")
      .matches(/^[0-9]+$/, "Must contain only numbers")
      .min(2, "Must be at least 2 numbers")
      .max(10, "Must be at most 10 numbers"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    address: Yup.string()
      .required("Address is required")
      .min(3, "Must be at least 3 characters")
      .max(100, "Must be at most 100 characters"),

    image: Yup.mixed().required("Image is required"),

    subjects: Yup.array().min(1, "At least one subject is required"),
  });

  return (
    <div className="p-8 border rounded shadow-lg bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Edit Student Information</h2>

      {/* Ensure data is loaded before rendering form */}
      {student && (
        <Formik
          initialValues={{
            firstName: student.firstName || "",
            lastName: student.lastName || "",
            studentId: student.studentId || "",
            email: student.email || "",
            address: student.address || "",
            image: student.image || "",
            subjects: student.subjects || [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.put(`http://localhost:5000/students/${id}`, values);
              Navigate("/students");
            } catch (error) {
              console.error("Error updating student:", error);
              alert("Failed to update student. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-3 drop-shadow-md p-8 bg-white rounded-lg">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* First Name */}
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="border px-3 py-2 w-full mt-2 rounded-sm"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Last Name */}
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="border px-3 py-2 w-full mt-2 rounded-sm"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Student ID */}
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">
                    Student ID
                  </label>
                  <Field
                    type="text"
                    name="studentId"
                    className="border px-3 py-2 w-full mt-2 rounded-sm"
                  />
                  <ErrorMessage
                    name="studentId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="border px-3 py-2 w-full mt-2 rounded-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Address */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-900">
                    Address
                  </label>
                  <Field
                    as="textarea"
                    name="address"
                    className="border px-3 py-2 w-full mt-2 h-24 resize-none rounded-sm"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Media */}
              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Media
                </label>
                <div className="border border-gray-300 mt-2 p-6 text-gray-600 rounded-sm">
                  <label className="block font-normal text-base">
                    Student's Photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto size-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div class="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Selection */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-900">
                  Select Subjects
                </label>
                <Select
                  name="subjects"
                  defaultValue={student.subjects.map((sub) => ({
                    value: sub,
                    label: sub,
                  }))}
                  options={subjectOptions}
                  isMulti
                  onChange={(selectedOptions) =>
                    setFieldValue(
                      "subjects",
                      selectedOptions.map((option) => option.value)
                    )
                  }
                  placeholder="Select Subjects"
                  className="mt-2 rounded-sm"
                />
                <ErrorMessage
                  name="subjects"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Student"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditStudentForm;
