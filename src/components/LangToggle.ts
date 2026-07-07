// 双语切换 island：读写 localStorage，切换 <html data-lang>
const STORAGE_KEY = 'csnote-lang';

const root = document.documentElement;

function current(): 'zh' | 'en' {
  return root.getAttribute('data-lang') === 'en' ? 'en' : 'zh';
}

function apply(lang: 'zh' | 'en') {
  root.setAttribute('data-lang', lang);
  localStorage.setItem(STORAGE_KEY, lang);
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中';
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

const btn = document.getElementById('lang-toggle');
if (btn) {
  btn.textContent = current() === 'zh' ? 'EN' : '中';
  btn.addEventListener('click', () => {
    apply(current() === 'zh' ? 'en' : 'zh');
  });
}
