# Plan 2027 · sitio estático en GitHub Pages

Página personal de Vicente con su plan sept 2026 → ene 2027 (GMAT, TOEFL, aplicaciones MBA y Ultra Paine).
Sitio: https://vicentemelin.github.io/nilem/ — despliega **automáticamente** desde `main` (1–2 min tras cada push).

## Archivos
- `index.html` — TODO el sitio: CSS, HTML y JS en un solo archivo. Datos del plan en la constante `PLAN` dentro del `<script>`.
- `sw.js` — service worker (offline). Si lo modificás, subí `plan2027-v1` → `v2` o los teléfonos siguen con la caché vieja. Cambiar `index.html` NO requiere tocar la versión.
- `manifest.json`, `icons/` — PWA (pantalla de inicio en iPhone). Íconos generados con PIL; no editar a mano.
- `.nojekyll` — necesario, no borrar.

## Modelo de datos (`PLAN`)
- Semana: `{f:"f1"…"f4", sem, foco, dias:[…]}`. Hito: `{f, tipo:"hito", fecha, nombre, desc}`.
- Día: `["YYYY-MM-DD", tareas, libre?, esDomingo?]`. Si `tareas` está vacío se muestra el texto `libre` en gris, sin checkbox.
- Tarea: `[texto, duración, ent?]`. Duración `"—"` no se muestra.
  - `ent` (3er campo) fuerza el entregable. **Usar siempre `"deporte"` para entrenamientos/Ultra Paine** — la inferencia por texto no los detecta.
  - Sin `ent`, `entDe(texto)` infiere: IESE / ESADE / IE / toefl / cartas / cv / gmat / otros. Revisá el resultado si el texto es ambiguo.
- Filtros: chips de tema (MBA = todo lo que no es deporte, Deporte) + chips por entregable. Se generan solos desde `ENTS`/`TEMAS`; no hay nada que agregar al HTML.
- Calendario: color por día según prioridad `hito > mock > app > gmat > deporte > libre`.
- Semanas: son `<details>`; las terminadas (último día < hoy) arrancan colapsadas mostrando solo título + avance `hechas/total`.
- Para ver la página como si fuera otro día: `index.html?hoy=2026-12-23`. Solo para probar; no compartir ese link.

## Flujo de trabajo
1. Editar → verificar localmente (`python3 -m http.server`) → **mostrar el diff a Vicente y esperar aprobación** → commit → push a `main`.
2. Un push a `main` publica en internet de inmediato. No pushear sin aprobación explícita.
3. Antes de editar, `git pull`: Vicente también hace cambios desde Claude Code en el teléfono.
4. Mensajes de commit y textos del sitio en español (Chile). Mantener el estilo: comentarios breves, sin frameworks, sin dependencias.
