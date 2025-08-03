import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export function Header() {
    // Проверка токена при загрузке
    const [user, setUser] = useState(null);
    const [authModalVisible, setAuthModalVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [sessionToken, setSessionToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            fetch(`${process.env.BACKEND_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Unauthorized');
                    return res.json();
                })
                .then((data) => {
                    setUser({ name: data.user.first_name || data.user.username });
                    setAuthModalVisible(false);
                })
                .catch(() => {
                    localStorage.removeItem('auth_token');
                });
        }
    }, []);

    // Polling по sessionToken
    useEffect(() => {
        if (!sessionToken) return;
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_URL}/auth/poll?token=${sessionToken}`);
                const data = await res.json();

                if (data.authorized) {
                    setUser({ name: data.user.first_name || data.user.username });
                    localStorage.setItem('auth_token', data.token); // сохраняем реальный JWT
                    setAuthModalVisible(false);
                    clearInterval(interval);
                }
            } catch (err) {
                console.error('Polling error', err);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [sessionToken]);

    const handleTelegramLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch('${process.env.BACKEND_URL}/auth/telegram/request', {
                method: 'POST'
            });
            const data = await res.json();
            if (data.loginLink) {
                setSessionToken(data.sessionToken);
                const newTab = window.open();
                if (newTab) {
                    newTab.opener = null;
                    newTab.location = data.loginLink;
                } else {
                    window.location.href = data.loginLink;
                }
            }
        } catch (err) {
            alert('Ошибка при запросе Telegram авторизации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#111111]">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">{user?.name || 'Гость'}</span>
                    <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-gray-700" />
                </div>
            </header>
            {authModalVisible && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl text-center shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Требуется вход через Telegram</h2>
                        <p className="mb-4 text-gray-400">Пожалуйста, войдите через Telegram, чтобы продолжить.</p>
                        <Button
                            onClick={handleTelegramLogin}
                            disabled={loading}
                            className="bg-[#229ED9] hover:bg-[#1b8bb8] text-white w-full"
                        >
                            {loading ? 'Ожидаем...' : 'Войти через Telegram'}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
