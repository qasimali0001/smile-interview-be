FROM node:16-alpine

RUN mkdir -p /var/www/smile-be
WORKDIR /var/www/smile-be
ADD . /var/www/smile-be
RUN yarn config set network-timeout 600000 -g
EXPOSE 8000
RUN yarn install
RUN yarn doc
CMD [ "yarn", "start" ]