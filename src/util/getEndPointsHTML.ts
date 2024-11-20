const getEndPointsHTML = () => {
  const html = `
    <h4>Auth</h4>
    <ul>
      <li><a href="/api/auth/register">/api/auth/register</a></li>
      <li><a href="/api/auth/login">/api/auth/login</a></li>
    </ul>
    <h4>Users</h4>
    <ul>
      <li><a href="/api/users">/api/users</a></li>
      <li><a href="/api/users/me">/api/users/me</a></li>
    </ul>
  `;
  return html;
};

export { getEndPointsHTML };
