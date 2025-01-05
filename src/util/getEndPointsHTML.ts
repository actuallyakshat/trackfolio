const getEndPointsHTML = () => {
  const html = `
    <h4>Auth</h4>
    <ul>
      <li><a href="/api/v1/auth/register">/api/v1/auth/register</a> - POST</li>
      <li><a href="/api/v1/auth/login">/api/v1/auth/login</a> - POST</li>
      <li><a href="/api/v1/auth/refresh">/api/v1/auth/refresh</a> - POST</li>
      <li><a href="/api/v1/auth/logout">/api/v1/auth/logout</a> - POST</li>
      <li><a href="/api/v1/auth/me">/api/v1/auth/me</a> - GET</li>
      <li><a href="/api/v1/auth/me">/api/v1/auth/me</a> - DELETE</li>
    </ul>

    <h4>Applications</h4>
    <ul>
      <li><a href="/api/v1/application">/api/v1/application</a> - POST</li>
      <li><a href="/api/v1/application">/api/v1/application</a> - GET</li>
      <li><a href="/api/v1/application/:id">/api/v1/application/:id</a> - GET</li>
      <li><a href="/api/v1/application/:id">/api/v1/application/:id</a> - DELETE</li>
      <li><a href="/api/v1/application/:id">/api/v1/application/:id</a> - PATCH</li>
      <li><a href="/api/v1/application/:id/resume">/api/v1/application/:id/resume</a> - POST</li>
      <li><a href="/api/v1/application/:id/resume">/api/v1/application/:id/resume</a> - DELETE</li>
    </ul>
  `;
  return html;
};

export { getEndPointsHTML };
