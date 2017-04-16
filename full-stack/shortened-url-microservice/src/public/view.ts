export const view = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title></title>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <h1>Shortened URL Microservice</h1>
      <h3>Visit <a href="https://shortened-url-microservice.herokuapp.com/shortcuts">https://shortened-url-microservice.herokuapp.com/shortcuts</a> to see all saved shortcuts.</h3>
      
      <h4>Example creation usage:</h4>
      <code><p>https://shortened-url-microservice.herokuapp.com/new/https://www.google.com</p></code>
      <code><p>https://shortened-url-microservice.herokuapp.com/new/http://foo.com:80</p></code>
     
      <h4>Example creation output</h4>
     <code><p>{ "original_url":"http://foo.com:80",  "shortcut_url":"https://shortened-url-microservice.herokuapp.com/8170" }</p></code>
      
      <h4>Usage:</h4>
      <code><p>https://shortened-url-microservice.herokuapp.com/8170</p><code>
      <h5>Will redirect to:</h5>
      <code><p>http://foo.com:80/</p></code>
      
    </body>
  </html>
`;

