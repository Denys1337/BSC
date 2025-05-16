const burger = document.getElementById("burger");
const nav = document.querySelector(".nav");
const closeButton = document.querySelector(".closeButton");
burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});
closeButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const toggle = document.getElementById("languageToggle");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  if (toggle.classList.contains("active")) {
    console.log("English selected");
  } else {
    console.log("Ukrainian selected");
  }
});

const sliderWrapper = document.getElementById("sliderWrapper");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;

function updateSlider() {
  const slideWidth = document.querySelector(".slide").offsetWidth;
  sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  const slideCount = document.querySelectorAll(".slide").length;
  const visibleSlides = window.innerWidth <= 768 ? 1 : 2;
  const maxIndex = slideCount - visibleSlides;
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);
window.addEventListener("load", updateSlider);

const items = document.querySelectorAll(".accordion-item");

items.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    items.forEach((el) => el.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Calendar

const events = {
  "2025-05-01": [
    {
      time: "09:00-10:00",
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum",
    },
    { time: "11:00-15:00", title: "Інша подія", desc: "Опис події" },
  ],
  "2025-05-13": [
    { time: "14:00-15:00", title: "Зустріч з партнерами", desc: "Офіс" },
  ],
  "2025-05-22": [
    { time: "10:00-11:30", title: "Онлайн вебінар", desc: "Zoom" },
  ],
};

const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "НД"];
const calendarDays = document.getElementById("calendar-days");
const calendarDates = document.getElementById("calendar-dates");
const monthYear = document.getElementById("monthYear");
const eventsContainer = document.getElementById("events-container");

let currentDate = new Date(2025, 4); // Травень 2025
const today = new Date();
const selectedDateFormatted = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
let selectedDate = selectedDateFormatted;

function renderDays() {
  calendarDays.innerHTML = "";
  days.forEach((day) => {
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = day;
    calendarDays.appendChild(div);
  });
}

const monthNames = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleDateString("uk-UA", {
    month: "long",
    year: "numeric",
  });

  const prevMonthIndex = (month - 1 + 12) % 12;
  const nextMonthIndex = (month + 1) % 12;

  document.getElementById(
    "prevBtn"
  ).textContent = `< ${monthNames[prevMonthIndex]}`;
  document.getElementById(
    "nextBtn"
  ).textContent = `${monthNames[nextMonthIndex]} >`;

  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  calendarDates.innerHTML = "";

  for (let i = offset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dateDiv = document.createElement("div");
    dateDiv.className = "date other-month";
    dateDiv.textContent = day;
    calendarDates.appendChild(dateDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const dateDiv = document.createElement("div");
    dateDiv.className = "date";
    dateDiv.textContent = day;

    if (events[dateKey]) {
      const dot = document.createElement("div");
      dot.className = "dotCalendar";
      dateDiv.appendChild(dot);
    }

    if (selectedDate === dateKey) {
      dateDiv.classList.add("active");
    }

    dateDiv.addEventListener("click", () => {
      selectedDate = dateKey;
      renderCalendar();
      renderEvents(dateKey);
    });

    calendarDates.appendChild(dateDiv);
  }

  const totalCells = offset + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;

  for (let i = 1; i <= remainingCells; i++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "date other-month";
    dateDiv.textContent = i;
    calendarDates.appendChild(dateDiv);
  }
}

