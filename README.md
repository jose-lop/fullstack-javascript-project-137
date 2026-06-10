# RSS Aggregator

[![hexlet-check](https://github.com/jose-lop/fullstack-javascript-project-137/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/jose-lop/fullstack-javascript-project-137/actions/workflows/hexlet-check.yml)

Aplicación web para agregar y leer feeds RSS. Permite suscribirse a fuentes RSS, visualizar publicaciones, marcar artículos como leídos y recibir actualizaciones automáticas de nuevos posts.

## Características

- Agregar feeds RSS mediante URL.
- Validación de formularios con Yup.
- Prevención de feeds duplicados.
- Descarga y procesamiento de RSS mediante Axios.
- Actualización automática de publicaciones cada 5 segundos.
- Vista previa de publicaciones mediante ventana modal.
- Marcado de publicaciones leídas.
- Internacionalización con i18next.
- Gestión reactiva del estado con Valtio.

## Tecnologías utilizadas

- JavaScript (ES Modules)
- Vite
- Bootstrap 5
- Axios
- Yup
- i18next
- Valtio
- ESLint
- GitHub Actions

## Instalación

```bash
git clone https://github.com/jose-lop/fullstack-javascript-project-137.git
cd fullstack-javascript-project-137
npm install
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
