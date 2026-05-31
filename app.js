const STORAGE_KEY = "plant-life-journal-v3";
const MS_DAY = 86400000;
const SHENZHEN = { latitude: 22.5431, longitude: 114.0579 };
const CARE_SETTINGS = {
  arrivalDate: "2026-05-31",
  reminderTime: "08:00",
};

const plantProfiles = [
  {
    id: "calathea",
    name: "青苹果竹芋",
    latin: "Goeppertia orbifolia",
    image: "./assets/calathea-orbifolia.svg",
    color: "#6fa55a",
    waterEvery: 2,
    feedEvery: 21,
    repotAfter: 30,
    sun: "明亮散射光",
    water: "2 天检查",
    temp: "18-32°C",
    soil: "保湿透气泥炭土",
    description:
      "叶片圆润、银绿色条纹明显，适合做阳台的清爽叶景。它喜欢稳定湿度和散射光，高温天要避开直晒。",
    badges: [
      ["猫咪安全", "safe"],
      ["喜湿润", "info"],
      ["忌暴晒", "warn"],
    ],
    repot: "到货缓苗 3-4 周后观察根系，根满盆再换大一号盆；夏季移盆后保持阴凉通风。",
    tips: ["用过滤水或晾过的水更稳", "叶缘焦枯多半是干燥或强光", "盆土微潮但不要积水"],
  },
  {
    id: "star-jasmine",
    name: "白色风车茉莉",
    latin: "Trachelospermum jasminoides",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Trachelospermum_jasminoides_flower_-_20080828-01.jpg",
    color: "#9180bd",
    waterEvery: 2,
    feedEvery: 14,
    repotAfter: 21,
    sun: "全日照或半阴",
    water: "2-3 天/次",
    temp: "15-38°C",
    soil: "花卉土 + 珍珠岩",
    description:
      "常绿攀援植物，白色风车形小花，香气清甜。适合养成法式阳台的香气花墙，也能和铁艺爬架搭配。",
    badges: [
      ["猫咪安全", "safe"],
      ["香气浓郁", "info"],
      ["耐热耐阴", "neutral"],
    ],
    repot: "到货缓苗 2-4 周后观察根系，根满盆再换 25-30cm 盆，并同步安装铁艺爬架。",
    tips: ["搭架牵引，花期前补磷钾肥", "光照不足也能长，但花量会减少", "保持通风，避免盆土长期潮湿"],
  },
  {
    id: "dendrobium",
    name: "黄金羚羊泼墨石斛",
    latin: "Dendrobium sp.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dendrobium%20nobile%20-%20flower%20view%2001.jpg",
    color: "#8f4ea1",
    waterEvery: 3,
    feedEvery: 21,
    repotAfter: 60,
    sun: "明亮散射光",
    water: "2-3 天检查",
    temp: "18-32°C",
    soil: "水苔或树皮",
    description:
      "观赏石斛兰，花色带泼墨感，株型精致。它不是普通土培植物，根系需要透气，热天要遮午后直射。",
    badges: [
      ["猫咪安全", "safe"],
      ["忌强直射", "warn"],
      ["兰花介质", "neutral"],
    ],
    repot: "花期中不要移盆。等花后或秋末换介质，新盆只比根团大 2cm。",
    tips: ["植料接近干再浇透", "35°C 以上加遮阳或移到室内亮处", "兰花肥半浓度，薄肥勤施"],
  },
  {
    id: "lemon",
    name: "台湾香水柠檬",
    latin: "Citrus x limon",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Citrus%20%283040798490%29.jpg",
    color: "#d39c2f",
    waterEvery: 3,
    feedEvery: 30,
    repotAfter: 21,
    sun: "全日照 6h+",
    water: "2-3 天检查",
    temp: "15-38°C",
    soil: "腐叶土 + 珍珠岩",
    description:
      "花香、叶香和果香都明显的阳台小果树。先养树势再留果，盆栽要排水好、光照足。",
    badges: [
      ["猫咪需隔离", "warn"],
      ["可结果", "safe"],
      ["喜光耐热", "info"],
    ],
    repot: "到货缓苗 2-3 周后可换 30-35cm 盆，盆底铺陶粒，避免积水。",
    tips: ["每月检查叶背介壳虫", "小苗开花太多时少留果", "果皮精油对猫不友好，放高处"],
  },
  {
    id: "mint",
    name: "薄荷",
    latin: "Mentha",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lamiaceae%20Mentha%20spicata%201.jpg",
    color: "#46a681",
    waterEvery: 1,
    feedEvery: 21,
    repotAfter: 10,
    sun: "上午光 + 下午阴",
    water: "每天检查",
    temp: "适应性强",
    soil: "保湿花卉土",
    description:
      "生命力强，适合做日常采摘和记录。必须单独一盆，根系扩张快，高温天很容易缺水。",
    badges: [
      ["少量接触可控", "safe"],
      ["可食用", "safe"],
      ["蔓延快", "warn"],
    ],
    repot: "到货 1-2 周后换 18-20cm 宽盆，单独种植，可顺手扦插备用苗。",
    tips: ["勤摘心，越摘越密", "开花前剪掉花穗", "大量摄入仍可能让猫肠胃不适"],
  },
];

