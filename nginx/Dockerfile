FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/conf.d/portfolio.conf

CMD /usr/sbin/nginx -g 'daemon off;'
