# São Gabriel 3D - Instruções para Agentes de IA

## Visão Geral do Projeto

**São Gabriel 3D** é uma aplicação web interativa de visualização 3D do patrimônio histórico de São Gabriel, RS, Brasil. O projeto usa **CesiumJS** para renderizar um globo 3D com modelos GLB de edifícios históricos, integração com OpenStreetMap Buildings, e conteúdo cultural (lendas, prefeitos, marechais, pontos turísticos).

## Arquitetura e Componentes Principais

### Stack Tecnológico
- **CesiumJS v1.133** (CDN) - Motor de renderização 3D/globo terrestre
- **JavaScript ES6+ Modules** - Código modular sem bundler
- **HTML5 + CSS3** - Interface sem frameworks
- **Cesium Ion** - Terrain data e OSM Buildings tileset (requer token)
- **GLB/GLTF** - Modelos 3D dos edifícios (versões `_low.glb` e detalhadas)
- **Three.js** (lazy-loaded) - Fallback para visualização de modelos quando necessário
- **Google Model Viewer** - Visualizador interativo de GLB em modais

### Estrutura de Arquivos

```
├── index.html                    # Versão principal (inclui controles completos)
├── index-osm-full.html          # Variante sem mapas históricos
├── buildingsData.js             # Dados dos edifícios (coords, GLBs, descrições)
├── tourismData.js               # 8 pontos turísticos/museus
├── lendasData.js                # 5 lendas locais (Fuzilados, Negrinho, etc.)
├── prefeitosData.js             # 24 prefeitos históricos
├── marechaisData.js             # 5 marechais nascidos em São Gabriel
├── ilustresData.js              # Homens ilustres da cidade
├── *.glb, *_low.glb             # Modelos 3D (low-poly para overview, detalhados para close-up)
├── *.jpg                        # Imagens históricas e contemporâneas
├── Build/Cesium/               # CesiumJS library (local, não usado - CDN prioritário)
└── jsconfig.json               # Config para IntelliSense (ES2020, ESNext modules)
```

### Fluxo de Dados: Sistema de 2 Níveis de LOD

O projeto implementa um **sistema de Level of Detail (LOD)** para otimização:

1. **Vista geral (LOW)**: Modelos `*_low.glb` (laranja preview) exibidos por padrão
   - Aplicado tint laranja (`#b45f00`) via `Cesium.ColorBlendMode.REPLACE`
   - Ocultam OSM building correspondente automaticamente
   
2. **Vista detalhada (DETAIL)**: Ativada ao clicar no modelo LOW
   - Pode ser arquivo único `.glb` OU array de múltiplos blocos (ex: Prefeitura com 4 blocos)
   - Remove tint laranja, carrega modelo completo
   - Exibe infobox/modal com descrição histórica

**Importante**: `buildingsMap[id].uri_detail` pode ser:
- String única: `'prefeitura.glb'` → cria entity com id = `id`
- Array: `['bloco1.glb', 'bloco2.glb']` → cria entities `id_detail_0`, `id_detail_1`

### Gestão de Visibilidade OSM vs GLB

A função `updateTilesetShowForOSM(osmOn)` controla quais edifícios OSM são exibidos:
- Oculta OSM de **todos os IDs com `uri_base`** (temos modelo LOW)
- Oculta OSM dos **IDs em `activeGlbs`** (modelos DETAIL abertos)
- Usa `Cesium3DTileStyle` com condições para filtrar por `elementId`
- IDs numéricos comparados sem aspas: `"${elementId} === 123456"`
- IDs alfanuméricos com aspas: `"${elementId} === 'abc-123'"`

### Coordenadas e Posicionamento

- **Sistema**: WGS84 (longitude, latitude, altitude)
- **Centro da Praça**: `-54.316822, -30.344800` (600m altitude inicial)
- Edifícios usam `Cesium.Cartesian3.fromDegrees(lon, lat, elevation)`
- **Elevação padrão**: ~136-146m (solo em São Gabriel)
- **Orientação**: `HeadingPitchRoll` em radianos (ex: `-156°` para rotação)

## Padrões de Código e Convenções

### Nomenclatura de IDs

- **OSM IDs**: Strings numéricas (ex: `'494741651'` = Prefeitura)
- **Monumentos**: IDs fictícios `'111111111'`, `'222222222'`, `'333333333'`
- **Entidades LOW**: `{id}_low` (ex: `'494741651_low'`)
- **Entidades DETAIL multi-bloco**: `{id}_detail_{idx}` (ex: `'494741651_detail_0'`)

### Estilo de Código

```javascript
// Constantes de UI centralizadas
const BOX_BG = '#333';
const BOX_FG = '#f5f5f5';
const BOX_ALT = '#292929';
const BTN_BG = '#444';

// Zebra pattern para legibilidade (descrições longas)
descParts.map((part, i) => 
  `<div style='background:${i % 2 === 0 ? BOX_BG : BOX_ALT};padding:4px 8px;'>${part}</div>`
).join('');
```

### Mobile-First Responsividade

CSS injetado dinamicamente (`injectMobileStyles()`) aplica:
- **Infoboxes**: `width: 94vw`, `height: 86vh` em mobile (<420px)
- **Imagens**: `max-height: 40vh` para evitar overflow
- **Left-panel**: `max-width: 46vw`, scroll vertical limitado a `64vh`
- **Botão fixo de boas-vindas**: `display: none` em telas pequenas

## Workflows Críticos

### Adicionar Novo Edifício

