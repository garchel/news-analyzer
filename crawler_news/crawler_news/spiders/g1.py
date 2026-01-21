import scrapy
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

class G1Spider(scrapy.Spider):
    name = "g1"
    start_urls = ["https://g1.globo.com"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("API Key não encontrada!")

        # Cliente configurado com o SDK padrão
        self.client = genai.Client(api_key=api_key)
        
        # Usando o ID exato que apareceu na sua lista de modelos disponíveis
        self.model_id = "gemini-flash-latest"

    def parse(self, response):
        # Seletores para os posts do G1
        posts = response.css('div.feed-post') or response.css('.feed-post-body')
        
        self.logger.info(f"Encontrados {len(posts)} posts para analisar.")

        for news in posts:
            title = news.css('a.feed-post-link::text').get() or \
                    news.css('.feed-post-body a::text').get()
            
            link = news.css('a.feed-post-link::attr(href)').get() or \
                   news.css('.feed-post-body a::attr(href)').get()
            
            if title:
                title = title.strip()
                prompt = f"Classifique o sentimento da manchete como 'Positivo', 'Negativo' ou 'Neutro'. Responda apenas uma palavra: {title}"
                
                try:
                    # Chamada utilizando o model_id validado
                    response_ai = self.client.models.generate_content(
                        model=self.model_id,
                        contents=prompt
                    )
                    sentiment = response_ai.text.strip()
                    
                    yield {
                        'title': title,
                        'link' : link,
                        'sentiment': sentiment
                    }
                except Exception as e:
                    self.logger.error(f"Erro no Gemini: {e}")