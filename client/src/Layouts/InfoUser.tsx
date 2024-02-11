import { HomeProfile } from '@/features/Profile';
import { ProfileUser } from '@/features/Profile/Components/Info';
import { Purcharse } from '@/features/Profile/Components/Purchase';
import { ChangePassword } from '@/features/Profile/Components/ChangePw';
import { Route, Routes } from 'react-router-dom';

export function ProfileUserRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomeProfile />}>
                <Route path="/account/profile" element={<ProfileUser />} />
                <Route path="/purchase/*" element={<Purcharse />} />
                <Route path="/changepassword/*" element={<ChangePassword />} />
            </Route>
        </Routes>
    );
}
