export const view = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>File size</title>
  <script>
    var file;

    function updateFile() {
      file = document.getElementById("uploadInput").files[0];
    }

    function onSubmit() {
      window.location = 'https://file-size-microservice-app.herokuapp.com/file-size/' + file.size;
    }
  </script>
</head>

<body>
  <p><input id="uploadInput" type="file" name="file" onchange="updateFile()"></p>
  <p><input type="button" value="Send file" onclick="onSubmit()"></p>
</body>

</html>
`;