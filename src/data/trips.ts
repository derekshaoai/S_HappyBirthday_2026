export type Trip = {
  id: string;
  city: string;
  country: string;
  stop: string;
  date: string;
  coords: [number, number];
  title: string;
  sub: string;
  memory: string;
  accent: string;
  accentSoft: string;
  video: string;
  mapLabel?: string;
  mapSide?: "left" | "right";
  mapDy?: number;
  posterTheme?: "dark";
  region?: "provence";
};

/**
 * 站点按真实旅行顺序排列：
 * 2025.12 德钦 → 2026.04 布达佩斯 → 2026.05 顺德
 * → 2026.09 普罗旺斯（Cassis / Aix / Cagnes）→ 2026.10 大连
 */
export const TRIPS: Trip[] = [
  {
    id: "deqin",
    city: "德钦",
    country: "中国",
    stop: "01",
    date: "2025.12",
    coords: [98.65, 28.45],
    title: "肚子里有一朵云",
    sub: "梅里雪山 · 第一次高原",
    memory:
      "你说要看日照金山。结果山没高反，你先高反了。晚上在医院，我们盯着那张 CT 看了很久，最后发现——你只是肚子里有太多气。",
    accent: "#e3a15e",
    accentSoft: "#f8e4cc",
    video: "/media/deqin/video.mp4",
    mapLabel: "德钦",
    mapSide: "left",
    mapDy: -20,
  },
  {
    id: "budapest",
    city: "布达佩斯",
    country: "匈牙利",
    stop: "02",
    date: "2026.04",
    coords: [19.0402, 47.4979],
    title: "多瑙河上的毯子",
    sub: "多瑙河 · 夜游船",
    memory:
      "夜里的多瑙河很冷，你把毯子分我一半。船开到国会大厦前面，整栋楼亮成金色，你说像一块会发光的蛋糕。",
    accent: "#d9a441",
    accentSoft: "#1b2440",
    video: "/media/budapest/video.mp4",
    mapLabel: "布达佩斯",
    mapSide: "right",
    mapDy: -18,
    posterTheme: "dark",
  },
  {
    id: "shunde",
    city: "顺德",
    country: "中国",
    stop: "03",
    date: "2026.05",
    coords: [113.29, 22.8],
    title: "副驾公主的终点站",
    sub: "农庄 · 五指毛桃鸡煲",
    memory:
      "你坐在副驾，墨镜比脸还大，一路指挥我开去农庄。鸡煲端上来的时候，你说这才是 passenger princess 的终点站。",
    accent: "#e08a6c",
    accentSoft: "#f8dfd4",
    video: "/media/shunde/video.mp4",
    mapLabel: "顺德",
    mapSide: "right",
    mapDy: 12,
  },
  {
    id: "cassis",
    city: "Cassis",
    country: "法国",
    stop: "05",
    date: "2026.09",
    coords: [5.54, 43.21],
    title: "海里的第一次牵手",
    sub: "峡湾 · 第一次一起潜水",
    memory:
      "你说只是下去看看小鱼，结果全程抓着我的手。没关系，下次还带你。",
    accent: "#5fa8b8",
    accentSoft: "#ddf0f2",
    video: "/media/cassis/video.mp4",
    region: "provence",
  },
  {
    id: "aix",
    city: "Aix-en-Provence",
    country: "法国",
    stop: "06",
    date: "2026.09",
    coords: [5.45, 43.53],
    title: "把山画下来",
    sub: "塞尚的山 · 水彩与酒",
    memory:
      "你画的山很像山，我画的像一团蓝色的云。酒庄老板说，抽象派也挺好。",
    accent: "#a98bb5",
    accentSoft: "#ede4f2",
    video: "/media/aix/video.mp4",
    region: "provence",
  },
  {
    id: "cagnes",
    city: "Cagnes-sur-Mer",
    country: "法国",
    stop: "04",
    date: "2026.09",
    coords: [7.15, 43.66],
    title: "红土场的收尾工作",
    sub: "红土场 · 打完球要干活",
    memory:
      "球没打几个，活干了不少。你浇水，我拖地，夕阳把红土照得像橘子粉。",
    accent: "#d97757",
    accentSoft: "#f6ded4",
    video: "/media/cagnes/video.mp4",
    region: "provence",
  },
  {
    id: "dalian",
    city: "大连",
    country: "中国",
    stop: "07",
    date: "2026.10",
    coords: [121.61, 38.91],
    title: "星星眼的日料",
    sub: "日料店 · 海胆与海肠",
    memory:
      "你说只是随便吃点，结果海胆一上来，眼睛比海胆还亮。海肠也点了，你说这才是大连的味道。",
    accent: "#e08a4a",
    accentSoft: "#1b2636",
    video: "/media/dalian/video.mp4",
    posterTheme: "dark",
    mapLabel: "大连",
    mapSide: "right",
    mapDy: -28,
  },
];

TRIPS.sort((a, b) => Number(a.stop) - Number(b.stop));

export const PROVENCE = {
  id: "provence",
  label: "普罗旺斯",
  coords: [6.05, 43.47] as [number, number],
  date: "2026.09",
};

/** 真实旅行航线：德钦 → 布达佩斯 → 顺德 → 普罗旺斯 → 大连 */
export const ROUTE: [number, number][] = [
  [98.65, 28.45],
  [19.0402, 47.4979],
  [113.29, 22.8],
  PROVENCE.coords,
  [121.61, 38.91],
];

export const FRANCE_TRIPS = TRIPS.filter((trip) => trip.region === "provence");

export const TOTAL = TRIPS.length;
