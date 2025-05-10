import { toast, Bounce } from "react-toastify"; // Import Bounce transition

// Show success message
export const showSuccess = (msg, toastId) => {
  if (toastId) {
    // Update the existing toast to show success
    toast.update(toastId, {
      render: msg,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    // If no toastId exists, show a new success toast
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

// Show error message (standardize for API errors)
export const showError = (msg, toastId, duration = 5000) => {
  if (toastId) {
    // Update the existing toast to show error
    toast.update(toastId, {
      render: msg,
      type: toast.TYPE.ERROR,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else {
    // If no toastId exists, show a new error toast
    toast.error(msg, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};

// Show info message (for general non-error states)
export const showInfo = (msg, toastId) => {
  if (toastId) {
    // Update the existing toast to show info
    toast.update(toastId, {
      render: msg,
      type: toast.TYPE.INFO,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  } else {
    // If no toastId exists, show a new info toast
    toast.info(msg, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  }
};

// Show loading toast (with a custom message)
export const showLoading = (msg) => {
  return toast.loading(msg, {
    autoClose: false, // Keeps the loading toast visible until closed manually
    hideProgressBar: true,
    closeOnClick: false,
    draggable: false,
  });
};

// Close the loading toast after the operation completes
export const closeLoading = (toastId) => {
  toast.dismiss(toastId); // Close specific toast by ID
};
