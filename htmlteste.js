export const htmlteste = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Teste de Geolocalização</title>
  <script>
    function obterLocalizacao() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const mensagem = {
              tipo: 'sucesso',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify(mensagem));
            } else {
              console.log('ReactNativeWebView não disponível');
            }
          },
          function (error) {
            const mensagem = {
              tipo: 'erro',
              codigo: error.code,
              mensagem: error.message
            };
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify(mensagem));
            } else {
              console.log('ReactNativeWebView não disponível');
            }
          }
        );
      } else {
        const mensagem = {
          tipo: 'erro',
          mensagem: 'Geolocalização não é suportada neste navegador.'
        };
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify(mensagem));
        } else {
          console.log('ReactNativeWebView não disponível');
        }
      }
    }
  </script>
</head>
<body>
  <h1>Teste de Geolocalização</h1>
  <button onclick="obterLocalizacao()">Obter Localização</button>
</body>
</html>
`;
