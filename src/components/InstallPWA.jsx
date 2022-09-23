import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { IconContext } from "react-icons";
import { BsDownload, BsThreeDotsVertical } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { GoDesktopDownload } from "react-icons/go";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  const [installShow, setInstallShow] = useState(false);
  const handleInstallShow = () => setInstallShow(true);
  const handleInstallClose = () => setInstallShow(false);

  if (!supportsPWA) {
    return (
      <>
        <IconContext.Provider
          value={{
            style: { verticalAlign: "middle" },
            className: "course-icon",
          }}
        >
          <BsDownload onClick={handleInstallShow} />
        </IconContext.Provider>

        {/* Install guidance Modal */}
        <Modal show={installShow} onHide={handleInstallClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Install the app</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="text-primary">Android</h5>
            <p>
              To install on Android phones and tablets, open the app in{" "}
              <span className="fw-bold">Chrome</span>, click the 3-dot overflow
              button{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "text-primary",
                }}
              >
                <BsThreeDotsVertical />
              </IconContext.Provider>{" "}
              at the top-right corner of the browser's address bar, and click{" "}
              <span className="text-primary">Add to home screen</span>.
            </p>
            <h5 className="text-primary">iOS</h5>
            <p>
              To install on iOS devices, open the app in{" "}
              <span className="fw-bold">Safari</span>, click the{" "}
              <span className="fw-bold">Share</span> button{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "text-primary",
                }}
              >
                <FiShare />
              </IconContext.Provider>{" "}
              from the bottom navigation bar, and click{" "}
              <span className="text-primary">Add to home screen</span>.
            </p>
            <h5 className="text-primary">Laptops & Desktops</h5>
            <p>
              To install on Windows, macOS or Linux, open the app in any
              browser, click the 3-dot overflow button{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "text-primary",
                }}
              >
                <BsThreeDotsVertical />
              </IconContext.Provider>{" "}
              at the top-right corner of the browser's address bar, and click{" "}
              <span className="text-primary">Install</span>{" "}
              <IconContext.Provider
                value={{
                  style: { verticalAlign: "middle" },
                  className: "text-primary",
                }}
              >
                <GoDesktopDownload />
              </IconContext.Provider>{" "}
              , or alternatively, you may find the same button near the address
              bar.
            </p>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <IconContext.Provider
      value={{
        style: { verticalAlign: "middle" },
        className: "course-icon",
      }}
    >
      <BsDownload onClick={onClick} />
    </IconContext.Provider>
  );
};

export default InstallPWA;
