import { BarChart2, FileTextIcon, Music, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { label: 'Главная', to: '/', icon: BarChart2, exact: true },
    { label: 'Профиль', to: '/profile', icon: User },
    { label: 'Статистика', to: '/stats', icon: BarChart2 },
    { label: 'Релизы', to: '/releases', icon: Music },
    { label: 'Добавление релиза', to: '/add-release', icon: FileTextIcon }
];

export function Aside() {
    const baseClass = 'flex items-center gap-2 px-2 py-1 rounded-md transition-colors';

    return (
        <aside className="w-64 p-6 bg-zinc-800 border-r border-zinc-700 space-y-6">
            <h2 className="text-2xl font-bold text-white">🎧 Лейбл</h2>
            <nav className="space-y-2">
                {navItems.map(({ label, to, icon: Icon, exact }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={exact}
                        className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-700 text-white`
                                : `${baseClass} text-zinc-300 hover:text-white hover:bg-zinc-700`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
