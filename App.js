import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { htmlcontent } from './htmlcontent';
import { htmlteste } from './htmlteste';
import * as Location from 'expo-location';

export default function App() {
  async function solicitarPermissoes() {
    // Solicita permissão para uso em primeiro plano
    let { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    if (statusForeground !== 'granted') {
      console.log('Permissão de localização em primeiro plano negada');
      return;
    }

    // Solicita permissão para uso em segundo plano
    let { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    if (statusBackground !== 'granted') {
      console.log('Permissão de localização em segundo plano negada');
      return;
    }

    console.log(
      'Todas as permissões concedidas',
      statusForeground,
      statusBackground
    );
  }

  // Chame a função para solicitar permissões
  solicitarPermissoes();

  // Função para tratar mensagens enviadas pelo WebView
  const handleMessage = (event) => {
    console.log('Mensagem do WebView', event.nativeEvent.data);
  };

  return (
    <View style={{ flex: 1, marginBottom: 50, marginTop: 50 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlcontent }}
        // source={{ html: htmlteste }}
        style={{ flex: 1 }}
        geolocationEnabled={true}
        javaScriptEnabled={true}
        webviewDebuggingEnabled={true}
        nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
        setWebContentsDebuggingEnabled={true}
        onMessage={handleMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
