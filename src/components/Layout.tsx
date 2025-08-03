// components/Layout.js
import { Aside } from './widgets/aside'; // не забудь создать этот компонент
import { Outlet } from 'react-router-dom';
import { Header } from './widgets/header';

function Layout() {
    return (
        <div className="flex min-h-screen">
            <Aside />
            <main className="flex-1 p-4">
                <Header />
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