1. **Criar modelos GLB**:
   ```
   edificio_low.glb      # Versão simplificada
   edificio.glb          # Versão detalhada (ou array de blocos)
   edificio1.jpg         # Foto(s) para infobox
   ```

2. **Adicionar em `buildingsData.js`**:
   ```javascript
   '123456789': { 
     elevationOffset: 0,
     position: Cesium.Cartesian3.fromDegrees(lon, lat, elevation),
     orientation: new Cesium.HeadingPitchRoll(
       Cesium.Math.toRadians(heading), 
       Cesium.Math.toRadians(0), 
       Cesium.Math.toRadians(0)
     ),
     uri_base: 'edificio_low.glb',
     uri_detail: 'edificio.glb',  // OU ['bloco1.glb', 'bloco2.glb'] para multi-parte
     info: {
       title: 'Nome do Edifício',
       description: 'Texto histórico<br><br>Parágrafo 2',
       images: ['edificio1.jpg', 'edificio2.jpg']
     }
   }
   ```

3. **Obter coordenadas**: Clicar no edifício OSM no app → console mostra `[OSM] ID do prédio: 123456789, Coordenadas: {...}`

### Depuração de Modelos 3D

- **Problema: GLB não aparece**
  - Verificar `console.debug('[DEBUG] addDetailModel', id, uri)`
  - Confirmar altitude: edifícios muito altos/baixos ficam invisíveis
  - Usar `heightReference: Cesium.HeightReference.NONE` (padrão do projeto)

- **Problema: OSM não é ocultado**
  - Verificar se `uri_base` está definido (necessário para `updateTilesetShowForOSM`)
  - IDs devem ser strings: `'123456'` não `123456`

### Integração Cesium Ion Token

```javascript
// Token armazenado no código OU localStorage
Cesium.Ion.defaultAccessToken = 'eyJhbGciOi...'; 
// Alternativa: localStorage.setItem('cesiumIonToken', 'TOKEN_AQUI');
```

**Assets necessários do Ion**:
- Cesium World Terrain (`Cesium.Terrain.fromWorldTerrain()`)
- OSM Buildings (`Cesium.createOsmBuildingsAsync()`)

## Características Específicas do Projeto

### Sistema de Navegação

- **Camera Controls**: 
  - Rotação: `LEFT_DRAG`
  - Zoom: `WHEEL`, `MIDDLE_DRAG`, `PINCH`
  - Pan: `RIGHT_DRAG`
- **Flyto inicial**: Visão global (20.000km) → Praça (600m) em 3.5s
- **Botão "Centralizar Praça"**: Refaz animação flyTo

### Carrosséis e Modais

- **Prefeitos/Marechais/Ilustres**: Carrosseis navegáveis (`◀`/`▶`) com suporte a teclado (`ArrowLeft`/`ArrowRight`)
- **Lendas**: Marcadores billboard com infobox + carousel de imagens
- **Model Viewer Modal**: Para GLB únicos, abre modal fullscreen com abas `[3D]` `[Info]`
  - **Trigger**: `uri_detail` é string `.glb` única (não array)
  - Lazy-load de `@google/model-viewer`

### Basemap/Imagery

- **Padrão**: OpenStreetMap (`osm`)
- **Alternativa disponível**: MapTiler (`maptiler`)
- **UI simplificada**: Apenas seletor de basemap (sliders de alpha/saturação/hue removidos)
- **Fallback**: Se `imageryLayers.length === 0`, adiciona OSM automaticamente
- **Mapas históricos**: Removidos do menu (funções mantidas no código para uso futuro)

### Performance e Otimização

- **Tilesets**: OSM Buildings com estilo condicional para ocultar apenas IDs específicos
- **Lazy Loading**: Three.js e Model Viewer carregados sob demanda
- **Shadows**: `ShadowMode.ENABLED` em todos os GLBs
- **MaximumScale**: `20000` para evitar pop-in excessivo

## Armadilhas Comuns (Evitar)

1. **Não usar `&&` em PowerShell** - Sempre use `;` para encadear comandos
2. **Não modificar `Build/Cesium/`** - CDN é prioritário, pasta Build é referência local
3. **Não usar IDs numéricos sem aspas** em `buildingsMap` - Sempre strings
4. **Não assumir `uri_detail` é string** - Pode ser array (Prefeitura tem 4 blocos)
5. **Não criar infobox se isGlbDetail** - Modal Model Viewer substituirá
6. **Não remover OSM manualmente** - `updateTilesetShowForOSM()` gerencia automaticamente

## Testes e Validação

```powershell
# Servidor local (evita CORS com GLB/modulos ES6)
python -m http.server 8000
# Abrir: http://localhost:8000/index.html
```

**Checklist de teste**:
- [ ] Botão "Polígonos" oculta OSM corretamente
- [ ] Clicar em LOW carrega DETAIL e abre infobox
- [ ] Botão "Voltar ao modelo simplificado" restaura LOW
- [ ] Carousel de imagens funciona (prev/next)
- [ ] Modal GLB (ex: América, Banco Província) abre e roda 3D
- [ ] Mobile: infoboxes não cobrem toda tela, botão fechar visível
- [ ] Console sem erros 404 (arquivos GLB/JPG faltando)

## Referências Técnicas

- **CesiumJS Docs**: https://cesium.com/learn/cesiumjs/ref-doc/
- **GLB Best Practices**: Usar MeshOpt compression, max 50k triangles para LOW
- **Cesium Ion**: https://ion.cesium.com/ (asset management)
- **Model Viewer**: https://modelviewer.dev/ (web component para GLB)

---

**Última atualização**: Janeiro 2025 (versão com modal GLB e sistema LOD refinado)
