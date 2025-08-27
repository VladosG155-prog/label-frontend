import { useEffect, useLayoutEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { useAuthUser } from '../../hooks/useAuthUser.ts';
import { useTelegramLogin } from '../../hooks/useTelegramLogin.ts';
import { useTelegramPolling } from '../../hooks/useTelegramPolling.ts';

export function Header() {
    const queryClient = useQueryClient();
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [hasAuthToken, setHasAuthToken] = useState(false)
    const [authModalVisible, setAuthModalVisible] = useState(true);

    const { data: userData, isSuccess: isUserLoaded, isError: isAuthError, isLoading } = useAuthUser();

    const telegramLogin = useTelegramLogin();

    const { data: pollData, isSuccess: pollSuccess } = useTelegramPolling(sessionToken, hasAuthToken);

    useEffect(() => {
        if (pollData?.authorized) {
            const { token, user } = pollData;
            localStorage.setItem('auth_token', token);
            setHasAuthToken(true)
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            setAuthModalVisible(false);
        }
    }, [pollData, pollSuccess, queryClient]);

    useLayoutEffect(() => {
        if (isUserLoaded) {
            setAuthModalVisible(false);
        }
        if (isAuthError) {
            localStorage.removeItem('auth_token');
        }
    }, [isUserLoaded, isAuthError]);

    const handleLogin = () => {
        telegramLogin.mutate(undefined, {
            onSuccess: (data) => {
                setSessionToken(data.sessionToken);
                const newTab = window.open();
                if (newTab) {
                    newTab.opener = null;
                    newTab.location = data.loginLink;
                } else {
                    window.location.href = data.loginLink;
                }
            },
            onError: () => {
                alert('Ошибка при запросе Telegram авторизации');
            }
        });
    };

    return (
        <>
            <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#111111]">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">{userData?.user?.first_name || userData?.user?.username || 'Гость'}</span>
                    <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-gray-700" />
                </div>
            </header>

            {authModalVisible && !isLoading && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl text-center shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Требуется вход через Telegram</h2>
                        <p className="mb-4 text-gray-400">Пожалуйста, войдите через Telegram, чтобы продолжить.</p>
                        <Button
                            onClick={handleLogin}
                            disabled={telegramLogin.isPending}
                            className="bg-[#229ED9] hover:bg-[#1b8bb8] text-white w-full"
                        >
                            {telegramLogin.isPending ? 'Ожидаем...' : 'Войти через Telegram'}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
