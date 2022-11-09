export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createVideo = (id, src) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.setAttribute("id", id);
    video.setAttribute("style", "display:none;");
    video.setAttribute("loop", "");
    video.setAttribute("autoplay", "");

    document.body.appendChild(video);
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    if (document.getElementById("screen-waker") !== null) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export const deleteVideo = (id) => {
  const video = document.getElementById(id);
  if (video !== null) {
    video.pause();
    video.remove();
  }
};
