import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Profile from './pages/profile';
import { Toaster } from 'sonner';
import AddRelease from './pages/add-release';
import Releases from './pages/releases';
import Statistics from './pages/stats';
import Layout from './components/Layout';
import { ArtistsList } from './pages/artists-list';
import ModerationReleases from './pages/moderation-releases';
import { UsersList } from './pages/admin/users-list';
import DashboardAdmin from './pages/admin/dashboard';
import { useAuthUser } from './hooks/useAuthUser';
import { CreateDoc } from './pages/admin/create-doc';

function App() {
    const { data: userData, isSuccess: isUserLoaded, isError: isAuthError, isLoading } = useAuthUser();

    const isAdmin = userData?.user.role === 'admin';

    console.log(isAdmin);

    return (
        <>
            <Toaster position="top-right" richColors closeButton />

            {/* Fullscreen spinner while loading user */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 z-50">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white text-sm">Загрузка пользователя...</p>
                    </div>
                </div>
            )}

            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/add-release" element={<AddRelease />} />
                    <Route path="/releases" element={<Releases />} />
                    <Route path="/stats" element={<Statistics />} />
                    <Route path="/artists" element={<ArtistsList />} />
                    <Route path="/moderation" element={<ModerationReleases />} />
                    <Route path='/create-doc' element={<CreateDoc/>}/>
                    {isAdmin && (
                        <>
                            <Route path="/admin/users" element={<UsersList />} />
                            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                        </>
                    )}
                </Route>
            </Routes>
        </>
    );
}

export default App;
