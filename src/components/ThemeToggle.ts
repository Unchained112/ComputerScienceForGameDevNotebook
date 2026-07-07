// 明暗主题切换 island
const STORAGE_KEY = 'csnote-theme';
const root = document.documentElement;

function current(): 'dark' | 'light' {
  return root.classList.contains('light') ? 'light' : 'dark';
}

function apply(theme: 'dark' | 'light') {
  root.classList.toggle('light', theme === 'light');
  localStorage.setItem(STORAGE_KEY, theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

const btn = document.getElementById('theme-toggle');
if (btn) {
  btn.textContent = current() === 'light' ? '🌙' : '☀️';
  btn.addEventListener('click', () => {
    apply(current() === 'light' ? 'dark' : 'light');
  });
}
