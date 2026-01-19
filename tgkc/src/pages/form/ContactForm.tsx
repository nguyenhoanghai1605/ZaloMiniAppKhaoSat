// ContactForm.tsx
import React from "react";

const ContactForm: React.FC = () => {
  return (
    <iframe
      id="myFormIframe"
      width="100%"
      height="auto"
      src="https://forms.office.com/r/ATjVWGVhZc?embed=true"
      frameBorder="0"
      style={{
        border: "none",
        maxWidth: "100%",
      }}
    ></iframe>
  );
};

export default ContactForm;
