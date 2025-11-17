---
title: 应用导航
layout: page
---

<style>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "Microsoft YaHei", sans-serif;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  font-size: 2.5em;
  font-weight: 600;
}

.dashboard-section {
  margin-bottom: 40px;
}

.dashboard-section h2 {
  font-size: 1.8em;
  font-weight: 500;
  border-bottom: 2px solid #49b1f5;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  text-decoration: none;
  color: #3c4858;
  display: flex;
  flex-direction: column;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.card-content {
  padding: 20px;
  display: flex;
  align-items: center;
}

.card-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50%;
}

.card-text h3 {
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
}

.card-text p {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #718096;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #eaecef;
  font-size: 0.9em;
}

.dashboard-footer a {
  color: #0366d6;
  text-decoration: none;
}

[data-user-color-scheme="dark"] .dashboard-card {
  background-color: #252d38;
  color: #c4c6c9;
}

[data-user-color-scheme="dark"] .card-text p {
  color: #a7a9ad;
}

[data-user-color-scheme="dark"] .dashboard-footer {
  border-top-color: #435266;
}
</style>

<div class="dashboard-container">
  <div class="dashboard-header">
    <h1>学习导航</h1>
  </div>

  <!-- 核心课程与学习 -->
  <div class="dashboard-section">
    <h2>核心课程与学习</h2>
    <div class="dashboard-grid">
      <a href="https://www.coursera.org/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://www.coursera.org/favicon.ico" alt="Coursera" class="card-icon">
          <div class="card-text">
            <h3>Coursera</h3>
            <p>顶尖大学的在线课程</p>
          </div>
        </div>
      </a>
      <a href="https://csdiy.wiki/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://csdiy.wiki/favicon.ico" alt="CS DIY" class="card-icon">
          <div class="card-text">
            <h3>CS DIY Wiki</h3>
            <p>计算机自学指北</p>
          </div>
        </div>
      </a>
      <a href="https://www.bilibili.com/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://www.bilibili.com/favicon.ico" alt="Bilibili" class="card-icon">
          <div class="card-text">
            <h3>Bilibili</h3>
            <p>丰富的计算机学习视频</p>
          </div>
        </div>
      </a>
      <a href="https://www.runoob.com/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://www.runoob.com/favicon.ico" alt="菜鸟教程" class="card-icon">
          <div class="card-text">
            <h3>菜鸟教程</h3>
            <p>基础编程语言入门</p>
          </div>
        </div>
      </a>
    </div>
  </div>

  <!-- 编程语言与工具 -->
  <div class="dashboard-section">
    <h2>编程语言与工具</h2>
    <div class="dashboard-grid">
      <a href="https://github.com" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://github.githubassets.com/favicons/favicon.png" alt="GitHub" class="card-icon">
          <div class="card-text">
            <h3>GitHub</h3>
            <p>全球最大的代码托管平台</p>
          </div>
        </div>
      </a>
      <a href="https://docs.oracle.com/en/java/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://www.oracle.com/favicon.ico" alt="Java Docs" class="card-icon">
          <div class="card-text">
            <h3>Java 官方文档</h3>
            <p>学习 Java 的权威资料</p>
          </div>
        </div>
      </a>
      <a href="https://spring.io/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://spring.io/favicon.ico" alt="Spring" class="card-icon">
          <div class="card-text">
            <h3>Spring</h3>
            <p>Java 开发必备框架</p>
          </div>
        </div>
      </a>
      <a href="https://www.docker.com/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://www.docker.com/favicon.ico" alt="Docker" class="card-icon">
          <div class="card-text">
            <h3>Docker</h3>
            <p>容器化技术入门</p>
          </div>
        </div>
      </a>
    </div>
  </div>

  <!-- 技术社区与前沿 -->
  <div class="dashboard-section">
    <h2>技术社区与前沿</h2>
    <div class="dashboard-grid">
      <a href="https://stackoverflow.com" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico" alt="Stack Overflow" class="card-icon">
          <div class="card-text">
            <h3>Stack Overflow</h3>
            <p>解决编程问题的首选</p>
          </div>
        </div>
      </a>
      <a href="https://juejin.cn" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/static/favicons/favicon-32x32.png" alt="掘金" class="card-icon">
          <div class="card-text">
            <h3>掘金</h3>
            <p>中文技术文章分享社区</p>
          </div>
        </div>
      </a>
      <a href="https://leetcode.cn" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://leetcode.cn/favicon.ico" alt="LeetCode" class="card-icon">
          <div class="card-text">
            <h3>力扣 (LeetCode)</h3>
            <p>算法与数据结构练习平台</p>
          </div>
        </div>
      </a>
       <a href="https://www.infoq.cn/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://www.infoq.cn/favicon.ico" alt="InfoQ" class="card-icon">
          <div class="card-text">
            <h3>InfoQ</h3>
            <p>前沿技术动态与实践</p>
          </div>
        </div>
      </a>
      <a href="https://www.nowcoder.com/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://static.nowcoder.com/images/logo/87_87.png" alt="牛客网" class="card-icon">
          <div class="card-text">
            <h3>牛客网</h3>
            <p>求职、刷题、内推、面经社区</p>
          </div>
        </div>
      </a>
      <a href="https://www.nowcoder.com/" target="_blank" class="dashboard-card">
        <div class="card-content">
          <img src="https://static.nowcoder.com/images/logo/87_87.png" alt="牛客网" class="card-icon">
          <div class="card-text">
            <h3>牛客网</h3>
            <p>求职、刷题、内推、面经社区</p>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="dashboard-footer">
    <p>返回 <a href="/">李国强的技术博客</a> 首页</p>
  </div>
</div>
