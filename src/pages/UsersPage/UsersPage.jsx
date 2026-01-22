import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthenticationContext } from '../../context/AuthenticationContext/AuthenticationContext';
import UserRow from '../../components/UserRow/UserRow';
import './UsersPage.css';

const availableRoles = [
  { value: "admin", label: "Admin" },
  { value: "pm_internal", label: "PM Internal" },
  { value: "pm_external", label: "PM External" },
  { value: "regular_user", label: "Regular user" },
  { value: "pending", label: "Pending" },
  { value: "builder", label: "Builder" },
];

function UsersPage() {
  const { token, role } = useContext(AuthenticationContext);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRolesByUserId, setSelectedRolesByUserId] = useState({});

  useEffect(() => {
    if (!token) return;

    async function fetchUsersData() {
      setIsLoading(true);
      setError(null);

      const headers = {
        'Content-Type': 'application/json',
        'novi-education-project-id': 'c8c123e6-beb1-4124-9d9f-b3c03ec31a1a',
        Authorization: `Bearer ${token}`,
      };

      try {
        const usersResult = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', { headers });
        const profilesResult = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/profiles', { headers });
        const companiesResult = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/companies', { headers });

        setUsers(usersResult.data);
        setProfiles(profilesResult.data);
        setCompanies(companiesResult.data);
      } catch (error) {
        console.error('Could not fetch users data:', error);
        setError('Failed to load users. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsersData();
  }, [token]);

  if (!role) {
    return (
      <main className="users-page">
        <p>Checking permissions...</p>
      </main>
    );
  }

  if (role !== 'admin') {
    return (
      <main className="users-page">
        <p>This page is only accessible to administrators.</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="users-page">
        <p>Loading users...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="users-page">
        <p className="error-message">{error}</p>
      </main>
    );
  }

  const usersForDisplay = users.map((user) => {
    const profile = profiles.find(
      (p) => (p.email || "").trim().toLowerCase() === (user.email || "").trim().toLowerCase()
    );
    const company = profile
      ? companies.find((c) => c.id === profile.companyId)
      : null;

    return {
      id: user.id,
      email: user.email,
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      companyName: company?.name || "Unknown company",
      role: user.roles?.[0] || "unknown",
    };
  });

  function handleRoleSelect(userId, newRole) {
    setSelectedRolesByUserId({
      ...selectedRolesByUserId,
      [userId]: newRole,
    });
  }

  return (
    <main className="users-page">
      <h1>Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersForDisplay.map((user) => {
            const currentRole = user.role;
            const selectedRole = selectedRolesByUserId[user.id] || currentRole;

            return (
              <UserRow
                key={user.id}
                userId={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                companyName={user.companyName}
                email={user.email}
                currentRole={currentRole}
                selectedRole={selectedRole}
                availableRoles={availableRoles}
                onRoleSelect={handleRoleSelect}
              />
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default UsersPage;
