import * as fs from "fs";
import * as path from "path";
import { IPackInfo } from "../types";

/**
 * 将输入的字符串转换为标题大小写格式
 * @param str 输入的字符串，例如 "frontend-stack"
 * @returns 转换后的标题大小写字符串，例如 "Frontend Stack"
 */
const toTitleCase = (str: string) => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};

/**
 * 写入 package.json 文件
 */
export const writePackageJson = (pack: IPackInfo) => {
	const packName = pack.name;
	const packShortName = packName.replace("-stack", "");
	const packRoot = path.join(__dirname, "../packages", packName);
	const pkgJsonPath = path.join(packRoot, "package.json");

	// 判断如果没有目录则新建
	if (!fs.existsSync(packRoot)) {
		fs.mkdirSync(packRoot, { recursive: true });
	}

	const pkgJson = {
		name: pack.name,
		displayName: toTitleCase(pack.name),
		description: `All extensions you need for ${packShortName} development`,
		version: pack.version || "0.0.1",
		engines: {
			vscode: "^1.80.0",
		},
		scripts: {
			package: "vsce package",
		},
		categories: ["Extension Packs"],
		repository: {
			type: "git",
			url: "https://github.com/lexmin0412/vscode-extension-packs.git",
			directory: `packages/${packName}`,
		},
		publisher: "lexmin0412",
		extensionPack: pack.extensions,
	};

	fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
	console.log(`Updated ${pkgJsonPath}`);
};

/**
 * 写入 README.md 文件
 */
export const writeReadme = (pack: IPackInfo) => {
	const packName = pack.name;
	const packShortName = packName.replace("-stack", "");
	const packRoot = path.join(__dirname, "../packages", packName);
	const readmePath = path.join(packRoot, "README.md");

	const readmeContent = `# ${toTitleCase(pack.name)}

All extensions you need for ${packShortName} development.

## 📦 Included Extensions

${pack.extensions.map((ext) => `- [${ext}](https://marketplace.visualstudio.com/items?itemName=${ext})`).join("\n")}

## 🚀 Installation

1. Open VSCode / Cursor / Trae.
2. Go to the Extensions view (\`Ctrl+Shift+X\`).
3. Click the \`...\` more actions button.
4. Select \`Install from VSIX...\`.
5. Select the \`.vsix\` file in this directory.

## 📄 License

This project is licensed under the [ISC License](./LICENSE.txt).
`;
	fs.writeFileSync(readmePath, readmeContent);
	console.log(`Updated ${readmePath}`);
};


/**
 * 从 data/packs.json 读取并更新所有包
 */
const syncAllPacks = () => {
	const packsPath = path.join(__dirname, "../data/packs.json");
	if (!fs.existsSync(packsPath)) {
		console.error("data/packs.json not found");
		return;
	}

	const packsData = JSON.parse(fs.readFileSync(packsPath, "utf-8"));
	const packs: IPackInfo[] = packsData.packs;

	packs.forEach((pack) => {
		writePackageJson(pack);
		writeReadme(pack);
	});
};

// 如果是直接运行此脚本
if (require.main === module) {
	syncAllPacks();
}