function renderEvents(dateKey) {
  const selectedDateTitle = document.getElementById("selected-date-title");
  const [year, month, day] = dateKey.split("-");

  const date = new Date(year, month - 1, day);
  const formatted = date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
  });

  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString("uk-UA", { month: "long" });

  selectedDateTitle.innerHTML = `Події <span>${dayNumber}</span> ${monthName}`;

  eventsContainer.innerHTML = "";
  const dayEvents = events[dateKey];

  if (!dayEvents || dayEvents.length === 0) {
    eventsContainer.innerHTML = `<p class="noData">На вибрану дату події незаплановані</p>`;
    return;
  }

  dayEvents.forEach((ev) => {
    const evDiv = document.createElement("div");
    evDiv.className = "event";
    evDiv.innerHTML = `
      <div class="event-time"><img src="images/clock.svg"/> ${ev.time}</div>
      <div class="event-title"><a href="#">${ev.title}</a></div>
      <div class="event-desc">${ev.desc}</div>
    `;
    eventsContainer.appendChild(evDiv);
  });
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  selectedDate = null;
  renderCalendar();
  eventsContainer.innerHTML = "<p>Оберіть дату, щоб побачити події</p>";
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  selectedDate = null;
  renderCalendar();
  eventsContainer.innerHTML = "<p>Оберіть дату, щоб побачити події</p>";
}

renderDays();
renderCalendar();
renderEvents(selectedDate);

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".read-more-btn");
  const text = document.querySelector(".clamped-text");

  btn.addEventListener("click", () => {
    text.classList.toggle("expanded");
    btn.textContent = text.classList.contains("expanded")
      ? "Згорнути"
      : "Читати далі";
  });
});

// Bunner
const container = document.getElementById("comparisonContainer");
const resize = document.getElementById("comparisonResize");
const divider = document.getElementById("comparisonDivider");

let isDragging = false;

container.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor = "ew-resize";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "default";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = container.getBoundingClientRect();
  let offset = e.clientX - rect.left;
  offset = Math.max(0, Math.min(offset, rect.width));

  const percent = (offset / rect.width) * 100;
  resize.style.width = `${percent}%`;
  divider.style.left = `${percent}%`;
});

// select language
const langSelect = document.getElementById("langSelect");
const currentLang = document.getElementById("currentLang");
const otherLang = document.getElementById("otherLang");

langSelect.addEventListener("click", (e) => {
  langSelect.classList.toggle("open");
  e.stopPropagation();
});

// Swap language
otherLang.addEventListener("click", (e) => {
  const temp = currentLang.textContent;
  currentLang.textContent = otherLang.textContent;
  otherLang.textContent = temp;
  langSelect.classList.remove("open");
  e.stopPropagation();
});

// Закриття при кліку поза селектом
document.addEventListener("click", (e) => {
  if (!langSelect.contains(e.target)) {
    langSelect.classList.remove("open");
  }
});

// scroll
const lockSection = document.getElementById("accordeonSection");
const innerScroll = lockSection.querySelector(".accordion");

let isBodyLocked = false;

function lockBodyScroll() {
  if (!isBodyLocked) {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";
    isBodyLocked = true;
  }
}

function unlockBodyScroll() {
  if (isBodyLocked) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    isBodyLocked = false;
  }
}

function checkScrollPosition() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const sectionTop = lockSection.offsetTop;
  const sectionHeight = lockSection.offsetHeight;
  const sectionBottom = sectionTop + sectionHeight;

  if (scrollY + viewportHeight >= sectionBottom) {
    lockBodyScroll();
  }
}

function onInnerScroll() {
  const scrollTop = innerScroll.scrollTop;
  const clientHeight = innerScroll.clientHeight;
  const scrollHeight = innerScroll.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    unlockBodyScroll();
  } else if (scrollTop <= 0) {
    unlockBodyScroll();
  } else {
    lockBodyScroll();
  }
}

function onWheel(e) {
  if (!isBodyLocked) return;

  e.preventDefault();

  innerScroll.scrollTop += e.deltaY;

  const scrollTop = innerScroll.scrollTop;
  const clientHeight = innerScroll.clientHeight;
  const scrollHeight = innerScroll.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0) {
    unlockBodyScroll();
  } else if (scrollTop <= 0 && e.deltaY < 0) {
    unlockBodyScroll();
  }
}

window.addEventListener("load", () => {
  checkScrollPosition();
});

window.addEventListener("scroll", () => {
  if (!isBodyLocked) {
    checkScrollPosition();
  }
});

innerScroll.addEventListener("scroll", onInnerScroll);

window.addEventListener("wheel", onWheel, { passive: false });
