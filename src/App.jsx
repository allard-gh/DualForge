import { Routes, Route } from 'react-router-dom';
import SidebarLayout from './components/layout/SidebarLayout/SidebarLayout';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage.jsx';
import BuildsPage from './pages/BuildsPage/BuildsPage.jsx';

function App() {
  return (
    <SidebarLayout>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/projects/:projectId/builds" element={<BuildsPage />} />
      </Routes>
    </SidebarLayout>
  );
}

export default App;
