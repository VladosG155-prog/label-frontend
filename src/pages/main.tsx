import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 800 }
];

export default function Dashboard() {
    return (
        <div className="relative">
            <div className="flex h-screen bg-black text-white">
                <div className="flex-1 flex flex-col">
                    {/* Content */}
                    <main className="p-6 space-y-6 overflow-y-auto">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-[#1a1a1a] text-white">
                                <CardContent className="p-4">
                                    <p className="text-sm text-gray-500">Total Sales</p>
                                    <h3 className="text-2xl font-bold">$24,000</h3>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#1a1a1a] text-white">
                                <CardContent className="p-4">
                                    <p className="text-sm text-gray-500">Visitors</p>
                                    <h3 className="text-2xl font-bold">8,300</h3>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#1a1a1a] text-white">
                                <CardContent className="p-4">
                                    <p className="text-sm text-gray-500">Conversion Rate</p>
                                    <h3 className="text-2xl font-bold">4.7%</h3>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Chart */}
                        <Card className="bg-[#1a1a1a] text-white">
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                        <XAxis dataKey="name" stroke="#9CA3AF" />
                                        <YAxis stroke="#9CA3AF" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f0f0f', borderColor: '#2a2a2a' }} />
                                        <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    );
}
