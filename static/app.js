const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => item.classList.remove("active"));
    contents.forEach((item) => item.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

document.querySelectorAll(".preset-row").forEach((row) => {
  row.querySelectorAll(".preset").forEach((preset) => {
    preset.addEventListener("click", () => {
      row.querySelectorAll(".preset").forEach((item) => {
        item.classList.remove("active");
      });

      if (!preset.classList.contains("more")) {
        preset.classList.add("active");
      }
    });
  });
});

document.querySelectorAll('input[type="range"]').forEach((range) => {
  const updateRange = () => {
    const min = Number(range.min || 0);
    const max = Number(range.max || 100);
    const value = Number(range.value);
    const percent = ((value - min) / (max - min)) * 100;

    range.style.background = `linear-gradient(to right, #2563EB ${percent}%, #D1D5DB ${percent}%)`;
  };

  range.addEventListener("input", updateRange);
  updateRange();
});
