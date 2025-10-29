import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main style={{ paddingTop: '80px', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
