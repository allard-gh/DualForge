import { Routes, Route, Link } from 'react-router-dom';
import SidebarLayout from './components/layout/SidebarLayout/SidebarLayout';
import PublicLayout from './components/layout/PublicLayout/PublicLayout';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage.jsx';
import BuildsPage from './pages/BuildsPage/BuildsPage.jsx';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout
            topRightContent={
              <>
                <Link to="/sign-in">Login</Link>
                <Link to="/sign-up">Sign Up</Link>
              </>
            }
          >
            <HomePage />
          </PublicLayout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <PublicLayout
            topRightContent={<Link to="/sign-up">Sign Up</Link>}
          >
            <SignInPage />
          </PublicLayout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicLayout
            topRightContent={<Link to="/sign-in">Login</Link>}
          >
            <SignUpPage />
          </PublicLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <SidebarLayout>
            <DashboardPage />
          </SidebarLayout>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <SidebarLayout>
            <ProjectDetailsPage />
          </SidebarLayout>
        }
      />
      <Route
        path="/projects/:projectId/builds"
        element={
          <SidebarLayout>
            <BuildsPage />
          </SidebarLayout>
        }
      />
    </Routes>
  );
}

export default App;
