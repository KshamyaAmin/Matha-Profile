@echo off
setlocal enabledelayedexpansion
title Matha Profile - Server Launcher

:: Ensure we run from the project root directory
cd /d "%~dp0"

echo ============================================================
echo               MATHA PROFILE - FULLSTACK LAUNCHER
echo ============================================================
echo.

:: 1. Verify Node.js / npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js / npm was not found in your PATH!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 2. Verify Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python was not found in your PATH!
    echo Please install Python from: https://www.python.org/
    echo.
    pause
    exit /b 1
)

:: 3. Check for node_modules
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] npm install failed. Please inspect the error above.
        pause
        exit /b 1
    )
)

:: 4. Detect Python interpreter (Virtualenv or Global)
set "PYTHON_EXE=python"
if exist "%~dp0backend\.venv\Scripts\python.exe" (
    set "PYTHON_EXE=%~dp0backend\.venv\Scripts\python.exe"
    echo [INFO] Using backend virtualenv: backend\.venv
) else if exist "%~dp0backend\venv\Scripts\python.exe" (
    set "PYTHON_EXE=%~dp0backend\venv\Scripts\python.exe"
    echo [INFO] Using backend virtualenv: backend\venv
) else if exist "%~dp0.venv\Scripts\python.exe" (
    set "PYTHON_EXE=%~dp0.venv\Scripts\python.exe"
    echo [INFO] Using virtualenv: .venv
) else if exist "%~dp0venv\Scripts\python.exe" (
    set "PYTHON_EXE=%~dp0venv\Scripts\python.exe"
    echo [INFO] Using virtualenv: venv
) else (
    echo [INFO] Using system Python
)

echo.
echo [1/2] Launching Backend Server (FastAPI)...
start "Matha Profile - Backend (FastAPI)" /d "%~dp0backend" cmd /k "title Matha Profile - Backend (FastAPI) && echo ====================================================== && echo           Matha Profile - Backend (FastAPI) && echo ====================================================== && echo. && "!PYTHON_EXE!" -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

:: Wait 2 seconds before launching frontend
timeout /t 2 /nobreak >nul 2>&1 || ping -n 3 127.0.0.1 >nul

echo [2/2] Launching Frontend Server (Next.js)...
start "Matha Profile - Frontend (Next.js)" /d "%~dp0" cmd /k "title Matha Profile - Frontend (Next.js) && echo ====================================================== && echo           Matha Profile - Frontend (Next.js) && echo ====================================================== && echo. && npm run dev"

echo.
echo ============================================================
echo               SERVERS LAUNCHED SUCCESSFULLY!
echo ============================================================
echo   - Frontend  : http://localhost:3000
echo   - Backend   : http://localhost:8000
echo   - API Docs  : http://localhost:8000/docs
echo ============================================================
echo.
echo Opening the web application in your browser in 4 seconds...
timeout /t 4 /nobreak >nul 2>&1 || ping -n 5 127.0.0.1 >nul
start http://localhost:3000

echo.
echo You can close this launcher window at any time.
echo Both servers will continue running in their own windows.
echo (To stop them, close each window or run stop.bat)
echo.
pause
