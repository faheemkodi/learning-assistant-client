import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsDownload } from "react-icons/bs";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
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
  if (!supportsPWA) {
    return null;
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
