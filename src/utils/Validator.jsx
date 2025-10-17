// src/utils/validators.js
export const validatePersonalDetails = (formData, toast) => {
  const fields = {
    firstName: "Please enter First Name",
    lastName: "Please enter Last Name",
    email: "Please enter Email",
    phoneNo: "Please enter Phone Number",
    presentAddress: "Please enter Present Address",
    permanentAddress: "Please enter Permanent Address",
    province: "Please select Province",
    domicile: "Please select Domicile",
    religion: "Please select Religion",
    gender: "Please select Gender",
    bloodGroup: "Please select Blood Group",
    nationality: "Please select Nationality",
    cnic: "Please enter CNIC",
    uploadPic: "Please upload Image",
  };

  // 🔹 Step 1: Required fields check
  for (const [key, message] of Object.entries(fields)) {
    if (!formData[key]) {
      toast.error(message);
      return false;
    }
  }

  // 🔹 Step 2: Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid Email");
    return false;
  }

  // 🔹 Step 3: Phone number validation (11 digits)
  const phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(formData.phoneNo)) {
    toast.error("Phone Number must be 11 digits");
    return false;
  }

  // 🔹 Step 4: CNIC validation
  const cnicRegex = /^(\d{5}-\d{7}-\d{1}|\d{13})$/;
  if (!cnicRegex.test(formData.cnic)) {
    toast.error("CNIC must be 13 digits or #####-#######-# format");
    return false;
  }

  // 🔹 Step 5: Upload image validation
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = formData.uploadPic?.name?.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    toast.error("Only JPG, JPEG, and PNG images are allowed");
    return false;
  }

  return true; // ✅ Passed all checks
};
