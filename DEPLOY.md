# 泠之屋网站 - Cloudflare Pages 部署指南

## 概述

本项目使用 Cloudflare Pages 进行部署，支持自定义域名。

## 部署步骤

### 第一步：准备构建

在本地终端执行：

```bash
cd c:\Users\Jeffrey\WorkBuddy\20260430095335\lingzhiwu
npm install
npm run build
```

构建完成后，会生成 `dist` 文件夹。

### 第二步：登录 Cloudflare Dashboard

1. 访问 https://dash.cloudflare.com
2. 登录你的 Cloudflare 账号
3. 如果没有账号，先注册一个（免费）

### 第三步：创建 Pages 项目

1. 在左侧菜单找到 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**
5. 选择 GitHub 账号，授权访问 `torin6094/lingzhiwu` 仓库

### 第四步：配置构建设置

填写以下构建设置：

| 设置项 | 值 |
|--------|-----|
| Framework preset | **None** (或者选 Create React App) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

### 第五步：环境变量设置

点击 **Environment variables**，添加：

| 变量名 | 值 |
|--------|-----|
| `WEATHER_API_KEY` | `6ad093ffa2624e139ea19a86e2e235a4` |

### 第六步：部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约2-3分钟）
3. 部署成功后会获得一个 `xxx.pages.dev` 的临时域名

### 第七步：绑定自定义域名

1. 在 Pages 项目页面，点击 **Custom domains** 标签
2. 点击 **Set up a custom domain**
3. 输入你的域名（例如：`lingzhiwu.com`）
4. 按照 Cloudflare 的指引，在你的域名 DNS 设置中添加 CNAME 记录：
   - 类型：`CNAME`
   - 名称：`@` (根域名) 或 `www`
   - 目标：你的 Pages 项目域名（如 `lingzhiwu.pages.dev`）

### 第八步：验证部署

1. 访问你的自定义域名
2. 检查天气功能是否正常工作
3. 如果天气不显示，检查浏览器控制台的错误信息

## 文件说明

- `functions/api/weather.js` - Cloudflare Worker，代理天气 API 请求
- `wrangler.toml` - Cloudflare 配置文件
- `vite.config.ts` - Vite 开发服务器代理配置（仅开发环境使用）

## 故障排除

### 天气 API 不工作

1. 检查浏览器控制台是否有 CORS 错误
2. 确认 `WEATHER_API_KEY` 环境变量已正确设置
3. 访问 `https://你的域名/api/weather` 测试 Worker 是否正常

### 构建失败

1. 确保 `node_modules` 已安装：`npm install`
2. 检查 `dist` 文件夹是否生成
3. 查看构建日志中的错误信息

### 域名解析问题

1. DNS 传播可能需要几分钟到几小时
2. 确认 CNAME 记录正确指向 Pages 域名
3. 在 Cloudflare Dashboard 检查域名状态

## 更新网站

当代码更新后：

1. 提交更改到 GitHub
2. Cloudflare Pages 会自动重新构建和部署
3. 等待几分钟后刷新网站查看更新

## 联系方式

如有问题，请检查 Cloudflare 文档或联系支持。
