# S_HappyBirthday_2026 · 露比的生日护照

一个用 Vite + React + TypeScript 做的生日网页。

**流程**：封面 → 世界地图 → 点城市 → 播放视频 → 自动盖章 → 集齐 7 枚 → 打开终章。

- GitHub 仓库：`https://github.com/derekshaoai/S_HappyBirthday_2026`
- 仓库是 **public**，可以直接 clone 或下载 ZIP，不需要邀请或登录。
- 网页不需要后端、数据库或 API key；视频、音乐、地图数据都在仓库里。

---

## 在另一台电脑上打开

### 你需要

1. **Node.js 22 LTS**（Vite 8 需要 Node 20.19+ / 22.12+，推荐直接用 22 LTS）
2. **Git**（也可以不装，直接用 GitHub 的 Download ZIP）
3. Chrome / Safari / Edge 任意一个现代浏览器

### 1. 安装 Node.js

打开 https://nodejs.org/ ，下载并安装 **LTS 22**。

安装完成后，在终端里检查：

```bash
node -v
npm -v
```

`node -v` 应该是 `v22.x.x`。

### 2. 把代码拉到电脑上

```bash
git clone https://github.com/derekshaoai/S_HappyBirthday_2026.git
cd S_HappyBirthday_2026
```

仓库是 public，clone 不需要登录，也不会提示输入密码。

如果这台电脑没有安装 Git，也可以：

1. 打开 https://github.com/derekshaoai/S_HappyBirthday_2026
2. 点绿色的 **Code** 按钮
3. 选 **Download ZIP**
4. 解压后进入文件夹，继续下面的步骤

### 3. 安装依赖

```bash
npm install
```

### 4. 启动网页

```bash
npm run dev
```

终端会显示类似：

```text
Local: http://localhost:5173/
```

在浏览器里打开 **http://localhost:5173** 即可。

> 第一次点击页面或翻开护照后，背景音乐才会开始（浏览器自动播放限制）。
> 右下角 ♪ 按钮可以静音/恢复。

### 5. 只想看生产版本（可选）

```bash
npm run build
npm run preview
```

然后打开终端显示的地址，通常是 **http://localhost:4173**。

> 不要直接用 `file://` 打开 `dist/index.html`，这样资源路径会失效。请用 `npm run preview` 或任意静态服务器。

### 6. 不想在电脑上装 Node（可选）

可以把仓库部署到 Vercel / Netlify：

1. 在 Vercel / Netlify 里选择 **Import Git Repository**
2. 选择这个 public 仓库
3. Build command：`npm run build`
4. Output directory：`dist`
5. 部署完成后打开生成的网址

---

## 常见问题

### `node -v` 不是 22

去 https://nodejs.org/ 安装 Node 22 LTS，然后重新打开终端。

### `npm install` 报错

先确认 Node 版本正确，再试：

```bash
npm cache clean --force
npm install
```

如果仍然失败，把完整报错发出来。

### 端口被占用

```bash
npm run dev -- --port 5174
```

然后打开 `http://localhost:5174`。

### 页面空白

- 确认地址是 `http://localhost:5173`，不是 `file://...`
- 看终端里有没有报错
- 确认 `npm install` 已经完成

### 没有声音

- 先点击页面或“翻开护照”
- 检查右下角 ♪ 按钮是否处于静音状态
- 检查系统音量
- 音乐会在页面切换时继续播放，不会重新开始

### 视频不播放

视频放在：

```text
public/media/<城市>/video.mp4
```

当前仓库里已有的视频会直接播放；没有视频的城市会显示占位页，点“预览：先盖章”可以先跑流程。

---

## 现在有什么

- 封面 / 世界地图 / 旅行护照面板
- 封面护照可直接点击；鼠标移到护照上，露比会从右上角探头
- 7 个停留点，按真实旅行顺序：
  - 香格里拉（2025.12）
  - 布达佩斯（2026.04）
  - 顺德（2026.05）
  - Cagnes-sur-Mer / Cassis / Aix-en-Provence（2026.09）
  - 大连（2026.10）
