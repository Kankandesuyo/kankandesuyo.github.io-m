# 部署到 GitHub Pages 说明

## 方式一：直接上传到 GitHub 网页端

适合不熟悉 Git 命令的情况。

1. 打开 GitHub，新建一个仓库，例如：

```text
Image2Model-Studio
```

2. 不要勾选自动创建 `README.md`，因为本项目已经自带 README。

3. 将本项目根目录下的文件上传到仓库。

必须包含这些关键文件和目录：

```text
.github/workflows/deploy.yml
public/
src/
index.html
package.json
package-lock.json
vite.config.ts
tailwind.config.js
postcss.config.js
tsconfig.json
tsconfig.app.json
tsconfig.node.json
README.md
```

4. 上传后，进入仓库：

```text
Settings -> Pages
```

5. 将 `Source` 设置为：

```text
GitHub Actions
```

6. 回到仓库首页，进入：

```text
Actions
```

等待 `Deploy to GitHub Pages` 工作流运行完成。

7. 部署成功后，GitHub Pages 地址通常是：

```text
https://你的用户名.github.io/仓库名/
```

## 方式二：使用 Git 命令推送

在本项目目录运行：

```bash
git init
git branch -M main
git add .
git commit -m "Initial Image2Model Studio demo"
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

然后到 GitHub 仓库中设置：

```text
Settings -> Pages -> Source -> GitHub Actions
```

之后每次推送到 `main` 分支，GitHub Actions 都会自动构建并部署。

## 已经配置好的部署文件

项目已经包含：

```text
.github/workflows/deploy.yml
```

它会自动执行：

```bash
npm ci
npm run build
```

并把 `dist/` 部署到 GitHub Pages。

## 子路径部署说明

GitHub Pages 仓库页面一般部署在子路径下：

```text
https://username.github.io/repository-name/
```

所以 workflow 中已经设置：

```text
VITE_BASE_PATH=/${{ github.event.repository.name }}/
```

这样可以保证 CSS、JS、GLB 模型文件在 GitHub Pages 上正常加载。

## 注意事项

- 不要上传 `node_modules/`
- 不要上传本地临时日志
- 不需要上传 `dist/`，GitHub Actions 会自动生成
- 不要在前端代码中写 API Key
- 当前版本是纯静态 Demo，可以直接部署到 GitHub Pages

