# 部署指南

## 方式一：GitHub自动部署（推荐）

由于国内网络限制，建议通过以下步骤部署：

### 1. 提交代码到GitHub

```bash
# 在lingzhiwu目录下执行
git add .
git commit -m "更新关于我们页面"
git push origin main
```

### 2. Cloudflare Pages自动部署

- 项目已配置为从GitHub自动部署
- 推送代码后，Cloudflare Pages会自动构建并部署
- 访问 https://lingzhiwu.pages.dev 查看最新版本

## 方式二：手动上传（当前网络受限时使用）

### 1. 打包dist目录

已将 `lingzhiwu/dist` 目录打包为 `lingzhiwu-deploy.zip`

### 2. 上传到Cloudflare Pages

1. 登录 https://dash.cloudflare.com
2. 进入 Pages > lingzhiwu 项目
3. 点击 "Create a deployment" 或 "Upload assets"
4. 上传 dist 文件夹中的所有内容

### 3. 或使用 wrangler CLI（需要代理）

```bash
# 设置API Token后执行
npx wrangler pages deploy dist --project-name=lingzhiwu
```

## 本次更新内容

- 关于我们页面重新设计
- 添加拱形图片装饰
- 理念卡片增加详细描述
- 新增愿景使命区域
- 三张东方美学图片素材
