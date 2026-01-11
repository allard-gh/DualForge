export const getProjectStatusColor = (status, deadline) => {
  if (status === "completed") {
    return "#2FA36A";
  }

  if (!deadline) {
    return "#E6BF6A";
  }

  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDifference = deadlineDate - today;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference <= 7) {
    return "#C94A4A";
  } else if (daysDifference <= 14) {
    return "#FF7A29";
  } else {
    return "#E6BF6A";
  }
};
