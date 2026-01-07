import { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { AuthenticationContext } from './context/AuthenticationContext/AuthenticationContext';
import SidebarLayout from './components/layout/SidebarLayout/SidebarLayout';
import PublicLayout from './components/layout/PublicLayout/PublicLayout';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage.jsx';
import BuildsPage from './pages/BuildsPage/BuildsPage.jsx';

function App() {
  const { isUserAuthenticated } = useContext(AuthenticationContext);

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
          isUserAuthenticated ? (
            <SidebarLayout>
              <DashboardPage />
            </SidebarLayout>
          ) : (
            <Navigate to={ROUTES.SIGN_IN} replace />
          )
        }
      />
      <Route
        path={ROUTES.PROJECT_DETAILS}
        element={
          isUserAuthenticated ? (
            <SidebarLayout>
              <ProjectDetailsPage />
            </SidebarLayout>
          ) : (
            <Navigate to={ROUTES.SIGN_IN} replace />
          )
        }
      />
      <Route
        path={ROUTES.PROJECT_BUILDS}
        element={
          isUserAuthenticated ? (
            <SidebarLayout>
              <BuildsPage />
            </SidebarLayout>
          ) : (
            <Navigate to={ROUTES.SIGN_IN} replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
