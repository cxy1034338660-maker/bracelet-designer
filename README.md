# Bead Bracelet Designer

标准 React + Vite 可部署项目。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

构建输出目录：`dist`

## Vercel 设置

- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` 已配置：

```json
{
  "framework": "vite",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## 项目结构

```text
package.json
vite.config.js
vercel.json
index.html
src/main.jsx
src/App.jsx
src/styles.css
public/assets/
```

## 数据保存

作品与灵感上传使用浏览器 `localStorage` 保存。
