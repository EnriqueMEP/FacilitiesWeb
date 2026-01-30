@echo off
echo ========================================
echo   MEPFacilities - Git Push Script
echo ========================================
echo.

cd /d "%~dp0"

echo Añadiendo todos los cambios...
git add -A

echo.
set /p mensaje="Mensaje del commit: "

if "%mensaje%"=="" (
    set mensaje=Actualización
)

echo.
echo Haciendo commit...
git commit -m "%mensaje%"

echo.
echo Subiendo cambios al repositorio remoto...
git push

echo.
echo ========================================
echo   Push completado!
echo ========================================
pause