const actionTypes = ["浇水", "施肥", "修剪", "移盆", "观察检查", "扦插繁殖", "病虫害处理", "调整位置"];
const dailyTips = [
  "热天早上浇水，避开中午高温时段，植物更容易吸收。",
  "记录一次黄叶、花苞或新芽，比凭感觉养花可靠很多。",
  "施肥当天把盆土和肥料放到猫够不到的位置。",
  "风车茉莉负责阳台香气，竹芋和石斛负责精致层次。",
];

const guides = [
  {
    title: "浇水的正确方式",
    body: "手指插入土壤约 2cm，干了再浇。浇水要浇透，直到盆底出水，再倒掉托盘积水。黄金羚羊泼墨石斛看植料，不看普通土表。",
  },
  {
    title: "高温应对策略",
    body: "30°C 以上开启热天模式，薄荷、青苹果竹芋和风车茉莉更频繁检查。35°C 以上时，石斛、竹芋与薄荷避开午后直射，清晨是最佳养护时间。",
  },
  {
    title: "移盆原则",
    body: "缓苗后再动盆，只大一号，不一步到超大盆。移盆后阴凉通风 3-5 天，1 个月内不要急着施肥。",
  },
  {
    title: "猫咪安全",
    body: "青苹果竹芋、风车茉莉和石斛相对适合养猫家庭；柠檬仍建议隔离，薄荷不要让猫大量啃食。",
  },
];

let state = loadState();
let activeView = "today";
let visibleMonth = new Date();
let selectedDate = toISODate(new Date());
let modalPlants = [];
let modalAction = "浇水";

const els = {
  dateLine: document.querySelector("#dateLine"),
  greetingTitle: document.querySelector("#greetingTitle"),
  todayTitle: document.querySelector("#todayTitle"),
  todayCopy: document.querySelector("#todayCopy"),
  dueCount: document.querySelector("#dueCount"),
  temperatureText: document.querySelector("#temperatureText"),
  humidityText: document.querySelector("#humidityText"),
  airText: document.querySelector("#airText"),
  dailyTip: document.querySelector("#dailyTip"),
  taskList: document.querySelector("#taskList"),
  plantList: document.querySelector("#plantList"),
  calendarGrid: document.querySelector("#calendarGrid"),
  monthLabel: document.querySelector("#monthLabel"),
  statsMonthLabel: document.querySelector("#statsMonthLabel"),
  monthStats: document.querySelector("#monthStats"),
  selectedDateLabel: document.querySelector("#selectedDateLabel"),
  selectedDateSub: document.querySelector("#selectedDateSub"),
  selectedPlan: document.querySelector("#selectedPlan"),
  logList: document.querySelector("#logList"),
  guideList: document.querySelector("#guideList"),
  heatMode: document.querySelector("#heatMode"),
  arrivalDateDisplay: document.querySelector("#arrivalDateDisplay"),
  reminderTimeDisplay: document.querySelector("#reminderTimeDisplay"),
  notifyBtn: document.querySelector("#notifyBtn"),
  completeAllBtn: document.querySelector("#completeAllBtn"),
  prevMonthBtn: document.querySelector("#prevMonthBtn"),
  nextMonthBtn: document.querySelector("#nextMonthBtn"),
  openLogBtn: document.querySelector("#openLogBtn"),
  logModal: document.querySelector("#logModal"),
  plantChips: document.querySelector("#plantChips"),
  actionChips: document.querySelector("#actionChips"),
  logNote: document.querySelector("#logNote"),
  closeLogBtn: document.querySelector("#closeLogBtn"),
  saveLogBtn: document.querySelector("#saveLogBtn"),
  resetBtn: document.querySelector("#resetBtn"),
};

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

