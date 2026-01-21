import requests

class DjangoPipeline:
    def process_item(self, item, spider):
        # Envia os dados para o endpoint
        url = "http://localhost:8000/api/news/"
        try:
            requests.post(url, json=item)
        except Exception as e:
            spider.logger.error(f"Erro ao enviar para API: {e}")
        return item
