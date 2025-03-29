document.addEventListener('DOMContentLoaded', function() {
  // ナビゲーションリンクのスムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // モバイル表示時のナビゲーションメニューを閉じる
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // カードの表示アニメーション
  const cards = document.querySelectorAll('.card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });

  // セクションタイトルのアニメーション
  const sectionTitles = document.querySelectorAll('.section-title');
  
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        titleObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  sectionTitles.forEach(title => {
    titleObserver.observe(title);
  });

  // ナビゲーションバーのスクロール固定
  const navbar = document.querySelector('.navbar');
  const sticky = navbar.offsetTop;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add('sticky-top');
    } else {
      navbar.classList.remove('sticky-top');
    }
  });
  
  // ライトモード/ダークモード切り替え機能（オプション）
  const createThemeToggle = () => {
    const footer = document.querySelector('.footer .container');
    if (footer) {
      const themeToggleContainer = document.createElement('div');
      themeToggleContainer.classList.add('mt-4', 'text-center');
      
      const themeToggleBtn = document.createElement('button');
      themeToggleBtn.classList.add('btn', 'btn-outline-light', 'btn-sm');
      themeToggleBtn.innerHTML = '<i class="fas fa-moon me-2"></i>ダークモード切替';
      themeToggleBtn.setAttribute('id', 'theme-toggle');
      
      themeToggleContainer.appendChild(themeToggleBtn);
      footer.appendChild(themeToggleContainer);
      
      themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          themeToggleBtn.innerHTML = '<i class="fas fa-sun me-2"></i>ライトモード切替';
          localStorage.setItem('theme', 'dark');
        } else {
          themeToggleBtn.innerHTML = '<i class="fas fa-moon me-2"></i>ダークモード切替';
          localStorage.setItem('theme', 'light');
        }
      });
      
      // ローカルストレージからテーマ設定を読み込む
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun me-2"></i>ライトモード切替';
      }
    }
  };
  
  // テーマ切り替えボタンを作成
  createThemeToggle();
});