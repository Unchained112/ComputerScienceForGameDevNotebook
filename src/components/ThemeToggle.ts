// 明暗主题切换 island：默认浅色，深色经 html.dark 启用
const STORAGE_KEY = 'csnote-theme';
const root = document.documentElement;

function current(): 'dark' | 'light' {
  return root.classList.contains('dark') ? 'dark' : 'light';
}

function apply(theme: 'dark' | 'light') {
  root.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(STORAGE_KEY, theme);
  const btn = document.getElementById('theme-toggle');
  // 图标表示「可切换到的目标」：浅色时显示 🌙（切到深色/夜间），深色时显示 ☀️（切到浅色/日间）
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
  // 通知可视化组件按主题刷新画布配色
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

const btn = document.getElementById('theme-toggle');
if (btn) {
  btn.textContent = current() === 'light' ? '🌙' : '☀️';
  btn.addEventListener('click', () => {
    apply(current() === 'light' ? 'dark' : 'light');
  });
}
