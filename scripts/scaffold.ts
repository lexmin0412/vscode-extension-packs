import * as fs from "fs";
import * as path from "path";
import Handlebars from "handlebars";
import { IPackInfo } from "../types";

const toTitleCase = (str: string) => str.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

const read = (p: string) => fs.readFileSync(p, "utf-8");
const write = (p: string, c: string) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, c);
};

Handlebars.registerHelper("titleCase", (s: string) => toTitleCase(s));

const render = (templatePath: string, context: any) => {
  const tpl = Handlebars.compile(read(templatePath));
  return tpl(context);
};

const templatesRoot = path.join(__dirname, "templates");

const writePackageJson = (pack: IPackInfo) => {
  const packShortName = pack.name.replace("-stack", "");
  const packRoot = path.join(__dirname, "../packages", pack.name);
  const pkgJsonPath = path.join(packRoot, "package.json");
  const content = render(path.join(templatesRoot, "package.json.hbs"), { pack, packShortName });
  write(pkgJsonPath, content.endsWith("\n") ? content : content + "\n");
};

const writeReadme = (pack: IPackInfo) => {
  const packShortName = pack.name.replace("-stack", "");
  const packRoot = path.join(__dirname, "../packages", pack.name);
  const readmePath = path.join(packRoot, "README.md");
  const content = render(path.join(templatesRoot, "README.md.hbs"), { pack, packShortName });
  write(readmePath, content);
};

const copyStaticTemplates = (packName: string) => {
  const packRoot = path.join(__dirname, "../packages", packName);
  const staticRoot = path.join(templatesRoot, "static");
  const files = [
    { from: path.join(staticRoot, ".gitignore"), to: path.join(packRoot, ".gitignore") },
    { from: path.join(staticRoot, "LICENSE.txt"), to: path.join(packRoot, "LICENSE.txt") },
    { from: path.join(staticRoot, ".vscode/launch.json"), to: path.join(packRoot, ".vscode/launch.json") },
  ];
  files.forEach(({ from, to }) => write(to, read(from)));
};

const ensurePackRoot = (packName: string) => {
  const packRoot = path.join(__dirname, "../packages", packName);
  fs.mkdirSync(packRoot, { recursive: true });
};

const syncAll = () => {
  const packsPath = path.join(__dirname, "../data/packs.json");
  const data = JSON.parse(read(packsPath)) as { packs: IPackInfo[] };
  data.packs.forEach((pack) => {
    ensurePackRoot(pack.name);
    writePackageJson({ ...pack, version: pack.version || "0.0.1" });
    writeReadme(pack);
    copyStaticTemplates(pack.name);
    const packRoot = path.join(__dirname, "../packages", pack.name);
    console.log(`Updated ${path.join(packRoot, "package.json")}`);
    console.log(`Updated ${path.join(packRoot, "README.md")}`);
  });
};

if (require.main === module) {
  syncAll();
}
