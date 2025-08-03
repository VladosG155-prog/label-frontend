import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAddReleaseMutation } from '@/hooks/useAddReleaseMutation';

export default function AddRelease() {
    const [form, setForm] = useState({
        title: '',
        releaseDate: '',
        participants: '',
        pitchRu: '',
        pitchEn: '',
        cover: null,
        tariff: '80/20',
        wavFiles: []
    });

    const { mutateAsync, isPending } = useAddReleaseMutation();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'cover') {
            setForm((prev) => ({ ...prev, cover: files[0] }));
        } else if (name === 'wavFiles') {
            setForm((prev) => ({ ...prev, wavFiles: [...files] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validate = () => {
        if (!form.title.trim()) return 'Введите название';
        if (!form.releaseDate) return 'Укажите дату релиза';
        if (!form.participants.trim()) return 'Укажите участников';
        if (!form.pitchRu.trim()) return 'Введите Pitch (рус)';
        if (!form.pitchEn.trim()) return 'Введите Pitch (англ)';
        if (!form.cover) return 'Загрузите обложку';
        if (form.wavFiles.length === 0) return 'Загрузите WAV файлы';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        try {
            await mutateAsync(form);
            toast.success('Релиз отправлен на модерацию');
            setForm({
                title: '',
                releaseDate: '',
                participants: '',
                pitchRu: '',
                pitchEn: '',
                cover: null,
                tariff: '80/20',
                wavFiles: []
            });
        } catch (err) {
            toast.error('Ошибка отправки релиза');
        }
    };

    return (
        <div className="flex h-screen bg-black text-white">
            <div className="flex-1 flex flex-col overflow-y-auto">
                <main className="p-6 space-y-6">
                    <Card className="bg-[#1a1a1a] w-full text-white border-none">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Поля формы */}
                                    <div>
                                        <label className="block mb-1 text-gray-400">Название</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-gray-400">Дата релиза</label>
                                        <input
                                            type="date"
                                            name="releaseDate"
                                            value={form.releaseDate}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-gray-400">Участники</label>
                                        <input
                                            type="text"
                                            name="participants"
                                            value={form.participants}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-gray-400">Pitch (рус)</label>
                                        <textarea
                                            name="pitchRu"
                                            value={form.pitchRu}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-gray-400">Pitch (англ)</label>
                                        <textarea
                                            name="pitchEn"
                                            value={form.pitchEn}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-gray-400">Обложка (JPG/PNG, 3000×3000, до 10MB)</label>
                                        <input
                                            type="file"
                                            name="cover"
                                            accept="image/jpeg,image/png"
                                            onChange={handleChange}
                                            className="w-full text-gray-400"
                                        />
                                        {form.cover && <p className="mt-1 text-sm text-gray-300">Выбран файл: {form.cover.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-gray-400">Тариф</label>
                                        <select
                                            name="tariff"
                                            value={form.tariff}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none"
                                        >
                                            <option value="80/20">80/20</option>
                                            <option value="50/50">50/50</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-gray-400">WAV файлы</label>
                                        <input
                                            type="file"
                                            name="wavFiles"
                                            accept=".wav,audio/wav,audio/x-wav"
                                            multiple
                                            onChange={handleChange}
                                            className="w-full text-gray-400"
                                        />
                                        {form.wavFiles.length > 0 && (
                                            <p className="mt-1 text-sm text-gray-300">Выбрано файлов: {form.wavFiles.length}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2 flex-col gap-4 items-start justify-start">
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-[#229ED9] max-w-[300px] mb-5 cursor-pointer h-[50px] hover:bg-[#1b8bb8] text-white w-full"
                                    >
                                        {isPending ? 'Отправляем...' : 'Отправить на модерацию'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
