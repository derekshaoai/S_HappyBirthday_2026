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
 * 2025.12 香格里拉 → 2026.04 布达佩斯 → 2026.05 顺德
 * → 2026.09 普罗旺斯（Cassis / Aix / Cagnes）→ 2026.10 大连
 */
export const TRIPS: Trip[] = [
  {
    id: "deqin",
    city: "香格里拉",
    country: "中国",
    stop: "01",
    date: "2025.12",
    coords: [99.71, 27.83],
    title: "肚子里有一朵云",
    sub: "独克宗古城 · 第一次高原",
    memory:
      "露比第一次上高原，高反来得又急又重。波比看着露比，心里怕得不行，生怕她身体出大事。幸好医院的检查结果给露比和波比吃了一颗定心丸——胸口发闷，可能只是肚子里攒了太多气。",
    accent: "#e3a15e",
    accentSoft: "#f8e4cc",
    video: "/media/deqin/video.mp4",
    mapLabel: "香格里拉",
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
      "夜里的多瑙河很冷。船开到国会大厦前，别的情侣都在摆姿势拍照，只有露比和波比裹着同一条毯子，在金色灯光里紧紧抱着，安安静静，谁也没说话。",
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
      "露比说想吃最地道的东西，波比就开车带上露比，去找最有本地特色的餐馆和农庄。五指毛桃鸡煲那股鲜甜，到现在都忘不掉。",
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
    title: "拉练的终点是海",
    sub: "峡湾 · 第一次一起浮潜",
    memory:
      "露比和波比的旅行，像一场拉练。先一起徒步，终点是路线尽头的海湾；然后穿上那身神奇的湿衣漂在海面上，小鱼就在脚边游来游去。",
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
      "露比总能想出又有诗意、又特别有当地味道的活动。在塞尚写生过的花园里，画他画过的同一座山——换作波比一个人，大概一辈子也想不出这种事。",
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
      "这是露比和波比第二次回到 Cagnes，又挖出了这座小城的新宝藏：红土网球场。拖地、浇水的仪式感，是特别新奇的体验。",
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
    title: "在家当大王",
    sub: "日料店 · 海鲜盛宴",
    memory:
      "在大连的住处，露比和波比当起了大王：无所事事，吃了睡、睡了吃。现在想想，这才是旅行最舒服的状态。",
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

/** 真实旅行航线：香格里拉 → 布达佩斯 → 顺德 → 普罗旺斯 → 大连 */
export const ROUTE: [number, number][] = [
  [99.71, 27.83],
  [19.0402, 47.4979],
  [113.29, 22.8],
  PROVENCE.coords,
  [121.61, 38.91],
];

export const FRANCE_TRIPS = TRIPS.filter((trip) => trip.region === "provence");

export const TOTAL = TRIPS.length;
