import Button from '../Button/Button';
import './UserRow.css';

function UserRow({
  userId,
  firstName,
  lastName,
  companyName,
  email,
  currentRole,
  selectedRole,
  availableRoles,
  onRoleSelect
}) {

  const isUnknownRole = !availableRoles.some(roleOption => roleOption.value === currentRole);

  const handleSelectChange = (event) => {
    onRoleSelect(userId, event.target.value);
  };

  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{companyName}</td>
      <td>{email}</td>
      <td>
        <select value={selectedRole} onChange={handleSelectChange}>
          {isUnknownRole && (
            <option value={currentRole} disabled>
              Unknown
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
          <Button disabled={true}>
            Role change * in development *
          </Button>
          <Button disabled={true} className="button-danger">
            Delete * in development *
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
