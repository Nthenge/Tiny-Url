import { useState } from "react";

const Input = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const shortenUrl = async () => {
    try {
      const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
        method: 'POST',
        headers: {
          Authorization: "Bearer b3cda943d47d6e18489549ee96fde83428e03a7d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: url,
        }),
      });

      const data = await response.json();
      setShortenedUrl(data.id);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const copyToClipboard = () => {
    const input = document.createElement("input");
    input.value = shortenedUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    setUrl("");
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h3 className="heading">URL Shortening Tool</h3>
        <input
          type="text"
          placeholder="ENTER URL HERE TO SHORTEN..."
          id="input"
          value={url}
          onChange={handleChange}
          className = "input"
        />
        <button onClick={shortenUrl} className = "button">
          SHORTEN
        </button>
        <p className="shortenedUrl">Shortened URL: {shortenedUrl}</p>
        <button onClick={copyToClipboard} className ="copyButton">
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default Input;
