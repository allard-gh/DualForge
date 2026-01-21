import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthenticationContext } from '../../context/AuthenticationContext/AuthenticationContext';
import Button from '../../components/Button/Button';
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
            const isUnknownRole = !availableRoles.some(r => r.value === currentRole);

            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.companyName}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      const newRoleValue = e.target.value;
                      setSelectedRolesByUserId({
                        ...selectedRolesByUserId,
                        [user.id]: newRoleValue,
                      });
                    }}
                  >
                    {isUnknownRole && (
                      <option value={currentRole} disabled>
                        Unknown ({currentRole})
                      </option>
                    )}
                    {availableRoles.map((roleOption) => (
                      <option key={roleOption.value} value={roleOption.value}>
                        {roleOption.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="user-actions">
                    <Button
                      onClick={() => {}}
                      disabled={true}
                    >
                      Role change not available yet
                    </Button>
                    <Button
                      onClick={() => {}}
                      disabled={true}
                      className="button-danger"
                    >
                      Delete user
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default UsersPage;
