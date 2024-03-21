FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD Max1
ENV MYSQL_DATABASE to_do

ADD ./infrastructure/prod/dockerfiles/to_do_list.sql /docker-entrypoint-initdb.d