els.completeAllBtn.addEventListener("click", () => {
  const tasks = getDueTasks();
  tasks.forEach((task) => markDone(task.plantId, task.type));
  toast(tasks.length ? "今天的任务已记录。" : "今天没有待办任务。");
});

els.prevMonthBtn.addEventListener("click", () => changeMonth(-1));
els.nextMonthBtn.addEventListener("click", () => changeMonth(1));
els.openLogBtn.addEventListener("click", openModal);
els.closeLogBtn.addEventListener("click", closeModal);
els.saveLogBtn.addEventListener("click", saveLog);
els.logModal.addEventListener("click", (event) => {
  if (event.target === els.logModal) closeModal();
});

els.heatMode.addEventListener("change", () => {
  state.heatMode = els.heatMode.checked;
  persist();
  render();
});

els.notifyBtn.addEventListener("click", requestNotification);
els.resetBtn.addEventListener("click", resetData);

document.addEventListener("click", (event) => {
  const done = event.target.closest("[data-done]");
  if (done) {
    markDone(done.dataset.plantId, done.dataset.type);
    toast(doneMessage(done.dataset.type));
    return;
  }

  const skip = event.target.closest("[data-skip]");
  if (skip) {
    skipTask(skip.dataset.plantId, skip.dataset.type);
    toast("已跳过今天的提醒。");
    return;
  }

  const postpone = event.target.closest("[data-postpone]");
  if (postpone) {
    postponeTask(postpone.dataset.plantId, postpone.dataset.type);
    toast("已推迟到明天。");
    return;
  }

  const day = event.target.closest("[data-day]");
  if (day) {
    selectedDate = day.dataset.day;
    renderCalendar();
    renderSelectedDay();
    return;
  }

  const del = event.target.closest("[data-delete-log]");
  if (del) {
    deleteLog(del.dataset.deleteLog);
  }
});

