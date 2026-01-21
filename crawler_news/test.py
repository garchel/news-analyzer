from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Lista todos os modelos disponíveis para sua chave
print("Modelos disponíveis:")
for model in client.models.list():
    print(f" - {model.name}")