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
	const packName = pack.name
	const packShortName = packName.replace("-stack", "")
	const packRoot = path.join(__dirname, "../packages", packName)
	const pkgJsonPath = path.join(packRoot, "package.json")
	// 判断如果没有文件则新建
	if (!fs.existsSync(packRoot)) {
		fs.mkdirSync(packRoot);
	}
	if (!fs.existsSync(pkgJsonPath)) {
		fs.writeFileSync(pkgJsonPath, "{}");
	}
	fs.writeFileSync(
		pkgJsonPath,
		`
{
  "name": "${pack.name}",
  "displayName": "${toTitleCase(pack.name)}",
  "description": "All extensions you need for ${packShortName} development",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.80.0"
  },
  "scripts": {
    "package": "vsce package"
  },
  "categories": [
    "Extension Packs"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/lexmin0412/vscode-extension-packs.git",
    "directory": "packages/${packName}"
  },
  "publisher": "lexmin0412",
  "extensionPack": [
		${pack.extensions.map((ext) => `"${ext}"`).join(",\n\t\t")}
  ]
}`
	);
};


// writePackageJson({
// 	name: "backend-stack",
// 	version: "0.0.2",
// 	extensions: [
// 		"eamodio.gitlens",
// 		"mikestead.dotenv",
// 		"ms-azuretools.vscode-docker",
// 		"ritwickdey.liveserver",
// 		"skyride.vscode-chester-atom",
// 		"editorconfig.editorconfig",
// 		"esbenp.prettier-vscode",
// 		"dbaeumer.vscode-eslint",
// 		"bradlc.vscode-tailwindcss",
// 		"prisma.prisma",
// 		"unifiedjs.vscode-mdx",
// 		"foxundermoon.shell-format",
// 		"svelte.svelte-vscode"
// 	]
// })