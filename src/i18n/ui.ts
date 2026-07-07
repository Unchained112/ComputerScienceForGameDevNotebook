import type { Lang } from './index';

// 交互组件（排序/树/3D）中控件标签的字典，供 TS island 使用
export const ui: Record<string, { zh: string; en: string }> = {
  play: { zh: '播放', en: 'Play' },
  pause: { zh: '暂停', en: 'Pause' },
  step: { zh: '单步', en: 'Step' },
  reset: { zh: '重置', en: 'Reset' },
  shuffle: { zh: '打乱', en: 'Shuffle' },
  speed: { zh: '速度', en: 'Speed' },
  algorithm: { zh: '算法', en: 'Algorithm' },
  size: { zh: '数量', en: 'Size' },
  comparisons: { zh: '比较次数', en: 'Comparisons' },
  swaps: { zh: '交换次数', en: 'Swaps' },
  rotate: { zh: '拖拽旋转', en: 'Drag to rotate' },
  comingSoon: { zh: '内容建设中', en: 'Content in progress' },
  placeholderHint: {
    zh: '本页为该主题的占位页，正文与可视化将逐步补充。',
    en: 'This is a placeholder page for the topic; content and visualizations will be added progressively.',
  },
};

export function uiText(key: keyof typeof ui, lang: Lang): string {
  return ui[key][lang];
}
