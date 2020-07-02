sed -i s/NGINX_PORT/${PORT}/ /etc/nginx/nginx.conf
cd /usr/src/backend
until flask db upgrade
do
  echo "Retrying..."
  sleep 2
done
supervisord
