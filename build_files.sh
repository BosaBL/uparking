#/bin/sh

echo "Deployement started..."

python3 -V
pip3 install --upgrade pip --quiet
pip3 install -r requirements.txt --quiet
pip3 install gdal

python3 manage.py makemigrations
python3 manage.py makemigrations --merge
python3 manage.py migrate

python3 manage.py collectstatic --noinput


echo "Deployement finished..."
