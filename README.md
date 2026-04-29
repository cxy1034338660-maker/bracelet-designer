# Bead Bracelet Designer

React + Vite 可部署版本。

## 本地运行

```bash
npm ci
npm run dev
```

## 构建

```bash
npm run build
```

构建输出目录：`dist`

## GitHub Pages 部署

1. 解压 zip 并上传全部文件到 GitHub 仓库根目录。
2. 到 Settings → Pages，将 Source 设置为 **GitHub Actions**。
3. 推送到 `main` 分支后会自动部署。

## 关键修复

- `vite.config.js` 使用 `base: './'`，避免 GitHub Pages 子路径导致白屏。
- `public/.nojekyll` 已添加。
- 图片路径使用 `import.meta.env.BASE_URL`，部署路径变化也能正常加载。
