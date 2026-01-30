@echo off
echo ========================================
echo   MEPFacilities - Git Pull Script
echo ========================================
echo.

cd /d "%~dp0"

echo Descargando cambios del repositorio remoto...
git pull

echo.
echo ========================================
echo   Pull completado!
echo ========================================
pause
