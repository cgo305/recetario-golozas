# GOlozas · Recetario

Recetario personal. Es un sitio estático: se abre en cualquier navegador,
se instala en el teléfono como una app y funciona sin conexión.

Las recetas se guardan **en tu propio dispositivo**, en la base de datos
del navegador (IndexedDB). No hay servidor, no hay cuenta y nadie más
puede verlas.

---

## Índice

- [Cómo usarlo](#cómo-usarlo)
- [Instalarlo en el iPhone](#instalarlo-en-el-iphone)
- [Respaldos: lo más importante](#respaldos-lo-más-importante)
- [Cómo hacer cambios y volver a publicar](#cómo-hacer-cambios-y-volver-a-publicar)
- [Qué hay dentro de cada archivo](#qué-hay-dentro-de-cada-archivo)
- [Regenerar los estilos y los iconos](#regenerar-los-estilos-y-los-iconos)
- [Problemas frecuentes](#problemas-frecuentes)

---

## Cómo usarlo

- **Añadir receta**: el botón `+`. Puedes escribir los datos a mano o pegar
  la descripción de un TikTok, un reel o un blog en la pestaña
  «1. Pegar texto» y dejar que extraiga título, ingredientes y pasos.
  Siempre puedes corregir lo que haya entendido mal.
- **Subtítulos dentro de los ingredientes**: escribe una línea que termine
  en dos puntos, por ejemplo `Para el relleno:`. Se muestra en negrita y
  no cuenta como ingrediente.
- **Favoritas**: el corazón en cada tarjeta, o dentro de la receta.
- **Editar**: el lápiz en la tarjeta, o el botón «Editar» al abrirla.
- **Imprimir**: abre la receta y usa «Imprimir». Sale solo la ficha, sin
  menús ni botones.
- **Modo claro y oscuro**: la luna o el sol arriba a la derecha. Recuerda
  tu elección.
- **Buscar**: busca por nombre, descripción **e ingredientes**.

---

## Instalarlo en el iPhone

1. Abre la dirección del sitio en **Safari** (tiene que ser Safari; desde
   Chrome en iOS no se puede instalar).
2. Toca el botón de compartir (el cuadrado con la flecha hacia arriba).
3. Elige **«Añadir a pantalla de inicio»**.
4. Ábrelo desde el icono nuevo: se ve a pantalla completa, sin la barra
   del navegador, y funciona aunque estés sin señal.

**Importante:** instalarlo no es solo comodidad. Al abrirlo como app
instalada, iOS trata los datos como permanentes y deja de borrarlos por
falta de uso. Si lo dejas solo como pestaña de Safari, iOS **puede**
borrar los datos tras varias semanas sin abrirlo.

En Android o en el computador, Chrome muestra un icono de instalación en
la barra de direcciones.

---

## Respaldos: lo más importante

Las recetas viven en el navegador de cada dispositivo. Eso significa que
**se pierden si borras los datos del navegador**, si reinstalas el sistema
o si cambias de teléfono sin llevarlas contigo.

- **Descargar respaldo**: el botón ⬇ arriba a la derecha. Baja un archivo
  `recetario-golozas-AAAA-MM-DD.json` con todas las recetas y sus fotos.
- **Restaurar**: el botón ⬆ y eliges ese archivo.

La restauración **fusiona**: agrega las recetas que faltan y no toca las
que ya tienes. Nunca borra nada. Al terminar te dice cuántas entraron.

> Guarda un respaldo cada cierto tiempo, y siempre antes de cambiar de
> teléfono o de limpiar el navegador. Es la única copia que existe.

### Llevar las recetas a otro dispositivo

1. En el dispositivo que ya las tiene: ⬇ para bajar el respaldo.
2. Pásate el archivo (correo, AirDrop, lo que prefieras).
3. En el dispositivo nuevo: abre el sitio y usa ⬆ para cargarlo.

Los dos dispositivos quedan iguales en ese momento, pero **no se
sincronizan solos**: si después añades una receta en el teléfono, no
aparece en el computador hasta que repitas el respaldo.

---

## Cómo hacer cambios y volver a publicar

El sitio son archivos sueltos, sin compilación. Para cambiar textos o
comportamiento basta con editar `index.html`.

### Verlo en tu computador antes de publicar

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Y abre <http://localhost:8000>. Hay que usar un servidor —abrir el archivo
con doble clic no funciona, porque el service worker necesita `http://`.

### Publicar los cambios

```bash
git add -A && git commit -m "Describe aquí el cambio" && git push
```

Si el sitio está en GitHub Pages o Vercel, se actualiza solo en un par de
minutos.

### Al cambiar archivos del sitio, sube la versión del caché

Esto es lo único que se olvida con facilidad. El navegador guarda una
copia de los archivos para poder funcionar sin conexión. Si cambias
`index.html`, `app.css` o cualquier icono, edita `sw.js` y sube el número:

```js
const VERSION = 'golozas-v3';   // pásalo a 'golozas-v4'
```

Sin eso, la app instalada puede seguir mostrando la versión anterior. Las
recetas **no** se ven afectadas: viven en otro lado y el cambio de versión
no las toca.

---

## Qué hay dentro de cada archivo

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Toda la app: estructura, estilos propios y lógica. Es el archivo que editas. |
| `app.css` | Estilos generados con Tailwind. **No se edita a mano**, se regenera. |
| `fonts.css` + `fonts/` | Las tipografías, guardadas aquí para que funcione sin internet. |
| `sw.js` | Service worker: guarda copia de los archivos para el modo sin conexión. |
| `manifest.webmanifest` | Nombre, colores e iconos para cuando se instala como app. |
| `icons/` | Iconos de la pantalla de inicio. |
| `build/` | Herramientas para regenerar CSS e iconos. No forma parte del sitio publicado. |

La paleta de colores está definida como variables CSS al comienzo de
`app.css` (`:root` para el modo claro, `.dark` para el oscuro).

---

## Regenerar los estilos y los iconos

Solo hace falta si cambias colores, tipografías o si usas clases de
Tailwind que antes no aparecían en el HTML.

```bash
cd build && npm install && npx tailwindcss -c tailwind.config.js -i input.css -o /tmp/tw.css --minify && cat vars.css /tmp/tw.css > ../app.css
```

Para los iconos, tras cambiar los colores de marca:

```bash
python3 build/make-icons.py
```

---

## Problemas frecuentes

**Cambié algo y la app sigue igual.**
Sube el número de `VERSION` en `sw.js`, publica y recarga. Si insiste,
cierra la app instalada por completo y vuelve a abrirla.

**Aparece un aviso rojo que dice que no se pudo guardar.**
El navegador rechazó la escritura. Suele ser falta de espacio o modo
incógnito (ahí nunca se guarda nada). Descarga un respaldo antes de
cerrar y libera espacio.

**Se ven las recetas de ejemplo y no las mías.**
Estás en otro navegador o en otro dispositivo: los datos no se comparten
entre ellos. Restaura tu respaldo con el botón ⬆.

**Las fotos ocupan mucho.**
Se reducen automáticamente a 1200 px antes de guardarse. Aun así, si
guardas muchas, revisa el espacio disponible del navegador.
