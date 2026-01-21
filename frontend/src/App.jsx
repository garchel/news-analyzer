import { useState, useMemo } from 'react';
import * as api from './api'; // Centraliza as chamadas
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Componente de UI extraído para clareza
const NewsCard = ({ item, colorClass }) => (
  <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 border-l-4 border-l-indigo-500 hover:border-slate-700 transition-colors">
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      <h2 className="text-xl font-bold text-slate-100 flex-1 leading-snug">{item.title}</h2>
      <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${colorClass}`}>
        {item.sentiment}
      </span>
    </div>
    <a href={item.link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors">
      Ler matéria completa →
    </a>
  </div>
);

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleStartScrape = async () => {
    setLoading(true);
    setHasSearched(true);
    setNews([]);
    try {
      await api.triggerCrawl();
      const response = await api.getNews();
      setNews(response.data);
    } catch (error) {
      // Melhore o feedback de erro para o usuário
      console.error("Erro no scraping:", error);
      alert("Falha ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Cores constantes para evitar recriação de objetos em render
  const COLORS = {
    Positivo: { pie: '#10b981', tailwind: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    Negativo: { pie: '#f43f5e', tailwind: 'bg-rose-500/10 text-rose-400 border border-rose-500/20' },
    Neutro: { pie: '#64748b', tailwind: 'bg-slate-500/10 text-slate-400 border border-slate-500/20' }
  };

  const chartData = useMemo(() => {
    const counts = news.reduce((acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(COLORS).map(key => ({
      name: key,
      value: counts[key] || 0,
      color: COLORS[key].pie
    })).filter(d => d.value > 0);
  }, [news]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Monitor de Notícias IA</h1>
          <p className="text-slate-400">Análise de sentimento em tempo real com Google Gemini.</p>
        </header>
        
        <button 
          onClick={handleStartScrape}
          disabled={loading}
          className={`px-10 py-4 rounded-xl font-bold text-white shadow-2xl mb-12 transition-all ${
            loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95'
          }`}
        >
          {loading ? 'Analisando...' : 'Iniciar Varredura IA'}
        </button>

        {loading && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-500 mb-4"></div>
            <p className="text-indigo-400 font-semibold animate-pulse">Isso pode levar alguns segundos...</p>
          </div>
        )}

        {!loading && hasSearched && news.length > 0 && (
          <div className="w-full space-y-10">
            {/* Gráfico */}
            <section className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800 h-80">
              <h3 className="text-center font-bold text-slate-200 mb-4 text-lg">Distribuição de Sentimentos</h3>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </section>

            {/* Lista */}
            <section className="grid gap-6 w-full">
              {news.map((item) => (
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  colorClass={COLORS[item.sentiment]?.tailwind} 
                />
              ))}
            </section>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="w-full text-center py-24 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50 text-slate-500">
            <p className="text-xl italic">Aguardando comando para análise.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;