
const { spawn } = require('child_process');
const fs = require('fs');
const accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));
const panel = document.getElementById('bot-panel');

accounts.forEach((acc) => {
  const div = document.createElement('div');
  div.className = 'bot-card';
  div.innerHTML = `
    <h3>${acc.name} (${acc.email}) - 狀態：<span id="status-${acc.id}">未啟動</span></h3>
    <button onclick="startBot('${acc.id}', '${acc.email}', '${acc.password}', '${acc.master}')">啟動</button>
    <button onclick="stopBot('${acc.id}')">停止</button>
    <textarea id="log-${acc.id}">(尚無 log)</textarea>
  `;
  panel.appendChild(div);
});

const running = {};

function log(id, text) {
  const area = document.getElementById('log-' + id);
  area.value += `\n${text}`;
}

function startBot(id, email, password, master) {
  if (running[id]) return;
  log(id, '[系統] 啟動中...');
  const p = spawn('node', ['bots/bot_template.js', email, password, master]);
  running[id] = p;
  document.getElementById('status-' + id).innerText = '執行中';

  p.stdout.on('data', (data) => log(id, data.toString()));
  p.stderr.on('data', (data) => log(id, '[錯誤] ' + data.toString()));
  p.on('close', (code) => {
    log(id, '[系統] 已結束，代碼：' + code);
    document.getElementById('status-' + id).innerText = '已關閉';
    delete running[id];
  });
}

function stopBot(id) {
  if (running[id]) {
    running[id].kill();
    log(id, '[系統] 已手動停止');
    document.getElementById('status-' + id).innerText = '已停止';
  }
}
