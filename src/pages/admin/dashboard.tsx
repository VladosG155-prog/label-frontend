import { Card, CardContent } from '@/components/ui/card';

export default function DashboardAdmin() {
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
                    </main>
                </div>
            </div>
        </div>
    );
}
