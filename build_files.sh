#/bin/sh

declare -A osInfo;
osInfo[/etc/redhat-release]=yum
osInfo[/etc/arch-release]=pacman
osInfo[/etc/gentoo-release]=emerge
osInfo[/etc/SuSE-release]=zypp
osInfo[/etc/debian_version]=apt-get
osInfo[/etc/alpine-release]=apk

for f in ${!osInfo[@]}
do
    if [[ -f $f ]];then
        echo Package manager: ${osInfo[$f]}
    fi
done

echo "Deployement started..."

python3 -V
pip3 install --upgrade pip --quiet
pip3 install -r requirements.txt --quiet

python3 manage.py makemigrations
python3 manage.py makemigrations --merge
python3 manage.py migrate

python3 manage.py collectstatic --noinput


echo "Deployement finished..."
