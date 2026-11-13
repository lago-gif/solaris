# solaris-ds

Design system de **solaris-app**: componentes, tokens y patrones para construir un portal de salud personal claro, accesible y coherente.

> **Estado:** 🟡 Fase 0, en arranque. Todavía no hay componentes publicados. Ver [Estado del proyecto](#estado-del-proyecto).

---

## Qué es solaris-app

**solaris-app** es una app de salud personal. Cada persona entra en su portal y tiene en un solo sitio:

- **Recetas y medicación**: qué tiene que tomar, cuánto y cuándo.
- **Análisis y chequeos**: los que se ha hecho a lo largo del año.
- **Citas**: médico de cabecera, dentista, oftalmólogo…
- **Consultas grabadas y notas**: puede grabar una consulta y apuntar lo importante para no olvidarlo.
- **Agente de IA**: una conversación para contar cómo se siente y ordenar sus dudas antes o después de una cita.
- **Objetivos de revisiones anuales**: por ejemplo, vista, dientes y medicina general.
- **Panel de datos y métricas**: para seguir todo lo anterior de un vistazo (adherencia a la medicación, revisiones hechas frente a planificadas, próximas citas).

## Qué es solaris-ds

**solaris-ds** es la base visual y de interacción sobre la que se construye solaris-app. Incluye:

- **Design tokens**: color, tipografía, espaciado, radios, sombras y movimiento, con tema claro y oscuro.
- **Componentes React** documentados y probados en **Storybook**.
- **Patrones** propios del dominio salud: tarjeta de medicación, registro de análisis, cita, objetivo anual, mensaje del agente de IA, gráficas del panel…
- **Guías** de uso, accesibilidad y tono (UX writing) para hablar de salud sin alarmar ni confundir.

El objetivo es que diseño (Figma) y código (React) hablen el mismo idioma: un componente en Figma corresponde a un componente en Storybook, con los mismos nombres, variantes y tokens.

## Para quién es

| Quién | Para qué lo usa |
|---|---|
| **Diseño de producto** | Diseñar pantallas de solaris-app en Figma con componentes y tokens reales. |
| **Desarrollo frontend** | Construir la app con componentes ya probados, en vez de rehacerlos en cada pantalla. |
| **Producto y negocio** | Revisar en Storybook cómo se ve y se comporta cada pieza antes de que llegue a la app. |
| **Agentes de IA** (Claude, Dust…) | Generar y revisar UI usando componentes, tokens y documentación del sistema como fuente de verdad. |

La persona usuaria final de solaris-app no usa este repositorio, pero es para quien está pensado todo: personas de cualquier edad, con distintos niveles de soltura digital y, a veces, en momentos de preocupación. Por eso la **accesibilidad (WCAG 2.2 AA)** y la **claridad** son requisitos, no extras.

## Qué vamos a construir

### 1. Fundamentos
- Tokens de color con contraste verificado, también para estados de salud (correcto, atención, urgente) que nunca dependan solo del color.
- Escala tipográfica legible, preparada para el texto ampliado del sistema.
- Espaciado, rejilla, iconografía y movimiento, respetando la opción de reducir movimiento.
- Tema claro y oscuro.

### 2. Componentes base
Botón, enlace, campo de texto, selector, fecha/hora, checkbox, switch, tarjeta, lista, pestañas, modal, aviso (toast), insignia (badge), avatar, estado vacío, estado de carga y estado de error.

### 3. Componentes de dominio (salud)
| Componente | Dónde se usa en solaris-app |
|---|---|
| `MedicationCard` | Medicación: nombre, dosis, horario y toma marcada o pendiente |
| `PrescriptionItem` | Recetas activas y caducadas |
| `LabResult` | Análisis: valor, rango de referencia y fecha |
| `CheckupTimeline` | Chequeos del año en línea de tiempo |
| `AppointmentCard` | Citas: especialidad, centro, fecha y acciones |
| `ConsultationRecorder` | Grabar una consulta, con estado y consentimiento visibles |
| `NoteEditor` | Notas asociadas a una consulta o cita |
| `AIChatMessage` | Conversación con el agente de IA, con avisos de que no sustituye al personal sanitario |
| `AnnualGoal` | Objetivos de revisiones (vista, dientes, medicina general) y su progreso |
| `MetricCard` / `ChartPanel` | Panel de datos y métricas |

### 4. Documentación
- Storybook con cada componente, sus variantes, estados y controles.
- Guías de accesibilidad, contenido y uso de la IA en la interfaz.
- Conexión Figma ↔ código (Code Connect) para que cada componente de Figma enlace con su implementación.

## Stack

- **React** para los componentes.
- **Vite** para el entorno de desarrollo y la compilación.
- **Storybook** para la documentación y las pruebas visuales.
- **Figma** como fuente del diseño.

### Requisitos para trabajar en local

- **Git**
- **Node.js 22.12 o superior** (versión LTS) y **npm**

Para comprobarlos:

```bash
git --version
```

```bash
node --version
```

```bash
npm --version
```

> Las instrucciones de instalación del proyecto (`npm install`, `npm run storybook`…) se añadirán cuando exista el código base.

## Estado del proyecto

| Fase | Contenido | Estado |
|---|---|---|
| **0. Arranque** | Repositorio creado, entorno local preparado (Git, Node LTS), README | 🟡 En curso |
| **1. Fundamentos** | Proyecto React + Vite + Storybook, tokens, tema claro/oscuro | ⚪ Pendiente |
| **2. Componentes base** | Componentes genéricos documentados en Storybook | ⚪ Pendiente |
| **3. Componentes de dominio** | Medicación, análisis, citas, grabación, IA, objetivos, métricas | ⚪ Pendiente |
| **4. Documentación y Figma** | Guías, Code Connect y primera versión publicada | ⚪ Pendiente |

## Principios

1. **Claridad antes que densidad.** Una persona preocupada tiene que entender cada pantalla a la primera.
2. **Accesible por defecto.** Contraste, foco visible, teclado, lector de pantalla y texto ampliado en todos los componentes.
3. **El color nunca va solo.** Los estados de salud siempre llevan también texto o icono.
4. **IA transparente.** Siempre queda claro cuándo habla el agente de IA, qué puede hacer y qué no.
5. **Privacidad visible.** Grabar, compartir o guardar datos de salud siempre se muestra y se confirma.
