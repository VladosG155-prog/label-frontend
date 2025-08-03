import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FileText } from 'lucide-react';

const listensData = [
    { month: 'Янв', listens: 120 },
    { month: 'Фев', listens: 300 },
    { month: 'Мар', listens: 500 },
    { month: 'Апр', listens: 900 },
    { month: 'Май', listens: 1400 },
    { month: 'Июн', listens: 1800 }
];

const pdfReports = [
    { quarter: 'Q1 2025', url: '#' },
    { quarter: 'Q2 2025', url: '#' },
    { quarter: 'Q3 2025', url: '#' }
];

export default function Statistics() {
    return (
        <div className="flex min-h-screen bg-zinc-900 text-white">
            {/* Sidebar */}

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-8">
                <h1 className="text-3xl font-bold text-white">📊 Статистика артиста</h1>

                {/* График прослушиваний */}
                <div className="bg-zinc-800 p-6 rounded-2xl shadow-md space-y-4">
                    <h2 className="text-xl font-semibold text-white">График прослушиваний (накопительно)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <AreaChart data={listensData}>
                                <defs>
                                    <linearGradient id="colorListens" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#ccc" />
                                <YAxis stroke="#ccc" />
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }} />
                                <Area type="monotone" dataKey="listens" stroke="#3b82f6" fillOpacity={1} fill="url(#colorListens)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Доход */}
                <div className="bg-zinc-800 p-6 rounded-2xl shadow-md space-y-2">
                    <h2 className="text-xl font-semibold text-white">💰 Итоговая сумма дохода</h2>
                    <div className="text-3xl font-bold text-green-400">12 500 ₽</div>
                </div>

                {/* PDF отчёты */}
                <div className="bg-zinc-800 p-6 rounded-2xl shadow-md space-y-4">
                    <h2 className="text-xl font-semibold text-white">📄 PDF-отчёты за кварталы</h2>
                    <ul className="space-y-3">
                        {pdfReports.map((report) => (
                            <li key={report.quarter}>
                                <a
                                    href={report.url}
                                    className="flex items-center gap-2 text-blue-400 hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FileText className="w-5 h-5" />
                                    Отчёт за {report.quarter}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
