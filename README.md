# AI-Powered Resume Screener

## Overview
This project is a **FastAPI-based Resume Screener** that uses **Hugging Face's Sentence-BERT (all-MiniLM-L6-v2)** to analyze and compare resumes against job descriptions. It returns a **similarity score (0-100%)**, helping candidates evaluate how well their resume matches a given job.

## Features
- **FastAPI Backend** for handling resume uploads.
- **Extracts text** from PDF resumes.
- **Computes similarity** between resume and job description using Sentence-BERT.
- **Returns a match score** to help job seekers optimize their resumes.

## Tech Stack
- **Python** (FastAPI)
- **Hugging Face Transformers** (Sentence-BERT: `all-MiniLM-L6-v2`)
- **PyPDF2** (Extract text from PDFs)
- **Torch** (For model computation)

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/resume-screener.git
   cd resume-screener
   ```
2. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn sentence-transformers pypdf2 torch
   ```

## Running the API
Start the FastAPI server:
```bash
uvicorn main:app --reload
```

By default, the API will run at `http://127.0.0.1:8000`.

## API Usage
### **Endpoint: `/analyze` (POST Request)**
#### **Request Parameters:**
- `file`: PDF Resume (Uploaded as a file)
- `job_text`: Job Description (Text string)

#### **Example Request using cURL:**
```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/analyze' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@resume.pdf' \
  -F 'job_text=Software Engineer with experience in Python and FastAPI'
```

#### **Example Response:**
```json
{
  "similarity_score": "85.73%",
  "message": "Higher score means better match."
}
```

## Next Steps
- **Frontend UI:** Create a React-based interface for resume uploads.
- **More AI models:** Experiment with other NLP models for improved accuracy.
- **Additional Features:** Add skills extraction and ranking system.

## License
This project is open-source under the **MIT License**.
