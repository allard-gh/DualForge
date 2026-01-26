import { useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { AuthenticationContext } from './context/AuthenticationContext/AuthenticationContext';
import SidebarLayout from './components/layout/SidebarLayout/SidebarLayout';
import PublicLayout from './components/layout/PublicLayout/PublicLayout';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage/ProjectDetailsPage.jsx';
import BuildsPage from './pages/BuildsPage/BuildsPage.jsx';
import Button from './components/Button/Button';

function App() {
  const { isUserAuthenticated, role } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <PublicLayout
            topRightContent={
              <>
                <Button type="button" onClick={() => navigate(ROUTES.SIGN_IN)}>Sign In</Button>
                <Button type="button" onClick={() => navigate(ROUTES.SIGN_UP)}>Sign Up</Button>
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
            topRightContent={<Button type="button" onClick={() => navigate(ROUTES.SIGN_UP)}>Sign Up</Button>}
          >
            <SignInPage />
          </PublicLayout>
        }
      />
      <Route
        path={ROUTES.SIGN_UP}
        element={
          <PublicLayout
            topRightContent={<Button type="button" onClick={() => navigate(ROUTES.SIGN_IN)}>Sign In</Button>}
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
      <Route
        path={ROUTES.USERS}
        element={
          isUserAuthenticated ? (
            role === 'admin' ? (
              <SidebarLayout>
                <UsersPage />
              </SidebarLayout>
            ) : (
              <SidebarLayout>
                <main style={{ padding: '2rem' }}>
                  <p>You do not have access to this page.</p>
                </main>
              </SidebarLayout>
            )
          ) : (
            <Navigate to={ROUTES.SIGN_IN} replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
