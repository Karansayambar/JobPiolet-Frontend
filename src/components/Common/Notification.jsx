import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useNotification = () => {
  const [notify, setNotify] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showNotification = (message, severity = "info") => {
    setNotify({ open: true, message, severity });
  };

  const NotificationComponent = () => (
    <Snackbar
      open={notify.open}
      autoHideDuration={3000}
      onClose={() => setNotify({ ...notify, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={() => setNotify({ ...notify, open: false })}
        severity={notify.severity}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );

  return { showNotification, NotificationComponent };
};

export default useNotification;
