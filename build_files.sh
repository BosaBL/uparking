# build_files.sh
echo "Deployement started..."

python3 -m venv venv

source venv/bin/activate
python3 -V
pip3 install --upgrade pip --quiet
pip3 install -r requirements.txt --quiet
python3 manage.py collectstatic --noinput


echo "Deployement finished..."
