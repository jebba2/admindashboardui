import "./UniversityRelatedForm.css";
import { useState } from "react";
import axios from "axios";

export default function UniversityRelatedForm({
  user,
  firstName,
  lastName,
  campusEmail,
  resetUserForm,
}) {
  const [courseName, setCourseName] = useState("");
  const [campusId, setCampusId] = useState("");

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleCampusIdChange = (e) => {
    setCampusId(e.target.value);
  };

  const resetUniversityRelatedForm = () => {
    setCourseName("");
    setCampusId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !user ||
      !firstName ||
      !lastName ||
      !campusEmail ||
      !courseName ||
      !campusId
    ) {
      console.log("entered first if");
      window.alert("Please fill in all fields.");
      return;
    } else if (!emailRegex.test(campusEmail)) {
      console.log("enetered second if");
      window.alert("Please enter a valid campus email address.");
      return;
    } else {
      try {
        const data = {
          courseType: "University Related",
          requestorEmail: campusEmail,
          courseName: courseName,
          additionalInstructors: campusId,
        };

        const response = await axios.post(
          "https://learningtoolsdev.gsu.edu/admindashboard/api/courses?token=uwUdJxI/X17AOyqTDG9gY57pr7/QbGaFHGQtwsFDwEDvYgsccsVR4g==",
          data
        );

        console.log("API Response:", response.data);
        if (response.data === "Success") {
          window.alert("Course Section created successfully");

          resetUniversityRelatedForm();
          resetUserForm();
        } else {
          window.alert("Requestor not found");
        }
      } catch (error) {
        console.error("API Error:", error);
        window.alert("Error creating the section. Please try again");
      }
    }
  };

  return (
    <div className="UniversityRelatedForm-container">
      <div>
        <form className="UniversityRelatedForm" onSubmit={handleSubmit}>
          <div className="requestedcoursename">
            <label>Requested Course Name</label>
            <input
              type="text"
              name="subjectcode"
              value={courseName}
              className="requestedcoursenameinput"
              placeholder=""
              onChange={handleCourseNameChange}
            ></input>
          </div>
          <div className="campusid">
            <label>
              Campus IDs / Email Addresses of Additional Instructors
            </label>
            <input
              type="text"
              name="campusid"
              value={campusId}
              className="campusid-input"
              placeholder=""
              onChange={handleCampusIdChange}
            ></input>
          </div>
          <div className="buttons">
            <button type="submit" className="createthesection">
              Create the Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
