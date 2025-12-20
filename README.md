# VSCode Extension Packs

VSCode 多技术栈扩展包合集，实现跨设备的插件配置统一。深度适配 VSCode 及 Cursor、Trae、Windsurf、Qoder、CodeBuddy、Comate 等主流 AI 编程工具。

## Why me ?

当你在多个设备上都使用 VSCode 进行开发，或者同时使用多个基于 VSCode 的 AI 编程工具（如 Cursor、Trae、Windsurf、Qoder、CodeBuddy、Comate），希望在不同设备/IDE上保持一致的插件配置时，安装一个扩展包就可以达到目的。通过此项目，你可以基于自己的喜好，修改 `data/packs.json` 文件，自定义你所需的插件列表，然后一键打包、快速安装。

## 📦 可用扩展包

- **Frontend Stack**: 包含 React, Svelte, Tailwind, ESlint, Prettier 等前端开发常用扩展。
- **Go Stack**: 包含 Go 语言支持、Gomodel Explorer、Proto3 等 Go 开发常用扩展。

## 🚀 快速开始

### 安装扩展包

1. **Clone 本仓库**:
   ```bash
   git clone https://github.com/lexmin0412/vscode-extension-packs.git
   ```

2. **安装 .vsix 文件**:
   - 打开 VSCode / Cursor / Trae 等工具。
   - 进入扩展面板 (`Ctrl+Shift+X`)。
   - 点击右上角的 `...` 更多操作按钮。
   - 选择 `Install from VSIX...` (从 VSIX 安装...)。
   - 选择本仓库 `packages/<pack-name>/` 目录下的 `.vsix` 文件进行安装。

## 🛠️ 开发指南

本项目采用 **配置驱动 (Configuration-driven)** 的 pnpm monorepo 结构，子包的生成完全自动化。

### 环境准备

```bash
pnpm install
```

### 核心工作流

1. **修改配置**: 在 `data/packs.json` 中添加或修改扩展包及其包含的扩展 ID。
2. **自动化生成**: 运行以下命令，系统将根据 `scripts/templates` 中的 Handlebars 模板自动创建/更新子包的所有核心文件。
   ```bash
   pnpm generate
   ```
   该命令会自动同步以下文件到每个子包：
   - `package.json` (动态渲染)
   - `README.md` (动态渲染)
   - `.vscode/settings.json` (固定模板)
   - `.gitignore` (固定模板)
   - `LICENSE.txt` (固定模板)

3. **打包**:
   - 打包所有扩展包:
     ```bash
     pnpm build:all
     ```
   - 打包指定扩展包:
     ```bash
     pnpm --filter <package-name> package
     ```

### 模板自定义

如果你需要调整子包的默认生成内容，可以修改 `scripts/templates` 目录下的文件：
- `package.json.hbs`: 扩展包元数据模板。
- `README.md.hbs`: 扩展包说明文档模板。
- `static/`: 包含所有需要原样同步到子包的静态配置文件。

## 📄 开源协议

[MIT](./LICENSE.txt)
