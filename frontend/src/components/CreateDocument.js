import React, { useState } from "react";
import axios from "axios";

const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.post("http://localhost:5000/api/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document created successfully!");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <h2>Create Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateDocument;

