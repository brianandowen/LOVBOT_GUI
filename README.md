# 💻 LOVBOT_GUI｜Minecraft 掛機自動化機器人控制台

LOVBOT_GUI 是一款專為 Minecraft 撰寫的自動化控制台，整合 Microsoft 登入、目標攻擊、自動傳送等功能，並提供 Electron GUI 介面以簡單操作多帳號自動行為。此工具適合需要掛機刷怪、守家、報位等功能的玩家使用。

---

## 🚀 功能特色

- 🔐 **Microsoft OAuth 登入支援**（透過 prismarine-auth）
- 👥 **多帳號同時控制**（透過 `accounts.json` 配置）
- ⚔️ **自動攻擊指定目標生物**（如 Shulker）
- 🧭 **自動傳送回家位置**（偏離後自動 /warp）
- 💬 **定時位置回報**（每 10 分鐘自動發送坐標）
- 📦 **GUI 操作介面**（Electron 製作，直觀控制啟動與日誌）

---

## 📦 專案結構
```
LOVBOT_GUI/
├── .auth/ # Microsoft 登入快取資料夾（請勿上傳）
├── bots/
│ └── bot_template.js # 單一 bot 行為邏輯
├── src/
│ ├── index.html # 控制台 UI
│ └── panel.js # 控制台行為腳本
├── accounts.json # 帳號與行為設定
├── main.js # Electron 主程式
├── install.bat # Windows 安裝指令（可選）
├── start.bat # Windows 啟動指令（可選）
├── package.json # Node.js 專案資訊
├── .gitignore # 忽略檔案列表
└── README.md # 使用說明文件
```
---

## ⚙️ 安裝與啟動

### 1️⃣ 安裝依賴
npm install

### 2️⃣ 啟動 GUI 介面
npm start

### 3️⃣ 打包應用程式（Windows 可執行檔）
npm run dist

---

## 📝 帳號設定：accounts.json
```
[
  {
    "id": "bot1",
    "email": "xxx@example.com",
    "name": "廢土小幫手1",
    "master": "你的ID",
    "enabled": true,
    "autoAttack": true,
    "attackTarget": "shulker",
    "attackRange": 3.5,
    "attackInterval": 10,
    "home": { "x": -476, "y": 150, "z": -535 },
    "warpCommand": "/warp brianandseanowen"
  }
]
```
---

## 🛠 技術堆疊
mineflayer – Minecraft Bot 引擎

prismarine-auth – Microsoft 登入流程

Electron – GUI 視窗應用

Node.js / HTML / CSS / JavaScript

---

### 🙋‍♂️ 作者資訊

本專案由陳庭毅（Chen Ting-Yi）開發  
GitHub：brianandowen  
Mail: brianandowen[at]gmail[dot]com  
專案：Minecraft 自動化掛機工具 LOVBOT_GUI

---

#### 注意事項
本專案為技術展示用途，請遵守遊戲服務條款  

請勿在未經允許的伺服器上使用本工具  

所有登入資訊僅儲存在本地 .auth/ 資料夾，不會上傳  

---

#### ⭐ 歡迎點星星支持本專案！

🔧 使用方式

1. 複製上面內容  
2. 在 VS Code 建立 `README.md`  
3. 貼上並儲存  
4. 然後執行  



