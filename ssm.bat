@echo off
echo 1����ssm    2����    3��������
set /p input=��ѡ��
if %input% == 1 (
	echo building
	mvn install
)
if %input% == 2 (
	xcopy "D:\GitWorkspace\java\ssm\target\ssm.war" "D:\Tomcat 8.0\webapps\" /Y
)
if %input% == 3 (
	cd D:\Tomcat 8.0\bin\
	startup.bat
	echo startup finished
)
cd D:\GitWorkspace\java\ssm
echo finished

