const { createBot } = require('mineflayer');
const { Authflow } = require('prismarine-auth');
const fs = require('fs');
const path = require('path');

const email = process.argv[2];
const master = process.argv[3];

const configList = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));
const config = configList.find(acc => acc.email === email);
if (!config) {
  console.log(`❌ 找不到 ${email} 的設定`);
  process.exit(1);
}

console.log(`[登入中] ${email}（使用 Microsoft 授權登入）...`);

const authFlow = new Authflow(email, path.join(__dirname, '../.auth'));

authFlow.getMinecraftJavaToken().then((auth) => {
  const bot = createBot({
    username: auth.mcname,
    auth: 'microsoft',
    accessToken: auth.token,
    host: config.host || 'mcfallout.net',
    port: config.port || 25565,
    version: '1.20.4'
  });

  bot.once('spawn', () => {
    console.log(`🟢 ${email} 已進入伺服器`);

    // ✅ 若 autoAttack 為 true，執行攻擊與報位
    if (config.autoAttack) {
      console.log(`⚔️ 啟動攻擊 ${config.attackTarget}，每 ${config.attackInterval}s，距離 ≤ ${config.attackRange}`);
      setInterval(() => {
        const target = bot.nearestEntity(e =>
          e.name === config.attackTarget &&
          e.position &&
          bot.entity.position.distanceTo(e.position) <= config.attackRange
        );
        if (target) {
          bot.attack(target);
          console.log(`👊 攻擊 ${config.attackTarget} @ ${target.position}`);
        } else {
          console.log(`❌ 找不到 ${config.attackTarget}（在 ${config.attackRange} 格內）`);
        }
      }, config.attackInterval * 1000);

      // ✅ 定時報位
      setInterval(() => {
        const pos = bot.entity.position;
        bot.chat(`目前位置 X:${pos.x.toFixed(1)} Y:${pos.y.toFixed(1)} Z:${pos.z.toFixed(1)}`);
      }, 10 * 60 * 1000);
    }

    // ✅ 無論是否攻擊，都啟用守位置傳送
    const HOME = config.home || { x: -476, y: 150, z: -535 };
    const WARP = config.warpCommand || '/warp brianandseanowen';

    setInterval(() => {
      const pos = bot.entity.position;
      if (
        Math.round(pos.x) !== HOME.x ||
        Math.round(pos.y) !== HOME.y ||
        Math.round(pos.z) !== HOME.z
      ) {
        bot.chat(WARP);
        console.log(`📦 ${config.name} 離開座標，自動傳送 ${WARP}`);
      }
    }, 15000);
  });

  bot.on('error', err => {
    console.log(`❌ ${email} 登入錯誤:`, err.message);
  });

  bot.on('kicked', reason => {
    console.log(`❌ 被伺服器踢出：`, reason);
  });

  bot.on('end', () => {
    console.log(`🔴 ${email} 已離線`);
  });

}).catch(err => {
  console.log(`❌ Microsoft 授權登入失敗：${err.message}`);
});
