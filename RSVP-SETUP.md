# RSVP en vivo — conectar la hoja de invitados real

La sección de RSVP busca invitados por nombre completo o apellido de familia y
guarda su confirmación de asistencia. Tal como está, funciona con datos de
prueba en memoria (ver `src/services/sheetsService.ts` → `MOCK_GUESTS`) para
que el sitio sea demostrable sin ninguna hoja real conectada. Para conectarla
a una hoja de Google real, sigue estos pasos:

## 1. Crea la hoja de invitados

1. Crea una hoja de cálculo nueva en [Google Sheets](https://sheets.new).
2. Abre `google-apps-script/demo-guests.csv` (en este proyecto) y pega su
   contenido a partir de la celda `A1` — o usa Archivo → Importar → Subir y
   selecciona el CSV, con la opción "Reemplazar hoja actual".
3. Reemplaza los renglones de ejemplo con tu lista real de invitados,
   respetando las columnas:

   | Columna | Contenido |
   |---|---|
   | A | # (no se usa, solo referencia visual) |
   | B | Nombre |
   | C | Apellido paterno |
   | D | Apellido materno |
   | E | Familia (apellido con el que se agrupa la invitación) |
   | F | Acompañante (cupo asignado, número) |
   | G | Asistirá (se llena solo — "Sí" / "No") |
   | H | Niños (cupo asignado, número) |

## 2. Despliega el backend (Google Apps Script)

1. En la misma hoja: **Extensiones → Apps Script**.
2. Borra el contenido del `Code.gs` que abre por defecto y pega ahí el
   contenido completo de `google-apps-script/Code.gs` (en este proyecto).
3. Si tu pestaña no se llama `Hoja1`, ajusta la constante `SHEET_NAME` al
   inicio del archivo.
4. **Implementar → Nueva implementación → Tipo: App web**.
   - Ejecutar como: **Yo** (tu cuenta).
   - Quién tiene acceso: **Cualquier usuario**.
5. Autoriza los permisos cuando Google lo solicite.
6. Copia la **URL de implementación** que te entrega al final — la necesitas
   en el siguiente paso.

## 3. Conecta el sitio a la hoja

1. En la raíz del proyecto, crea un archivo `.env` (puedes copiar
   `.env.example` como punto de partida):

   ```bash
   cp .env.example .env
   ```

2. Pega tu URL de implementación:

   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```

3. `.env` ya está en `.gitignore` — no se sube al repositorio. Confírmalo con
   `git check-ignore .env` (debe imprimir `.env`) si quieres verificarlo tú
   mismo.

## 4. Reconstruye el sitio

```bash
npm run build
```

Vite solo lee variables `VITE_*` al momento de construir/arrancar, así que
cualquier cambio a `.env` requiere reiniciar `npm run dev` o volver a correr
`npm run build`.

## Cómo saber si quedó bien conectado

- Sin `.env` (o con la URL de ejemplo sin modificar), el buscador usa los
  invitados de prueba en memoria — verás una advertencia en la consola del
  navegador (`[sheetsService] VITE_GOOGLE_SCRIPT_URL no está configurado...`)
  y las confirmaciones no persisten al recargar la página.
- Con la URL real configurada, busca a alguien de tu hoja por su nombre
  completo o el apellido de su familia, confirma su asistencia, y revisa que
  la columna **Asistirá** en la hoja se haya actualizado.

## Notas de seguridad

- El script nunca crea filas nuevas — solo busca y actualiza el estado de
  asistencia de invitados que ya existen en la hoja.
- La búsqueda exige nombre completo (3+ palabras reales) o apellido de
  familia completo (2+ palabras reales) para evitar que alguien exponga otras
  familias escribiendo solo un apellido común.
- El acceso "Cualquier usuario" en el despliegue es necesario para que el
  sitio (sin backend propio) pueda llamar al script desde el navegador de
  cualquier invitado — la hoja original de Google Sheets no se comparte
  públicamente, solo este endpoint de búsqueda/actualización acotado.