- 普罗旺斯三城在地图上聚合为一个点，点开后再选城市
- 每个城市有独立的地方特色插画
- 视频弹窗；视频结束自动盖章；进度存 `localStorage`
- 终章页面：人物、信、彩纸
- 单曲循环 BGM、静音按钮、视频播放时自动压低
- 电脑优先，同时做了手机/窄屏的降级布局

---

## 项目结构

```text
S_HappyBirthday_2026/
├─ public/
│  ├─ data/countries-110m.json   # Natural Earth 世界地图数据
│  ├─ media/
│  │  ├─ characters/             # 网站小形象（WebP）
│  │  ├─ deqin/video.mp4
│  │  ├─ shunde/video.mp4
│  │  ├─ dalian/video.mp4
│  │  ├─ budapest/video.mp4
│  │  ├─ cassis/video.mp4
│  │  ├─ aix/video.mp4
│  │  └─ cagnes/video.mp4
│  └─ music/music_lce.mp3
├─ src/
│  ├─ components/
│  │  ├─ Cover.tsx               # 封面
│  │  ├─ WorldMap.tsx            # d3-geo 世界地图 + 城市 pin
│  │  ├─ MapView.tsx             # 地图页布局
│  │  ├─ MapGuide.tsx            # 波比指向 + “下一站”气泡
│  │  ├─ Character.tsx           # 透明小形象，加载失败自动隐藏
│  │  ├─ MusicPlayer.tsx         # BGM 播放/静音
│  │  ├─ PassportPanel.tsx       # 右侧护照/进度
│  │  ├─ TripDetail.tsx          # 城市详情弹窗
│  │  ├─ VideoModal.tsx          # 视频弹窗 + 盖章
│  │  ├─ ProvencePicker.tsx      # 普罗旺斯三城选择
│  │  ├─ PosterArt.tsx           # 每个城市的地方插画
│  │  └─ Finale.tsx              # 终章
│  ├─ data/trips.ts              # 7 个城市的全部文案和坐标
│  ├─ hooks/useProgress.ts       # localStorage 进度
│  ├─ lib/music.ts               # BGM 控制器
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ vite.config.ts
├─ .gitignore
└─ README.md
```

> 这个仓库包含 `.gitignore`（排除 `node_modules/`、`dist/`、`.preview/`、`.DS_Store`、`prompts/` 等），但没有上传 `prompts/` 文件夹本身。

---

## 素材

- 视频：`public/media/<id>/video.mp4`
- 音乐：`public/music/music_lce.mp3`
- 小形象：`public/media/characters/*.webp`
- 地图数据：`public/data/countries-110m.json`，来自 Natural Earth，不需要 API key

---

## 改内容

- **城市名、日期、坐标、回忆文案、视频路径**：`src/data/trips.ts`
- **终章的信**：`src/components/Finale.tsx` 里的 `<div className="letter">`
- **封面标题/文案**：`src/components/Cover.tsx`
- **颜色、字体、圆角**：`src/styles.css` 顶部的 `:root`
- **地图上的标签**：`trips.ts` 里的 `mapLabel`
- **BGM 音量/压低比例**：`src/lib/music.ts`

改完保存，`npm run dev` 会自动热更新。

---

## 进度

进度存在浏览器的 `localStorage`，键名：

```text
sbirthday.progress.v1
```

页面底部的「重新开始」会清空。

---

## 部署

Vercel / Netlify / Cloudflare Pages 都可以：

- Build command：`npm run build`
- Output directory：`dist`

视频和音乐是静态文件，跟着站点一起部署。如果以后素材很多，再考虑 Cloudflare R2 / Bunny CDN。

---

## 说明

- 仓库是 public，方便在任何电脑上直接 clone 或下载；但它仍然是私人的生日礼物项目，请不要公开传播或商用。
- 角色形象来自《小企鹅宝露露》同人创作；请保留在私人范围内。
- 仓库没有 `prompts/`；提示词素材只在 owner 本地保留。
