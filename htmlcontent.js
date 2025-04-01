export const htmlcontent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
      <title>Mapa ArcGIS</title>
      <link rel="stylesheet" href="https://js.arcgis.com/4.32/esri/themes/light/main.css">
      <style>
        html, body, #viewDiv {
          padding: 0;
          margin: 0;
          height: 100%;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="viewDiv"></div>
      <script type="module">
        import Map from 'https://js.arcgis.com/4.32/@arcgis/core/Map.js';
        import MapView from 'https://js.arcgis.com/4.32/@arcgis/core/views/MapView.js';
        import Locate from 'https://js.arcgis.com/4.32/@arcgis/core/widgets/Locate.js';
        import BasemapGallery from 'https://js.arcgis.com/4.32/@arcgis/core/widgets/BasemapGallery.js';
        import LayerList from 'https://js.arcgis.com/4.32/@arcgis/core/widgets/LayerList.js';
        import Expand from 'https://js.arcgis.com/4.32/@arcgis/core/widgets/Expand.js';
        import Home from 'https://js.arcgis.com/4.32/@arcgis/core/widgets/Home.js';
        import FeatureLayer from "https://js.arcgis.com/4.32/@arcgis/core/layers/FeatureLayer.js";
        import IdentityManager from 'https://js.arcgis.com/4.32/@arcgis/core/identity/IdentityManager.js';
        import { ArcGISIdentityManager } from "https://esm.run/@esri/arcgis-rest-request@4.3.0";


        const map = new Map({
          basemap: 'streets-navigation-vector'
        });

        const view = new MapView({
          container: 'viewDiv',
          map: map,
          center: [-43.4578, -22.5235], // Coordenadas de Volta Redonda, RJ
          zoom: 4
        });

        // Camada publica
        const featureLayer = new FeatureLayer({
          title: 'Embargos',
          url: "https://pamgia.ibama.gov.br/server/rest/services/01_Publicacoes_Bases/adm_embargos_ibama_a/FeatureServer/0"
        });
        map.add(featureLayer);

        // Função para realizar o login no ArcGIS Online (camadas privadas)
        async function signIn() {
          try {
          
            const session = await ArcGISIdentityManager.signIn({
              username: 'testeaplicacoes',
              password: 'devcodex@123',
              portal: 'https://pamgia.ibama.gov.br/portal/sharing/rest',
            });

            await IdentityManager.registerToken({
              server: 'https://pamgia.ibama.gov.br/server/rest/services',
              token: session.token,
            });

            const featureLayer2 = new FeatureLayer({
              title: 'Crotalus',
              url: "https://pamgia.ibama.gov.br/server/rest/services/01_Publicacoes/desmatamento_crotalus_fieldmaps_a/FeatureServer/0"
            });
            map.add(featureLayer2);
            window.ReactNativeWebView.postMessage("Success signin: " + session);

          } catch (error) {
            window.ReactNativeWebView.postMessage("Erro ao signin: " + error.message);
          }
        }        

        view.when(() => {
          const homeWidget = new Home({ view });
          view.ui.add(homeWidget, 'top-left');

          const basemapGallery = new BasemapGallery({ view });
          const baseMapExpand = new Expand({
            view,
            content: basemapGallery,
            expandIcon: 'collection',
            expandTooltip: 'Mapas',
          });
          view.ui.add(baseMapExpand, 'top-right');

          const layerList = new LayerList({ view });
          const layerExpand = new Expand({
            view,
            content: layerList,
            expandIcon: 'layers',
            expandTooltip: 'Camadas'
          });
          view.ui.add(layerExpand, 'top-right');

          // try {
          //   const locateWidget = new Locate({ view });
          //   view.ui.add(locateWidget, 'top-right');
            
          //   locateWidget.on("locate", function(event) {
          //     console.log("Localização obtida:", event.position);
          //     window.ReactNativeWebView.postMessage("Localização obtida: " + event.position);
          //   });

          //   locateWidget.on("locate-error", function(error) {
          //     window.ReactNativeWebView.postMessage("Erro ao obter localização: " + error);
          //   });

          //   window.ReactNativeWebView.postMessage('Locate widget adicionado com sucesso!');
          // } catch (error) {
          //   window.ReactNativeWebView.postMessage("Erro ao adicionar Locate widget: " + error.message);
          // }
        });

        signIn();
      </script>
    </body>
    </html>
  `;
