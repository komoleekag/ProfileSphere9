import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import AdminPage from "./Pages/AdminPage";
import AdminDashboard from './components/Admin/AdminDashboard';
import ViewProfiles from './components/Admin/ViewAllProfiles';

import UserPage from "./Pages/UserPage";
import UserDashboard from './components/User/UserDashboard';
import ProfileDetail from "./components/User/ProfileDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/View Profiles" element={<ViewProfiles />} />
        
        
        {/* User Routes */}
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/user/user-dashbard" element={<UserDashboard />} />
        <Route path="/user/profile/:id" element={<ProfileDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
