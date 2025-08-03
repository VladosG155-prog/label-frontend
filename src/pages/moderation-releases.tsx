import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useReleasesQuery } from '@/hooks/useReleasesQuery';

const STATUS_LABELS = {
    processing: 'В работе',
    pending: 'На модерации',
    approved: 'Принят',
    rejected: 'Отклонён'
};

export default function ModerationReleases() {
    const { data: releases, isLoading } = useReleasesQuery();

    const [rejectionReasons, setRejectionReasons] = useState<{ [id: string]: string }>({});
    const [showRejectionInput, setShowRejectionInput] = useState<{ [id: string]: boolean }>({});

    // Отслеживаем, какой релиз и трек сейчас играет
    const [playing, setPlaying] = useState<{ releaseId: string; trackIndex: number } | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function handleApprove(id: string) {
        alert(`Релиз ${id} принят`);
        // TODO: API call
    }

    function handleReject(id: string) {
        const reason = rejectionReasons[id];
        if (!reason || reason.trim() === '') {
            alert('Пожалуйста, укажите причину отклонения');
            return;
        }
        alert(`Релиз ${id} отклонён с причиной: ${reason}`);
        // TODO: API call
        setShowRejectionInput((prev) => ({ ...prev, [id]: false }));
    }

    function onReasonChange(id: string, value: string) {
        setRejectionReasons((prev) => ({ ...prev, [id]: value }));
    }

    function toggleRejectionInput(id: string) {
        setShowRejectionInput((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    function togglePlay(releaseId: string, trackIndex: number, url: string) {
        if (playing && playing.releaseId === releaseId && playing.trackIndex === trackIndex) {
            // Если сейчас играет этот же трек — остановить
            audioRef.current?.pause();
            setPlaying(null);
        } else {
            // Запустить новый трек
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }
            setPlaying({ releaseId, trackIndex });
        }
    }

    function onAudioEnded() {
        setPlaying(null);
    }

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
                                <Card
                                    key={release._id}
                                    className="bg-[#18181b] border border-[#2c2c31] rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
                                >
                                    <CardContent className="p-6 space-y-4 flex flex-col">
                                        {/* Верхняя часть: обложка + инфо */}
                                        <div className="flex gap-4">
                                            <img
                                                src={`http://localhost:4000/${release.coverUrl}`}
                                                alt={release.title}
                                                className="w-24 h-24 rounded-lg object-cover border border-[#3a3a40]"
                                            />
                                            <div className="flex flex-col justify-between text-sm text-gray-300">
                                                <h2 className="text-xl font-bold text-white">{release.title}</h2>
                                                <p>{new Date(release.releaseDate).toLocaleDateString()}</p>
                                                <p>
                                                    Статус:{' '}
                                                    <span
                                                        className={`font-semibold ${
                                                            release.status === 'approved'
                                                                ? 'text-green-500'
                                                                : release.status === 'rejected'
                                                                ? 'text-red-500'
                                                                : release.status === 'pending'
                                                                ? 'text-yellow-400'
                                                                : 'text-blue-400'
                                                        }`}
                                                    >
                                                        {STATUS_LABELS[release.status] || release.status}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Аудиотреки */}
                                        {release.wavUrls && release.wavUrls.length > 0 && (
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                {release.wavUrls.map((url: string, index: number) => {
                                                    const isPlaying = playing?.releaseId === release._id && playing?.trackIndex === index;
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => togglePlay(release._id, index, `http://localhost:4000/${url}`)}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                                                                isPlaying ? 'bg-green-600 border-green-500' : 'bg-[#2e2e33] border-[#444]'
                                                            } hover:bg-green-500 transition`}
                                                            title={`Трек ${index + 1}`}
                                                            aria-label={`Проиграть трек ${index + 1}`}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                className="w-5 h-5 text-white"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 19V6l12-2v13"
                                                                />
                                                                <circle cx={9} cy={19} r={2} />
                                                                <circle cx={21} cy={17} r={2} />
                                                            </svg>
                                                        </button>
                                                    );
                                                })}
                                                <audio ref={audioRef} onEnded={onAudioEnded} />
                                            </div>
                                        )}

                                        {/* Кнопки модерации */}
                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => handleApprove(release._id)}
                                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium text-white transition"
                                                >
                                                    Принять
                                                </button>

                                                {!showRejectionInput[release._id] ? (
                                                    <button
                                                        onClick={() => toggleRejectionInput(release._id)}
                                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium text-white transition"
                                                    >
                                                        Отклонить
                                                    </button>
                                                ) : null}
                                            </div>

                                            {showRejectionInput[release._id] && (
                                                <div className="space-y-2">
                                                    <textarea
                                                        placeholder="Причина отклонения"
                                                        value={rejectionReasons[release._id] || ''}
                                                        onChange={(e) => onReasonChange(release._id, e.target.value)}
                                                        className="w-full p-2 rounded-md bg-[#2e2e33] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-red-600"
                                                        rows={3}
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleReject(release._id)}
                                                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white transition"
                                                        >
                                                            Отправить
                                                        </button>
                                                        <button
                                                            onClick={() => toggleRejectionInput(release._id)}
                                                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-white transition"
                                                        >
                                                            Отмена
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
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
