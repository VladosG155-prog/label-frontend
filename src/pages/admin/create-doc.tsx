import ArtistSelect from '@/components/widgets/artist-select';
import { useArtistsQuery } from '@/hooks/useArtistsQuery';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { useCreateDocument } from '@/hooks/useCreateDocument';

interface Track {
    title: string;
    durationMinutes: string;
    durationSeconds: string;
    year: string;
    rightsStart: string;
    rightsEnd: string;
    shares: Record<string, string>; // ключ: id артиста, значение: доля %
}

export const CreateDoc = () => {
    const { data: artists, isLoading } = useArtistsQuery();
    const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [contractId, setContractId] = useState<string>(''); // 🔹 глобальный ID договора
    const createDocument = useCreateDocument();

    if (isLoading) return null;

    const handleAddArtist = (artist: any) => {
        setSelectedArtists([...selectedArtists, artist]);
        // при добавлении артиста — добавим его в shares каждого трека
        setTracks((prev) =>
            prev.map((t) => ({
                ...t,
                shares: { ...t.shares, [artist.id]: '' }
            }))
        );
    };

    const handleRemoveArtist = (artist: any) => {
        setSelectedArtists(selectedArtists.filter((a) => a.username !== artist.username));
        // убираем его из shares всех треков
        setTracks((prev) =>
            prev.map((t) => {
                const newShares = { ...t.shares };
                delete newShares[artist.id];
                return { ...t, shares: newShares };
            })
        );
    };

    const handleRemoveTrack = (index: number) => {
        setTracks(tracks.filter((_, i) => i !== index));
    };

    const handleTrackChange = (index: number, field: keyof Omit<Track, 'shares'>, value: string) => {
        const newTracks = [...tracks];
        newTracks[index][field] = value;
        setTracks(newTracks);
    };

    const handleAddTrack = () => {
        // каждый трек получает независимый объект shares
        const shares: Record<string, string> = {};
        selectedArtists.forEach((a) => {
            shares[a.id] = ''; // по артиcту отдельное поле
        });

        setTracks([
            ...tracks,
            { title: '', durationMinutes: '', durationSeconds: '', year: '', rightsStart: '', rightsEnd: '', shares: { ...shares } }
        ]);
    };

    const handleShareChange = (trackIndex: number, artistId: string, value: string) => {
        setTracks((prev) => {
            const newTracks = [...prev];
            // создаём новый объект shares только для этого трека
            newTracks[trackIndex] = {
                ...newTracks[trackIndex],
                shares: { ...newTracks[trackIndex].shares, [artistId]: value }
            };
            return newTracks;
        });
    };

    const handleSubmit = () => {
        createDocument.mutate({ contractId, artists: selectedArtists, tracks });
    };

    const filteredArtists = artists?.filter((artist) => !selectedArtists.some((a) => a.username === artist.username));

    console.log(tracks);

    return (
        <div className="bg-gray-950 min-h-screen p-6 text-gray-100">
            <h1 className="text-2xl font-bold mb-6">Создание документа</h1>

            {/* 🔹 Глобальный ID договора */}
            <div className="mb-6">
                <Label>ID договора</Label>
                <Input
                    value={contractId}
                    onChange={(e) => setContractId(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                    placeholder="Введите ID договора"
                />
            </div>

            {/* Артисты */}
            <div className="mb-8">
                <Label className="text-gray-300 mb-2">Выберите артистов</Label>
                <ArtistSelect isMulti artists={filteredArtists} onSelect={handleAddArtist} />
                <div className="flex flex-wrap gap-2 mt-3">
                    {selectedArtists.map((a) => (
                        <div key={a.id} className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg text-sm">
                            {a.username}
                            <Trash
                                className="w-4 h-4 cursor-pointer text-red-400 hover:text-red-600"
                                onClick={() => handleRemoveArtist(a)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Треки */}
            <div className="mb-8">
                <Label className="text-gray-300 mb-2">Треки</Label>
                {tracks.map((track, index) => (
                    <div key={index} className="border border-gray-700 p-4 rounded-lg mb-4 bg-gray-900">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-white">Трек {index + 1}</span>
                            <Trash
                                className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-600"
                                onClick={() => handleRemoveTrack(index)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <Label>Название</Label>
                                <Input
                                    value={track.title}
                                    onChange={(e) => handleTrackChange(index, 'title', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-gray-100"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label>Хронометраж (мин)</Label>
                                <Input
                                    value={track.durationMinutes}
                                    onChange={(e) => handleTrackChange(index, 'durationMinutes', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-gray-100"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label>Хронометраж (сек)</Label>
                                <Input
                                    value={track.durationSeconds}
                                    onChange={(e) => handleTrackChange(index, 'durationSeconds', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-gray-100"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label>Год создания</Label>
                                <Input
                                    value={track.year}
                                    onChange={(e) => handleTrackChange(index, 'year', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-gray-100"
                                />
                            </div>
                        </div>

                        {/* 🔹 Доли артистов */}
                        <div className="mt-4">
                            <Label className="text-gray-300">Доли артистов (%)</Label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {selectedArtists.map((artist) => (
                                    <div key={artist.username} className="flex items-center gap-2">
                                        <span className="text-sm text-gray-300 w-32">{artist.username}</span>
                                        <Input
                                            type="number"
                                            value={track.shares[artist.username] || ''}
                                            onChange={(e) => handleShareChange(index, artist.username, e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-gray-100"
                                            placeholder="%"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-black border-gray-700 hover:bg-gray-800 mt-2"
                    onClick={handleAddTrack}
                >
                    <Plus /> Добавить трек
                </Button>
            </div>

            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg" onClick={handleSubmit}>
                Сохранить
            </Button>
        </div>
    );
};
