# VSCode Extension Packs

VSCode 不同技术栈的扩展包合集，一次安装适合所需技术栈的所有扩展。适用于 VSCode 及 Cursor、Windsurf、Trae、CodeBuddy、Qoder、Comate 等 AI 编程工具。

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

本项目采用 pnpm monorepo 结构，配置信息统一在 `data/packs.json` 中管理。

### 环境准备

```bash
pnpm install
```

### 核心工作流

1. **修改配置**: 在 `data/packs.json` 中添加或修改扩展包及其包含的扩展 ID。
2. **同步配置**: 运行以下命令，根据 `data/packs.json` 自动更新所有 package 的 `package.json`。
   ```bash
   pnpm generate
   ```
3. **打包**:
   - 打包所有扩展包:
     ```bash
     pnpm build:all
     ```
   - 打包指定扩展包:
     ```bash
     pnpm --filter <package-name> package
     ```

### 新增扩展包

1. 在 `data/packs.json` 中添加新的配置项。
2. 运行 `pnpm generate` 自动创建 package 目录及初始文件。
3. (可选) 使用 `pnpm newpkg` (通过 `yo code`) 手动初始化更复杂的 package 结构。

## 📄 开源协议

[ISC](./LICENSE.txt)
