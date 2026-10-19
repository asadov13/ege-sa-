@echo off
setlocal
cd /d "%~dp0"
if exist "%~dp0runtime\node.exe" goto portable
where node >nul 2>nul
if errorlevel 1 goto missing
node "%~dp0server.mjs" --open
goto finished
:portable
"%~dp0runtime\node.exe" "%~dp0server.mjs" --open
goto finished
:missing
echo Node.js tapilmadi. ZIP faylini tam olaraq qovluga acin.
:finished
pause
