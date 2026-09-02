@echo off
setlocal enabledelayedexpansion
title Matha Profile - Stop Servers

echo ============================================================
echo           Stopping Matha Profile Servers...
echo ============================================================
echo.

:: Stop process on port 3000 (Frontend)
echo [*] Checking for frontend server on port 3000...
set "FOUND_FRONTEND=0"
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    set "FOUND_FRONTEND=1"
    echo Stopping process PID %%a...
    taskkill /F /PID %%a >nul 2>&1
)
if "!FOUND_FRONTEND!"=="1" (
    echo [OK] Frontend server stopped.
) else (
    echo [INFO] No server listening on port 3000.
)

echo.
:: Stop process on port 8000 (Backend)
echo [*] Checking for backend server on port 8000...
set "FOUND_BACKEND=0"
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    set "FOUND_BACKEND=1"
    echo Stopping process PID %%a...
    taskkill /F /PID %%a >nul 2>&1
)
if "!FOUND_BACKEND!"=="1" (
    echo [OK] Backend server stopped.
) else (
    echo [INFO] No server listening on port 8000.
)

echo.
echo ============================================================
echo Servers have been stopped.
echo ============================================================
timeout /t 3 >nul 2>&1 || ping -n 4 127.0.0.1 >nul
