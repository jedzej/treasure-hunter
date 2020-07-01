sed -i s/NGINX_PORT/${PORT}/ /etc/nginx/nginx.conf
supervisord
