"use client";

import { SetStateAction, useState } from "react";

export default function ResumeScreener() {
  const [file, setFile] = useState<File | null>(null);
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState<{ similarity_score: string, message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!file || !jobText) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_text", jobText);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Resume Screener</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="border p-2" />
        <textarea
          placeholder="Enter job description"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          className="border p-2 h-24"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Results</h2>
          <p className="mt-2">Similarity Score: {result.similarity_score}</p>
          <p className="text-gray-600">{result.message}</p>
        </div>
      )}
    </div>
  );
}