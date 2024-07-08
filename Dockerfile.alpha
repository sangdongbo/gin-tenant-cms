FROM registry-vpc.cn-beijing.aliyuncs.com/bluedot/nginx:1.21.1

WORKDIR /usr/share/nginx/html
COPY dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/

EXPOSE 80 443
