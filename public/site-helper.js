// public/site-helper.js
// 生成页面提示卡片、关键词徽章和访问说明，不依赖第三方库

(function () {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://cnzh-i-game.com.cn',
    keyword: '爱游戏',
    cardTitle: '站点提示',
    cardText: '欢迎访问本平台，更多内容请前往官网了解。',
    badgeColor: '#4a90d9',
    badgeTextColor: '#ffffff',
    animationDelay: 800 // 毫秒
  };

  // 工具：创建带样式的元素
  function createElement(tag, attrs, styles, innerHTML) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
      }
    }
    if (styles) {
      for (const [key, value] of Object.entries(styles)) {
        el.style[key] = value;
      }
    }
    if (innerHTML !== undefined) {
      el.innerHTML = innerHTML;
    }
    return el;
  }

  // 生成关键词徽章
  function createKeywordBadge(keyword) {
    const badge = createElement('span', {
      class: 'keyword-badge'
    }, {
      display: 'inline-block',
      backgroundColor: CONFIG.badgeColor,
      color: CONFIG.badgeTextColor,
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }, keyword);
    return badge;
  }

  // 生成提示卡片
  function createTipCard(title, text, url) {
    const card = createElement('div', {
      class: 'site-tip-card'
    }, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      maxWidth: '320px',
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      padding: '18px 20px',
      zIndex: '9999',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.5',
      transition: 'opacity 0.3s, transform 0.3s',
      opacity: '0',
      transform: 'translateY(20px)'
    });

    // 标题
    const titleEl = createElement('h4', {}, {
      margin: '0 0 8px 0',
      fontSize: '16px',
      color: '#333'
    }, title);
    card.appendChild(titleEl);

    // 正文
    const textEl = createElement('p', {}, {
      margin: '0 0 12px 0',
      fontSize: '14px',
      color: '#555'
    }, text);
    card.appendChild(textEl);

    // 链接区域
    const linkEl = createElement('a', {
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, {
      display: 'inline-block',
      padding: '6px 14px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: 'bold'
    }, '前往官网');
    card.appendChild(linkEl);

    // 关闭按钮
    const closeBtn = createElement('button', {
      class: 'close-card-btn',
      'aria-label': '关闭提示'
    }, {
      position: 'absolute',
      top: '8px',
      right: '12px',
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: '#999',
      lineHeight: '1'
    }, '×');
    closeBtn.addEventListener('click', function () {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(function () {
        if (card.parentNode) {
          card.parentNode.removeChild(card);
        }
      }, 300);
    });
    card.appendChild(closeBtn);

    return card;
  }

  // 生成访问说明区域
  function createAccessGuide(keyword, url) {
    const guide = createElement('div', {
      class: 'access-guide'
    }, {
      padding: '16px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      margin: '16px 0',
      textAlign: 'center'
    });

    const heading = createElement('p', {}, {
      margin: '0 0 10px 0',
      fontSize: '15px',
      color: '#333',
      fontWeight: '600'
    }, '访问说明：');
    guide.appendChild(heading);

    const badgeContainer = createElement('div', {}, {
      margin: '8px 0'
    });
    const badge = createKeywordBadge(keyword);
    badgeContainer.appendChild(badge);
    guide.appendChild(badgeContainer);

    const linkNote = createElement('p', {}, {
      margin: '8px 0 0 0',
      fontSize: '13px',
      color: '#666'
    }, '官方网址：<a href="' + url + '" target="_blank" rel="noopener noreferrer" style="color:#007bff;">' + url + '</a>');
    guide.appendChild(linkNote);

    return guide;
  }

  // 挂载到页面
  function init() {
    // 等待 DOM 就绪
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', execute);
    } else {
      execute();
    }
  }

  function execute() {
    // 插入提示卡片（延迟动画）
    setTimeout(function () {
      const card = createTipCard(CONFIG.cardTitle, CONFIG.cardText, CONFIG.siteUrl);
      document.body.appendChild(card);
      // 触发动画
      requestAnimationFrame(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, CONFIG.animationDelay);

    // 查找页面中适合插入访问说明的容器
    const containers = document.querySelectorAll('.content, main, #main, article, .post, .entry');
    let targetContainer = null;
    if (containers.length > 0) {
      // 取第一个非空容器
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].offsetParent !== null) {
          targetContainer = containers[i];
          break;
        }
      }
    }
    if (!targetContainer) {
      targetContainer = document.body;
    }

    const guide = createAccessGuide(CONFIG.keyword, CONFIG.siteUrl);
    targetContainer.appendChild(guide);
  }

  // 启动
  init();

})();