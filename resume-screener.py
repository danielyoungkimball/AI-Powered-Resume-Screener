from fastapi import FastAPI, UploadFile, File
from sentence_transformers import SentenceTransformer, util
import os
from pydantic import BaseModel
import PyPDF2

app = FastAPI()

# Load a pre-trained BERT model for text similarity
model = SentenceTransformer("all-MiniLM-L6-v2")

class JobDescription(BaseModel):
    job_text: str

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = " ".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])
    return text

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...), job_desc: JobDescription = None):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF resumes are supported."}
    
    resume_text = extract_text_from_pdf(file.file)
    job_text = job_desc.job_text if job_desc else ""
    
    # Compute similarity using Sentence-BERT
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    job_embedding = model.encode(job_text, convert_to_tensor=True)
    similarity_score = util.pytorch_cos_sim(resume_embedding, job_embedding).item() * 100
    
    return {"similarity_score": f"{similarity_score:.2f}%", "message": "Higher score means better match."}
