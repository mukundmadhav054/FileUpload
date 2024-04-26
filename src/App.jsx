import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const App = () => {
  const [image, setImage] = useState(null);
  const [imgList, setImgList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const handleUpload = () => {
    if (image == null) {
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgList((prev) => [...prev, url]);
      });
      alert("Image uploaded successfully");
    });
  };

  const handleLoaded = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6LdCRMcpAAAAADss-9pR0e7j9rF1fUmFWP7YFVmQ")
        .then((token) => {
          handleUpload(token);
        });
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LdCRMcpAAAAADss-9pR0e7j9rF1fUmFWP7YFVmQ";
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImgList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <div>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button
          onClick={() => handleLoaded()}
          className="g-recaptcha"
          data-sitekey="reCAPTCHA_site_key"
          data-callback="onSubmit"
          data-action="submit"
        >
          Upload Image
        </button>
      </div>
      <div className="image-container">
        {imgList.map((url) => {
          return <img src={url} />;
        })}
      </div>
    </div>
  );
};

export default App;
