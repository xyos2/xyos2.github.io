// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端菜单
    initMobileMenu();
    
    // 初始化实时时间显示
    initTimeDisplay();
    
    // 初始化作品卡片点击事件
    initWorkCards();
    
    // 初始化滚动高亮
    initScrollHighlight();
    
    // 初始化向下探索按钮
    initScrollButton();
    
    // 添加视差滚动效果
    initParallax();
    
    // 初始化夜间模式切换
    initThemeToggle();
});

// 夜间模式切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 初始化主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark');
        updateThemeIcon(true);
    }
    
    // 更新主题图标
    function updateThemeIcon(isDark) {
        const icons = document.querySelectorAll('.theme-toggle i');
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
    
    // 主题切换逻辑
    function toggleTheme() {
        const isDark = body.classList.toggle('dark');
        updateThemeIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    // 桌面端按钮事件
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 移动端按钮事件
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const isDark = e.matches;
            body.classList.toggle('dark', isDark);
            updateThemeIcon(isDark);
        }
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            // 切换汉堡菜单图标
            const icon = this.querySelector('i');
            if (navMobile.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击菜单链接后关闭菜单
        const mobileLinks = navMobile.querySelectorAll('.nav-mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMobile.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// 实时时间显示
function initTimeDisplay() {
    const timeElement = document.getElementById('currentTime');
    
    function updateTime() {
        const now = new Date();
        
        // 格式化日期和时间
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // 星期转换
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[now.getDay()];
        
        // 显示格式：2024-03-15 14:30:25 星期五
        const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${weekday}`;
        
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    // 立即更新一次，然后每秒更新
    updateTime();
    setInterval(updateTime, 1000);
}

// 作品卡片点击事件
function initWorkCards() {
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        // 从data-link属性获取链接
        const link = card.getAttribute('data-link') || 'https://juejin.cn/user/2232425500384467/posts';
        
        // 添加点击事件
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // 跳转到指定链接（新标签页打开）
            window.open(link, '_blank');
        });
        
        // 添加键盘支持
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open(link, '_blank');
            }
        });
        
        // 设置可访问性
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', '查看项目详情');
    });
    
    // 控制台提示
    console.log('📝 修改提示：如果要更改作品卡片的跳转链接，请修改：');
    console.log('1. HTML中每个work-card元素的data-link属性');
    console.log('2. 当前跳转链接为：https://juejin.cn/user/2232425500384467/posts');
}

// 向下探索按钮点击事件
function initScrollButton() {
    const scrollButton = document.getElementById('scrollToWorks');
    
    if (scrollButton) {
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 滚动到作品区域
            const worksSection = document.getElementById('works');
            if (worksSection) {
                const offsetTop = worksSection.offsetTop - 80; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // 添加键盘支持
        scrollButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const worksSection = document.getElementById('works');
                if (worksSection) {
                    const offsetTop = worksSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // 设置可访问性
        scrollButton.setAttribute('tabindex', '0');
        scrollButton.setAttribute('role', 'button');
        scrollButton.setAttribute('aria-label', '向下滚动到我的作品区域');
    }
}

// 滚动时高亮当前区域
function initScrollHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset + 200; // 增加偏移量，使高亮更提前触发
        let currentSection = '';
        
        // 从下往上检测，确保正确匹配当前可见的section
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
                break; // 找到第一个匹配的section就停止
            }
        }
        
        // 如果没有匹配到任何section，默认显示首页高亮
        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].getAttribute('id');
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', highlightNavLink);
    
    // 初始执行一次，处理当前可见区域
    highlightNavLink();
    
    // 添加active样式到CSS
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active,
        .nav-mobile-link.active {
            color: var(--color-primary) !important;
            background-color: var(--color-hover);
        }
    `;
    document.head.appendChild(style);
}

// 视差滚动效果
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // 通过CSS变量控制视差效果
            hero.style.setProperty('--parallax-rate', `${rate}px`);
            
            // 添加CSS变量到样式
            if (!document.querySelector('#parallax-style')) {
                const style = document.createElement('style');
                style.id = 'parallax-style';
                style.textContent = `
                    .hero::before {
                        transform: translateY(var(--parallax-rate, 0px)) rotate(calc(var(--parallax-rate, 0px) * 0.1deg));
                    }
                    .hero::after {
                        transform: translateY(calc(var(--parallax-rate, 0px) * -0.7)) rotate(calc(var(--parallax-rate, 0px) * -0.05deg));
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
}

// 控制台提示信息
console.log('🚀 网站初始化完成！');
console.log('📌 需要修改的第三方链接位置：');
console.log('1. 导航栏中的"我的笔记"、"微信"、"抖音"链接');
console.log('2. 所有作品卡片的data-link属性');
console.log('3. 修改后请同步更新相关的事件处理函数');