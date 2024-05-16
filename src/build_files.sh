# build_files.sh
echo "Deployement started..."

python3 -m venv venv
python3 -V

source venv/bin/activate
pip3 install --upgrade pip --quiet
pip3 install -r requirements.txt --quiet
python3 manage.py collectstatic


echo "Deployement finished..."