document.addEventListener("change", (event) => {
  const input = event.target.closest("[data-field]");
  if (!input) return;
  const plant = state.plants.find((item) => item.id === input.dataset.plantId);
  if (!plant) return;
  const field = input.dataset.field;
  if (field === "repotAfter") {
    plant[field] = clamp(Number(input.value), 1, 180);
  } else if (field === "waterEvery" || field === "feedEvery") {
    plant[field] = clamp(Number(input.value), 1, 90);
  } else {
    plant[field] = input.value || toISODate(new Date());
  }
  persist();
  render();
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
loadWeather();

function render() {
  renderHeader();
  renderToday();
  renderPlants();
  renderCalendar();
  renderMonthStats();
  renderSelectedDay();
  renderSettings();
}

function renderHeader() {
  const now = new Date();
  els.greetingTitle.textContent = `${greeting(now)}，Leah`;
  els.dateLine.textContent = `${now.getMonth() + 1}月${now.getDate()}日 · ${weekdayName(now)} · ${seasonName(now)}`;
}

function renderToday() {
  const tasks = getDueTasks();
  const weather = state.weather;
  const hasLiveTemperature = Number.isFinite(weather?.temperature);
  const hasLiveHumidity = Number.isFinite(weather?.humidity);
  els.temperatureText.textContent = hasLiveTemperature ? `${Math.round(weather.temperature)}°C` : "--";
  els.humidityText.textContent = hasLiveHumidity ? `${Math.round(weather.humidity)}%` : "--";
  els.airText.textContent = weather?.airQuality || "读取中";
  els.dueCount.textContent = tasks.length;
  els.todayTitle.textContent = tasks.length
    ? weatherHeadline(hasLiveTemperature ? weather.temperature : 28)
    : hasLiveTemperature
      ? "阳台状态稳定，适合观察记录"
      : "正在读取深圳天气";
  els.todayCopy.textContent = tasks.length ? `有 ${tasks.length} 项任务等待完成，优先处理浇水，再处理施肥或移盆观察。` : "今天没有硬性任务，可以拍一张植物状态照，记下新芽、花苞和盆土湿度。";
  els.dailyTip.textContent = dailyTips[new Date().getDate() % dailyTips.length];
  els.taskList.innerHTML = "";

  if (!tasks.length) {
    els.taskList.append(document.querySelector("#emptyTaskTemplate").content.cloneNode(true));
    return;
  }

  tasks.forEach((task) => {
    const plant = findPlant(task.plantId);
    const card = document.createElement("article");
    card.className = "task-card";
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" loading="lazy">
      <div>
        <h3>${plant.name}</h3>
        <p>${task.label}</p>
        <span class="task-meta">${task.copy}</span>
      </div>
      <div class="task-buttons">
        <button class="check-button" type="button" aria-label="完成${plant.name}${task.type}" data-done="1" data-plant-id="${plant.id}" data-type="${task.type}"></button>
        <button class="mini-action" type="button" data-skip="1" data-plant-id="${plant.id}" data-type="${task.type}">跳过</button>
        <button class="mini-action" type="button" data-postpone="1" data-plant-id="${plant.id}" data-type="${task.type}">推迟</button>
      </div>
    `;
    els.taskList.append(card);
  });
}

async function loadWeather() {
  const params = `latitude=${SHENZHEN.latitude}&longitude=${SHENZHEN.longitude}&timezone=Asia%2FShanghai`;
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?${params}&models=cma_grapes_global&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`;
  const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?${params}&current=us_aqi`;

  try {
    const [forecastResult, airResult] = await Promise.allSettled([
      fetch(forecastUrl).then((response) => {
        if (!response.ok) throw new Error("weather failed");
        return response.json();
      }),
      fetch(airUrl).then((response) => {
        if (!response.ok) throw new Error("air failed");
        return response.json();
      }),
    ]);

    const current = forecastResult.status === "fulfilled" ? forecastResult.value.current : {};
    const air = airResult.status === "fulfilled" ? airResult.value.current : {};
    state.weather = {
      temperature: Number.isFinite(current.temperature_2m) ? current.temperature_2m : fallbackWeather().temperature,
      humidity: Number.isFinite(current.relative_humidity_2m) ? current.relative_humidity_2m : fallbackWeather().humidity,
      apparentTemperature: Number.isFinite(current.apparent_temperature) ? current.apparent_temperature : null,
      code: current.weather_code ?? null,
      airQuality: formatAirQuality(air.us_aqi),
      updatedAt: new Date().toISOString(),
    };
    persist();
    renderToday();
  } catch {
    state.weather = fallbackWeather();
    renderToday();
  }
}

function fallbackWeather() {
  return {
    temperature: null,
    humidity: null,
    airQuality: "暂缺",
    code: null,
    updatedAt: null,
  };
}

function formatAirQuality(aqi) {
  if (!Number.isFinite(aqi)) return "良好";
  if (aqi <= 50) return "优";
  if (aqi <= 100) return "良好";
  if (aqi <= 150) return "轻度";
  if (aqi <= 200) return "中度";
  return "较差";
}

function weatherHeadline(temperature) {
  if (temperature >= 33) return "深圳偏热，适合清晨照料植物";
  if (temperature >= 28) return "天气温暖，适合观察盆土";
  return "天气舒服，适合整理花园记录";
}

function renderPlants() {
  els.plantList.innerHTML = "";
  state.plants.forEach((plant) => {
    const waterDue = daysUntil(nextDate(plant.lastWatered, waterInterval(plant)));
    const feedDue = daysUntil(nextDate(plant.lastFed, plant.feedEvery));
    const card = document.createElement("article");
    card.className = "plant-card";
    card.innerHTML = `
      <div class="plant-head">
        <img src="${plant.image}" alt="${plant.name}" loading="lazy">
        <div>
          <h3>${plant.name}</h3>
          <p class="latin">${plant.latin}</p>
          <div class="badge-row">
            ${plant.badges.map(([text, kind]) => `<span class="badge ${kind}">${text}</span>`).join("")}
          </div>
        </div>
      </div>
      <div class="plant-body">
        <p>${plant.description}</p>
        <div class="care-grid">
          <div class="care-cell"><small>光照</small><strong>${plant.sun}</strong></div>
          <div class="care-cell"><small>浇水</small><strong>${plant.water}</strong></div>
          <div class="care-cell"><small>温度</small><strong>${plant.temp}</strong></div>
          <div class="care-cell"><small>土壤</small><strong>${plant.soil}</strong></div>
        </div>
        <div class="repot-box">${plant.repot}</div>
        <div class="calendar-items">
          <span class="pill">下次浇水 ${relativeText(waterDue)}</span>
          <span class="pill feed">下次施肥 ${relativeText(feedDue)}</span>
          <span class="pill repot">移盆 ${repotStatus(plant)}</span>
        </div>
        <details class="param-editor">
          <summary>编辑养护参数</summary>
          <div class="quick-edit">
          <label class="mini-field">浇水间隔
            <input data-field="waterEvery" data-plant-id="${plant.id}" type="number" min="1" max="30" value="${plant.waterEvery}">
          </label>
          <label class="mini-field">施肥间隔
            <input data-field="feedEvery" data-plant-id="${plant.id}" type="number" min="1" max="90" value="${plant.feedEvery}">
          </label>
          <label class="mini-field">移盆观察/天
            <input data-field="repotAfter" data-plant-id="${plant.id}" type="number" min="1" max="180" value="${plant.repotAfter}">
          </label>
          <label class="mini-field">上次浇水
            <input data-field="lastWatered" data-plant-id="${plant.id}" type="date" value="${plant.lastWatered}">
          </label>
          <label class="mini-field">上次施肥
            <input data-field="lastFed" data-plant-id="${plant.id}" type="date" value="${plant.lastFed}">
          </label>
          </div>
        </details>
      </div>
    `;
    els.plantList.append(card);
  });
}

function renderCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  els.monthLabel.textContent = `${year} 年 ${month + 1} 月`;
  els.calendarGrid.innerHTML = "";

  ["日", "一", "二", "三", "四", "五", "六"].forEach((label) => {
    const dow = document.createElement("div");
    dow.className = "dow";
    dow.textContent = label;
    els.calendarGrid.append(dow);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    renderDayButton(new Date(year, month - 1, previousMonthDays - firstDay + i + 1), true);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    renderDayButton(new Date(year, month, day), false);
  }

  const totalCells = firstDay + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= trailing; i += 1) {
    renderDayButton(new Date(year, month + 1, i), true);
  }
}

function renderDayButton(date, otherMonth) {
  const iso = toISODate(date);
  const logs = state.logs.filter((log) => log.date === iso && isDoneAction(log.action));
  const plans = getPlansForDate(iso);
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.day = iso;
  button.className = [
    "day",
    otherMonth ? "other" : "",
    iso === toISODate(new Date()) ? "today" : "",
    iso === selectedDate ? "selected" : "",
  ].join(" ");
  const marks = [
    ...logs.slice(0, 2).map(() => '<i class="mark log" aria-label="已完成"></i>'),
    ...plans.slice(0, 2).map(() => '<i class="mark plan" aria-label="计划中"></i>'),
  ].join("");
  button.innerHTML = `<span>${date.getDate()}</span><span class="marks">${marks}</span>`;
  els.calendarGrid.append(button);
}

function renderMonthStats() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthLogs = state.logs.filter((log) => log.date.startsWith(monthPrefix));
  const plannedCount = countPlansInMonth(year, month);
  const doneCount = monthLogs.filter((log) => isDoneAction(log.action)).length;
  const waterCount = monthLogs.filter((log) => isDoneAction(log.action) && log.action.includes("浇水")).length;
  const feedCount = monthLogs.filter((log) => isDoneAction(log.action) && log.action.includes("施肥")).length;
  const completion = plannedCount ? Math.min(100, Math.round((doneCount / plannedCount) * 100)) : 0;
  const plantCounts = state.plants.map((plant) => ({
    plant,
    count: monthLogs.filter((log) => log.plantId === plant.id && isDoneAction(log.action)).length,
  }));
  const mostCared = plantCounts.reduce((best, item) => (item.count > best.count ? item : best), { plant: null, count: 0 });

  els.statsMonthLabel.textContent = `${month + 1}月`;
  els.monthStats.innerHTML = `
    <div class="stat-card"><small>完成率</small><strong>${completion}%</strong></div>
    <div class="stat-card"><small>浇水</small><strong>${waterCount} 次</strong></div>
    <div class="stat-card"><small>施肥</small><strong>${feedCount} 次</strong></div>
    <div class="stat-card"><small>最常照料</small><strong>${mostCared.plant ? mostCared.plant.name : "暂无"}</strong></div>
  `;
}

function renderSelectedDay() {
  const date = parseDate(selectedDate);
  const plans = getPlansForDate(selectedDate);
  const logs = state.logs.filter((log) => log.date === selectedDate);
  els.selectedDateLabel.textContent = selectedDate === toISODate(new Date()) ? "今天" : formatDate(date);
  els.selectedDateSub.textContent = `${date.getMonth() + 1}月${date.getDate()}日 · ${weekdayName(date)}`;
  els.selectedPlan.innerHTML = plans.length
    ? plans.map((plan) => `<span class="pill ${plan.type === "feed" ? "feed" : plan.type === "repot" ? "repot" : ""}">${plan.text}</span>`).join("")
    : '<span class="pill">观察盆土与叶片</span>';
  els.logList.innerHTML = logs.length
    ? logs
        .map((log) => {
          const plant = findPlant(log.plantId);
          return `
            <article class="log-item">
              <i class="log-color" style="background:${plant.color}"></i>
              <div>
                <h3>${plant.name} · ${log.action}</h3>
                <p>${log.note || "没有备注"}</p>
              </div>
              <button class="delete-log" type="button" aria-label="删除记录" data-delete-log="${log.id}">删除</button>
            </article>
          `;
        })
        .join("")
    : '<div class="empty-card"><strong>这一天还没有记录</strong><p>可以补记浇水、施肥、修剪、移盆或观察结果。</p></div>';
}

function renderSettings() {
  els.heatMode.checked = state.heatMode;
  els.arrivalDateDisplay.textContent = formatDate(parseDate(state.arrivalDate));
  els.reminderTimeDisplay.textContent = state.reminderTime;
  els.notifyBtn.classList.toggle("is-on", state.notificationEnabled);
  els.guideList.innerHTML = guides
    .map(
      (guide) => `
        <article class="guide-card">
          <h3>${guide.title}</h3>
          <p>${guide.body}</p>
        </article>
      `
    )
    .join("");
}

function getDueTasks() {
  const tasks = [];
  state.plants.forEach((plant) => {
    const waterDue = daysUntil(nextDate(plant.lastWatered, waterInterval(plant)));
    const feedDue = daysUntil(nextDate(plant.lastFed, plant.feedEvery));
    const repotDue = daysUntil(addDays(parseDate(state.arrivalDate), plant.repotAfter));

    if (waterDue <= 0) {
      tasks.push({
        plantId: plant.id,
        type: "water",
        label: "浇水",
        copy: waterDue < 0 ? `逾期 ${Math.abs(waterDue)} 天` : "建议上午完成",
      });
    }
    if (feedDue <= 0) {
      tasks.push({
        plantId: plant.id,
        type: "feed",
        label: "施肥",
        copy: feedDue < 0 ? `逾期 ${Math.abs(feedDue)} 天` : "薄肥一次",
      });
    }
    if (repotDue === 0) {
      tasks.push({
        plantId: plant.id,
        type: "repot",
        label: "检查是否需要移盆",
        copy: "只在根满盆时操作",
      });
    }
  });
  return tasks;
}

function getPlansForDate(iso) {
  const plans = [];
  state.plants.forEach((plant) => {
    if (toISODate(nextDate(plant.lastWatered, waterInterval(plant))) === iso) {
      plans.push({ type: "water", text: `${plant.name} 浇水` });
    }
    if (toISODate(nextDate(plant.lastFed, plant.feedEvery)) === iso) {
      plans.push({ type: "feed", text: `${plant.name} 施肥` });
    }
    if (toISODate(addDays(parseDate(state.arrivalDate), plant.repotAfter)) === iso) {
      plans.push({ type: "repot", text: `${plant.name} 查根` });
    }
  });
  return plans;
}

function countPlansInMonth(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let count = 0;
  for (let day = 1; day <= daysInMonth; day += 1) {
    count += getPlansForDate(toISODate(new Date(year, month, day))).length;
  }
  return count;
}

function markDone(plantId, type) {
  const plant = findPlant(plantId);
  if (!plant) return;
  const todayISO = toISODate(new Date());
  if (type === "water") plant.lastWatered = todayISO;
  if (type === "feed") plant.lastFed = todayISO;
  if (type === "repot") plant.repotAfter += 120;
  state.logs.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: todayISO,
    plantId,
    action: actionLabel(type),
    note: "由今日任务完成",
  });
  state.logs = state.logs.slice(0, 120);
  persist();
  render();
}

function skipTask(plantId, type) {
  const plant = findPlant(plantId);
  if (!plant) return;
  const todayISO = toISODate(new Date());
  if (type === "water") plant.lastWatered = todayISO;
  if (type === "feed") plant.lastFed = todayISO;
  if (type === "repot") plant.repotAfter = daysSinceArrival() + 30;
  state.logs.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: todayISO,
    plantId,
    action: `跳过${actionLabel(type)}`,
    note: "今天状态良好，跳过本次提醒",
  });
  state.logs = state.logs.slice(0, 120);
  persist();
  render();
}

function postponeTask(plantId, type) {
  const plant = findPlant(plantId);
  if (!plant) return;
  const today = new Date();
  const todayISO = toISODate(today);
  if (type === "water") plant.lastWatered = toISODate(addDays(today, 1 - waterInterval(plant)));
  if (type === "feed") plant.lastFed = toISODate(addDays(today, 1 - plant.feedEvery));
  if (type === "repot") plant.repotAfter = daysSinceArrival() + 1;
  state.logs.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: todayISO,
    plantId,
    action: `推迟${actionLabel(type)}`,
    note: "推迟 1 天提醒",
  });
  state.logs = state.logs.slice(0, 120);
  persist();
  render();
}

function openModal() {
  modalPlants = [];
  modalAction = "浇水";
  els.logNote.value = "";
  renderModalChips();
  els.logModal.classList.add("open");
}

function closeModal() {
  els.logModal.classList.remove("open");
}

function renderModalChips() {
  els.plantChips.innerHTML = state.plants
    .map((plant) => `<button class="chip" type="button" data-modal-plant="${plant.id}">${plant.name}</button>`)
    .join("");
  els.actionChips.innerHTML = actionTypes
    .map((action) => `<button class="chip ${action === modalAction ? "selected" : ""}" type="button" data-modal-action="${action}">${action}</button>`)
    .join("");

  els.plantChips.querySelectorAll("[data-modal-plant]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.modalPlant;
      modalPlants = modalPlants.includes(id) ? modalPlants.filter((item) => item !== id) : [...modalPlants, id];
      button.classList.toggle("selected", modalPlants.includes(id));
    });
  });

  els.actionChips.querySelectorAll("[data-modal-action]").forEach((button) => {
    button.addEventListener("click", () => {
      modalAction = button.dataset.modalAction;
      els.actionChips.querySelectorAll(".chip").forEach((chip) => chip.classList.toggle("selected", chip === button));
    });
  });
}

function saveLog() {
  if (!modalPlants.length) {
    toast("先选一株植物。");
    return;
  }
  const note = els.logNote.value.trim();
  modalPlants.forEach((plantId) => {
    const plant = findPlant(plantId);
    if (modalAction === "浇水") plant.lastWatered = selectedDate;
    if (modalAction === "施肥") plant.lastFed = selectedDate;
    state.logs.unshift({
      id: `${Date.now()}-${plantId}`,
      date: selectedDate,
      plantId,
      action: modalAction,
      note,
    });
  });
  state.logs = state.logs.slice(0, 120);
  persist();
  closeModal();
  render();
  toast("花园记录已保存。");
}

function deleteLog(id) {
  state.logs = state.logs.filter((log) => log.id !== id);
  persist();
  render();
}

async function requestNotification() {
  if (!("Notification" in window)) {
    toast("这个浏览器不支持通知。");
    return;
  }
  const permission = await Notification.requestPermission();
  state.notificationEnabled = permission === "granted";
  persist();
  renderSettings();
  toast(state.notificationEnabled ? "提醒权限已开启。" : "没有获得通知权限。");
}

function resetData() {
  const ok = window.confirm("确定重置所有记录和设置吗？");
  if (!ok) return;
  state = clone(defaultState());
  persist();
  render();
  toast("已重置。");
}

function switchView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("is-active", node.id === `${view}View`));
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
}

function changeMonth(delta) {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + delta, 1);
  renderCalendar();
}

function defaultState() {
  const todayISO = toISODate(new Date());
  return {
    heatMode: true,
    arrivalDate: CARE_SETTINGS.arrivalDate,
    reminderTime: CARE_SETTINGS.reminderTime,
    notificationEnabled: false,
    plants: plantProfiles.map((plant) => ({
      ...plant,
      lastWatered: todayISO,
      lastFed: todayISO,
    })),
    logs: [],
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultState();
  try {
    const parsed = JSON.parse(saved);
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      arrivalDate: CARE_SETTINGS.arrivalDate,
      reminderTime: CARE_SETTINGS.reminderTime,
      plants: plantProfiles.map((profile) => ({
        ...profile,
        ...(parsed.plants || []).find((plant) => plant.id === profile.id),
      })),
      logs: parsed.logs || [],
    };
  } catch {
    return defaultState();
  }
}

function waterInterval(plant) {
  if (!state.heatMode) return plant.waterEvery;
  if (plant.id === "dendrobium") return plant.waterEvery;
  return Math.max(1, plant.waterEvery - 1);
}

function nextDate(dateISO, interval) {
  return addDays(parseDate(dateISO), interval);
}

function daysUntil(date) {
  const diff = startOfDay(date).getTime() - startOfDay(new Date()).getTime();
  return Math.round(diff / MS_DAY);
}

function relativeText(days) {
  if (days < 0) return `逾期 ${Math.abs(days)} 天`;
  if (days === 0) return "今天";
  if (days === 1) return "明天";
  return `${days} 天后`;
}

function repotStatus(plant) {
  const due = daysUntil(addDays(parseDate(state.arrivalDate), plant.repotAfter));
  if (due > 0) return `${due} 天后观察`;
  if (due === 0) return "今天观察";
  return "已到观察期";
}

function doneMessage(type) {
  if (type === "water") return "已记录浇水。";
  if (type === "feed") return "已记录施肥。";
  return "已记录移盆观察。";
}

function actionLabel(type) {
  if (type === "water") return "浇水";
  if (type === "feed") return "施肥";
  return "移盆观察";
}

function isDoneAction(action) {
  return !action.startsWith("跳过") && !action.startsWith("推迟");
}

function daysSinceArrival() {
  return Math.max(0, daysBetween(parseDate(state.arrivalDate), new Date()));
}

function daysBetween(start, end) {
  const diff = startOfDay(end).getTime() - startOfDay(start).getTime();
  return Math.round(diff / MS_DAY);
}

function findPlant(id) {
  return state.plants.find((plant) => plant.id === id);
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toISODate(date) {
  const local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().slice(0, 10);
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function weekdayName(date) {
  return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
}

function greeting(date) {
  const hour = date.getHours();
  if (hour < 6) return "夜深了";
  if (hour < 12) return "上午好";
  if (hour < 18) return "下午好";
  return "晚上好";
}

function seasonName(date) {
  const month = date.getMonth() + 1;
  if ([3, 4, 5].includes(month)) return "春季生长期";
  if ([6, 7, 8].includes(month)) return "夏季高温期";
  if ([9, 10, 11].includes(month)) return "秋季复壮期";
  return "冬季观察期";
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.querySelector("#app").append(node);
  requestAnimationFrame(() => node.classList.add("show"));
  setTimeout(() => {
    node.classList.remove("show");
    setTimeout(() => node.remove(), 220);
  }, 2200);
}
