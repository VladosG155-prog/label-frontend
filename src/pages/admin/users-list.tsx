import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useArtistsQuery } from '@/hooks/useArtistsQuery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const roles = ['user', 'artist', 'admin'];

export function UsersList() {
    const { data: artists, isLoading, isError } = useArtistsQuery();
    const queryClient = useQueryClient();

    const { mutate: updateUserRole } = useMutation({
        mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
            const res = await fetch('${process.env.BACKEND_URL}/admin/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, newRole })
            });

            if (!res.ok) throw new Error('Ошибка при обновлении роли');
            return res.json();
        },
        onSuccess: () => {
            toast.success('Роль успешно обновлена');
            queryClient.invalidateQueries({ queryKey: ['artists'] });
        },
        onError: (error: Error) => {
            toast.error(`Ошибка: ${error.message}`);
        }
    });

    if (isLoading) return <p>Загрузка артистов...</p>;
    if (isError) return <p>Ошибка загрузки артистов.</p>;
    if (!artists || artists.length === 0) return <p>Артисты не найдены.</p>;

    return (
        <div className="space-y-6 p-6 bg-black min-h-screen">
            {artists.map((artist) => (
                <Card key={artist._id} className="bg-[#1a1a1a] border-none">
                    <CardHeader>
                        <CardTitle className="text-white">
                            {artist.first_name} <span className="text-gray-400">({artist.username})</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300 space-y-2">
                        <p>
                            <strong>Возраст:</strong> {artist.age}
                        </p>
                        <p>
                            <strong>Email:</strong>{' '}
                            <a href={`mailto:${artist.email}`} className="text-blue-400 underline">
                                {artist.email}
                            </a>
                        </p>
                        <p>
                            <strong>Telegram ID:</strong> {artist.telegramId}
                        </p>
                        <p className="flex items-center gap-2">
                            <strong>Роль:</strong>
                            <Select
                                defaultValue={artist.role}
                                onValueChange={(value) => updateUserRole({ userId: artist._id, newRole: value })}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Выберите роль" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </p>

                        <div className="flex flex-wrap gap-3 mt-3">
                            {Object.entries(artist.links).map(([platform, url]) => {
                                if (!url) return null;
                                const href = url.startsWith('http') ? url : `https://${url}`;
                                return (
                                    <Button
                                        key={platform}
                                        variant="outline"
                                        size="sm"
                                        as="a"
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm"
                                    >
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
