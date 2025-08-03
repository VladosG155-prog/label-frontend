import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleTelegramLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/telegram/request`, {
        method: "POST",
      });

      const data = await res.json();
      if (data.loginLink) {
        window.location.href = data.loginLink;
      } else {
        alert("Не удалось получить ссылку Telegram");
      }
    } catch (err) {
      console.error("Ошибка авторизации:", err);
      alert("Произошла ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleTelegramLogin}
      disabled={loading}
      className="bg-[#229ED9] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#1b8bb8] transition-colors"
    >
      {loading ? "Ожидаем..." : "Войти через Telegram"}
    </button>
  );
}
