import { Card, CardContent } from '@/components/ui/card';

import { useReleasesQuery } from '@/hooks/useReleasesQuery';

const STATUS_LABELS = {
    processing: 'В работе',
    pending: 'На модерации',
    approved: 'Принят',
    rejected: 'Отклонён'
};

export default function Releases() {
    const { data: releases, isLoading } = useReleasesQuery();

    return (
        <div className="flex h-screen bg-black text-white">
            <div className="flex-1 flex flex-col overflow-y-auto">
                <main className="p-6 space-y-6 flex-1 overflow-y-auto">
                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : releases.length === 0 ? (
                        <p>Релизы не найдены</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {releases.map((release) => (
                                <Card key={release._id} className="bg-[#1a1a1a] border-none">
                                    <CardContent className="flex space-x-4">
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/${release.coverUrl}`}
                                            alt={release.title}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <h2 className="text-lg font-semibold text-white">{release.title}</h2>
                                            <p className="text-white">Дата релиза: {new Date(release.releaseDate).toLocaleDateString()}</p>
                                            <p className="text-white">
                                                Статус: <span className="font-bold">{STATUS_LABELS[release.status] || release.status}</span>
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
