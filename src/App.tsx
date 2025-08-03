import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Profile from './pages/profile';
import { Toaster } from 'sonner';
import AddRelease from './pages/release';
import Releases from './pages/releases';
import Statistics from './pages/stats';
import Layout from './components/Layout';
import { ArtistsList } from './pages/artists-list';
import ModerationReleases from './pages/moderation-releases';
import { UsersList } from './pages/admin/users-list';
import DashboardAdmin from './pages/admin/dashboard';

function App() {
    return (
        <>
            <Toaster position="top-right" richColors closeButton />
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/add-release" element={<AddRelease />} />
                    <Route path="/releases" element={<Releases />} />
                    <Route path="/stats" element={<Statistics />} />
                    <Route path="/artists" element={<ArtistsList />} />
                    <Route path="/moderation" element={<ModerationReleases />} />
                    <Route path="/admin/users" element={<UsersList />} />
                    <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
