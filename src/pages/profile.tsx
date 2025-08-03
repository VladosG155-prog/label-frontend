import { useState, useEffect } from 'react';
import { useProfileQuery } from '@/hooks/useProfileQuery';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Profile() {
    const { data: user, isLoading: isProfileLoading } = useProfileQuery();
    const updateProfile = useUpdateProfile();

    const [form, setForm] = useState({
        name: '',
        age: '',
        email: '',
        links: { spotify: '', yandex: '', soundcloud: '', vk: '' }
    });

    // Загрузка профиля в форму
    useEffect(() => {
        if (user) {
            setForm({
                name: user.first_name || '',
                age: user.age || '',
                email: user.email || '',
                links: {
                    spotify: user.links?.spotify || '',
                    yandex: user.links?.yandex || '',
                    soundcloud: user.links?.soundcloud || '',
                    vk: user.links?.vk || ''
                }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['spotify', 'yandex', 'soundcloud', 'vk'].includes(name)) {
            setForm((prev) => ({
                ...prev,
                links: { ...prev.links, [name]: value }
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateProfile.mutate(form, {
            onSuccess: () => toast.success('Данные обновлены'),
            onError: () => toast.error('Ошибка обновления')
        });
    };

    return (
        <div className="flex h-screen bg-black text-white">
            <div className="flex-1 flex flex-col overflow-y-auto">
                <main className="p-6 space-y-6">
                    <Card className="bg-[#1a1a1a] w-full text-white border-none">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-6">Мой профиль</h2>

                            {isProfileLoading ? (
                                <p>Загрузка...</p>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Имя', name: 'name', type: 'text' },
                                            { label: 'Возраст', name: 'age', type: 'number' },
                                            { label: 'Email', name: 'email', type: 'email' },
                                            { label: 'Spotify', name: 'spotify' },
                                            { label: 'Яндекс.Музыка', name: 'yandex' },
                                            { label: 'SoundCloud', name: 'soundcloud' },
                                            { label: 'VK Music', name: 'vk' }
                                        ].map(({ label, name, type = 'text' }) => (
                                            <div key={name}>
                                                <label className="block mb-1 text-gray-400">{label}</label>
                                                <input
                                                    type={type}
                                                    name={name}
                                                    value={
                                                        ['spotify', 'yandex', 'soundcloud', 'vk'].includes(name)
                                                            ? form.links[name]
                                                            : form[name]
                                                    }
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-[#0f0f0f] rounded focus:outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2 flex-col gap-4 items-start justify-start">
                                        <Button
                                            type="submit"
                                            disabled={updateProfile.isPending}
                                            className="bg-[#229ED9] max-w-[300px] mb-5 cursor-pointer h-[50px] hover:bg-[#1b8bb8] text-white w-full"
                                        >
                                            {updateProfile.isPending ? 'Сохраняем...' : 'Сохранить'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
