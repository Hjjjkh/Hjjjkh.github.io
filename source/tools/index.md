---
title: 在线工具
layout: page
---

<style>
.tool-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "Microsoft YaHei", sans-serif;
}

.tool-card {
  background-color: var(--board-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 2.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.tool-card h2 {
  margin-top: 0;
  font-size: 1.8em;
  border-bottom: 2px solid var(--link-hover-color);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.tool-group {
  margin-bottom: 1.5rem;
}

.tool-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}

.tool-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--line-color);
  border-radius: 6px;
  background-color: var(--body-bg-color);
  color: var(--text-color);
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.tool-input:focus {
  outline: none;
  border-color: var(--link-hover-color);
  box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.2);
}

.tool-buttons {
  display: flex;
  gap: 15px;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.tool-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: var(--link-hover-color);
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.tool-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.tool-result {
  margin-top: 1.5rem;
  padding: 15px;
  background-color: var(--body-bg-color);
  border-radius: 6px;
  border: 1px solid var(--line-color);
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace;
  color: var(--post-text-color);
}

.tool-result strong {
  color: var(--post-heading-color);
}

.current-timestamp {
    margin-bottom: 2rem;
    text-align: center;
}

.current-timestamp-label {
    font-size: 1.1em;
    color: var(--sec-text-color);
}

.current-timestamp-value {
    font-size: 2em;
    font-weight: 600;
    color: var(--post-heading-color);
    letter-spacing: 1px;
    margin-top: 8px;
}

</style>

<div class="tool-container">

  <div class="tool-card">
    <h2>时间戳转换</h2>

    <div class="current-timestamp">
        <div class="current-timestamp-label">当前 Unix 时间戳 (秒)</div>
        <div id="current-timestamp-value" class="current-timestamp-value"></div>
    </div>

    <div class="tool-group">
      <label for="timestamp-input">Unix 时间戳 (秒或毫秒)</label>
      <input type="text" id="timestamp-input" class="tool-input" placeholder="例如: 1672531200">
    </div>
    <div class="tool-buttons">
      <button id="ts-to-date-btn" class="tool-button">转换为日期</button>
    </div>
    <div id="ts-to-date-result" class="tool-result" style="display: none;"></div>

    <hr style="margin: 2.5rem 0;">

    <div class="tool-group">
      <label for="date-input">日期和时间</label>
      <input type="text" id="date-input" class="tool-input" placeholder="例如: 2023-01-01 08:00:00">
    </div>
    <div class="tool-buttons">
      <button id="date-to-ts-btn" class="tool-button">转换为时间戳</button>
      <button id="set-current-time-btn" class="tool-button">填充当前时间</button>
    </div>
    <div id="date-to-ts-result" class="tool-result" style="display: none;"></div>
  </div>

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const currentTimeElem = document.getElementById('current-timestamp-value');
    const timestampInput = document.getElementById('timestamp-input');
    const tsToDateBtn = document.getElementById('ts-to-date-btn');
    const tsToDateResult = document.getElementById('ts-to-date-result');
    const dateInput = document.getElementById('date-input');
    const dateToTsBtn = document.getElementById('date-to-ts-btn');
    const setCurrentTimeBtn = document.getElementById('set-current-time-btn');
    const dateToTsResult = document.getElementById('date-to-ts-result');

    function updateCurrentTimestamp() {
        currentTimeElem.textContent = Math.floor(Date.now() / 1000);
    }

    function formatDateTime(date) {
        const Y = date.getFullYear();
        const M = String(date.getMonth() + 1).padStart(2, '0');
        const D = String(date.getDate()).padStart(2, '0');
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }

    tsToDateBtn.addEventListener('click', function() {
        const ts = timestampInput.value.trim();
        if (!ts || !/^-?\d+$/.test(ts)) {
            tsToDateResult.innerHTML = '<strong>错误:</strong> 请输入有效的时间戳数字。';
            tsToDateResult.style.display = 'block';
            return;
        }
        
        const tsNumber = parseInt(ts, 10);
        // Auto-detect seconds or milliseconds
        const date = new Date(ts.length > 10 ? tsNumber : tsNumber * 1000);
        
        if (isNaN(date.getTime())) {
            tsToDateResult.innerHTML = '<strong>错误:</strong> 无效的时间戳。';
        } else {
            tsToDateResult.innerHTML = `<strong>北京时间 (GMT+8):</strong> ${formatDateTime(date)}`;
        }
        tsToDateResult.style.display = 'block';
    });

    dateToTsBtn.addEventListener('click', function() {
        const dateStr = dateInput.value.trim();
        if (!dateStr) {
            dateToTsResult.innerHTML = '<strong>错误:</strong> 请输入日期和时间。';
            dateToTsResult.style.display = 'block';
            return;
        }
        
        // Replace hyphen with slash for better compatibility
        const date = new Date(dateStr.replace(/-/g, '/'));
        
        if (isNaN(date.getTime())) {
            dateToTsResult.innerHTML = '<strong>错误:</strong> 无效的日期格式。请使用 YYYY-MM-DD HH:mm:ss 格式。';
        } else {
            const tsSec = Math.floor(date.getTime() / 1000);
            const tsMs = date.getTime();
            dateToTsResult.innerHTML = `<strong>时间戳 (秒):</strong> ${tsSec}<br><strong>时间戳 (毫秒):</strong> ${tsMs}`;
        }
        dateToTsResult.style.display = 'block';
    });

    setCurrentTimeBtn.addEventListener('click', function() {
        dateInput.value = formatDateTime(new Date());
    });

    // Initial update and set interval
    updateCurrentTimestamp();
    setInterval(updateCurrentTimestamp, 1000);
});
</script>
