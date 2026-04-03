// 国内常用网站链接和名称数组
const sites = [
  { name: "百度", url: "https://www.baidu.com" },
  { name: "淘宝", url: "https://www.taobao.com" },
  { name: "京东", url: "https://www.jd.com" },
  { name: "微博", url: "https://www.weibo.com" },
  { name: "哔哩哔哩", url: "https://www.bilibili.com" },
  { name: "知乎", url: "https://www.zhihu.com" },
  { name: "抖音", url: "https://www.douyin.com" },
  { name: "网易新闻", url: "https://www.163.com" },
  { name: "搜狐", url: "https://www.sohu.com" },
  { name: "天猫超市", url: "https://www.tmall.com" }
];

const container = document.getElementById('container');

function createBall(site) {
  const ball = document.createElement('a');
  ball.classList.add('ball');
  // 根据网站名称字数动态调整球的大小
  const size = site.name.length * 15 + 40;
  ball.style.width = `${size}px`;
  ball.style.height = `${size}px`;
  // 优化球的颜色，选择更协调的颜色范围
  const hue = Math.random() * 360;
  const color = `hsl(${hue}, 80%, 60%)`;
  ball.style.backgroundColor = color;
  // 随机初始位置
  ball.style.left = `${Math.random() * (window.innerWidth - size)}px`;
  ball.style.top = `${Math.random() * (window.innerHeight - size)}px`;
  // 完全随机的速度
  const speedX = (Math.random() - 0.5) * 4;
  const speedY = (Math.random() - 0.5) * 4;
  ball.speedX = speedX;
  ball.speedY = speedY;
  // 设置链接
  ball.href = site.url;
  ball.target = "_blank";
  // 在球上显示网站名称
  ball.textContent = site.name;
  container.appendChild(ball);
  return ball;
}

const balls = [];
sites.forEach(site => {
  balls.push(createBall(site));
});

function moveBalls() {
  balls.forEach(ball => {
    let x = parseFloat(ball.style.left);
    let y = parseFloat(ball.style.top);
    x += ball.speedX;
    y += ball.speedY;

    // 边界检测
    if (x <= 0 || x >= window.innerWidth - parseFloat(ball.style.width)) {
      ball.speedX = -ball.speedX;
    }
    if (y <= 0 || y >= window.innerHeight - parseFloat(ball.style.height)) {
      ball.speedY = -ball.speedY;
    }

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
  });
  requestAnimationFrame(moveBalls);
}

// 监听窗口大小变化，实现页面智能缩放
window.addEventListener('resize', () => {
  balls.forEach(ball => {
    const size = parseFloat(ball.style.width);
    ball.style.left = `${Math.min(parseFloat(ball.style.left), window.innerWidth - size)}px`;
    ball.style.top = `${Math.min(parseFloat(ball.style.top), window.innerHeight - size)}px`;
  });
});

moveBalls();