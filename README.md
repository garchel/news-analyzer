# G1 Sentiment Analyzer 🚀

Aplicação **Full Stack** para coleta, análise e visualização de sentimentos em notícias do portal **G1**, utilizando **Web Scraping**, **Inteligência Artificial (Google Gemini)** e um **dashboard interativo**.

O projeto automatiza todo o fluxo: desde a extração das manchetes até a exibição gráfica dos sentimentos classificados.

---

## 📌 Visão Geral

O G1 Sentiment Analyzer realiza:
- Coleta automática de notícias recentes do G1
- Análise de sentimento com IA
- Armazenamento estruturado dos dados
- Visualização interativa em tempo real

---

## 🧠 Arquitetura do Projeto

- **Crawler:** Responsável por coletar as manchetes do G1
- **Backend:** Processa, analisa e persiste os dados
- **IA:** Classifica o sentimento das notícias
- **Banco de Dados:** Armazena as informações analisadas
- **Frontend:** Exibe gráficos e indicadores visuais

---

## 🛠 Tecnologias Utilizadas

### Backend
- Python
- Django
- Django REST Framework

### Frontend
- React
- Tailwind CSS
- Recharts

### Scraping
- Scrapy

### Inteligência Artificial
- Google Gemini API

### Banco de Dados
- PostgreSQL
- Docker e Docker Compose

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- Python
- Node.js 
- Docker
- Docker Compose

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (e adicione-o ao `.gitignore`):

GEMINI_API_KEY=sua_chave_aqui  

---

## ▶️ Passo a Passo para Execução

Para rodar o projeto completo, utilize **4 terminais** simultaneamente.

---

### 🟢 Terminal 1 — Banco de Dados (Docker)

Subir o container do PostgreSQL:

docker-compose up -d

---

### 🟡 Terminal 2 — Backend (Django)

Criar e ativar o ambiente virtual:

python -m venv venv  
venv\Scripts\activate  

Instalar dependências e executar o servidor:

pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver  

O backend ficará disponível em:  
http://localhost:8000

---

### 🔵 Terminal 3 — Frontend (React)

Acessar o diretório do frontend e iniciar a aplicação:

cd frontend  
npm install  
npm run dev  

O frontend ficará disponível em:  
http://localhost:5173

---

### 🟣 Terminal 4 — Scraping de Notícias

Executar o crawler para coletar as notícias:

scrapy crawl g1

---

## 🔄 Fluxo de Funcionamento

1. **Scraping:** O Scrapy coleta manchetes recentes do portal G1.
2. **Envio ao Backend:** As notícias são enviadas para a API Django.
3. **Análise de Sentimento:** O texto é processado pela API do Google Gemini.
4. **Classificação:** A IA classifica o sentimento como Positivo, Negativo ou Neutro.
5. **Persistência:** Os dados analisados são salvos no PostgreSQL.
6. **Visualização:** O frontend consome a API e exibe gráficos interativos com Recharts.

---

## 📊 Dashboard

O dashboard apresenta:
- Distribuição dos sentimentos
- Gráficos interativos
- Atualização dinâmica conforme novas notícias são analisadas

---

## 🚧 Melhorias Futuras

- Análise por categorias de notícia
- Histórico temporal de sentimentos
- Autenticação de usuários
- Deploy em nuvem
- Cache de resultados

---

## 📄 Licença

Este projeto é de uso educacional e experimental.

---

## 👨‍💻 Autor

Desenvolvido para estudo de **Web Scraping**, **IA aplicada** e **Arquitetura Full Stack**.
