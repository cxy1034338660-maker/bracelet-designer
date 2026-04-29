# Bead Bracelet Designer

React + Vite 可部署版本。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。

## 部署到 Vercel

1. 将整个项目上传到 GitHub。
2. 打开 Vercel，点击 **Add New Project**。
3. 选择此仓库。
4. Framework 选择 **Vite**。
5. Build Command：`npm run build`
6. Output Directory：`dist`
7. 点击 Deploy。

## 部署到 Netlify

1. 将整个项目上传到 GitHub。
2. 打开 Netlify，点击 **Add new site**。
3. 选择 GitHub 仓库。
4. Build Command：`npm run build`
5. Publish directory：`dist`
6. 点击 Deploy。

## 数据存储

保存作品、灵感图片使用浏览器 `localStorage`，无需服务器。

## 素材路径

图片素材放在：

```text
public/assets/
```

当前吊坠素材：

```text
public/assets/hexagram-pendant.png
```
