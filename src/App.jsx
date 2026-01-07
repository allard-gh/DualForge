import { Routes, Route, Link } from 'react-router-dom';
import { ROUTES } from './constants/routes';
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
        path={ROUTES.HOME}
        element={
          <PublicLayout
            topRightContent={
              <>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
              </>
            }
          >
            <HomePage />
          </PublicLayout>
        }
      />
      <Route
        path={ROUTES.SIGN_IN}
        element={
          <PublicLayout
            topRightContent={<Link to={ROUTES.SIGN_UP}>Sign Up</Link>}
          >
            <SignInPage />
          </PublicLayout>
        }
      />
      <Route
        path={ROUTES.SIGN_UP}
        element={
          <PublicLayout
            topRightContent={<Link to={ROUTES.SIGN_IN}>Sign In</Link>}
          >
            <SignUpPage />
          </PublicLayout>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <SidebarLayout>
            <DashboardPage />
          </SidebarLayout>
        }
      />
      <Route
        path={ROUTES.PROJECT_DETAILS}
        element={
          <SidebarLayout>
            <ProjectDetailsPage />
          </SidebarLayout>
        }
      />
      <Route
        path={ROUTES.PROJECT_BUILDS}
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
