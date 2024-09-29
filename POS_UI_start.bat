@echo off
chcp 65001 > nul

:: 確保切換到包含 package.json 的目錄
cd /D "%~dp0"

echo 正在 POS-UI 文件夾中執行 npm start...
npm start

echo POS-UI 應用已成功啟動。
pause
