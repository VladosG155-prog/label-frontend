import { useArtistsQuery } from '@/hooks/useArtistsQuery';
import { useApproveArtistMutation } from '@/hooks/useApproveArtistMutation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function UsersList() {
    const { data: artists, isLoading, isError } = useArtistsQuery();
    const approveMutation = useApproveArtistMutation();

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

                        {artist.links && (
                            <div className="flex flex-wrap gap-3 mt-3">
                                {Object.entries(artist?.links).map(([platform, url]) => {
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
                        )}

                        <div className="flex gap-4 mt-4">
                            <Button
                                variant="default"
                                onClick={() => approveMutation.mutate(artist._id)}
                                disabled={approveMutation.isPending}
                            >
                                {approveMutation.isPending ? 'Одобрение...' : 'Одобрить'}
                            </Button>
                            <Button variant="destructive" onClick={() => alert('Отклонение пока не реализовано')}>
                                Отклонить
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
