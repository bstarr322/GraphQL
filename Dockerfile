FROM centos:7.1.1503

# TODO: Set these externally.
ENV APP_NAME graphql-frontend
ENV APP_VERSION 0.0.1
ENV APP_FULL_NAME ${APP_NAME}-${APP_VERSION}
ENV DIST_FILE ${APP_FULL_NAME}.zip

RUN yum -y install epel-release

# Set servertime to UTC.
RUN ln -s -f /usr/share/zoneinfo/UTC /etc/localtime

# Setup gosu for easier command execution
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
    && curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.2/gosu-amd64" \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.2/gosu-amd64.asc" \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && rm -r /root/.gnupg/ \
    && chmod +x /usr/local/bin/gosu
    
RUN yum install -y unzip

# Install application dependencies
RUN yum install -y npm supervisor

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle code into app.
COPY . /app/
# Retrieve node dependencies
RUN npm install

# Make start script executable
RUN chmod +x /app/start-service.sh

# Copy supervisor configuration into container (should this be here?)
COPY supervisord.conf /etc/supervisord.conf

# Cleanup
RUN yum remove -y unzip

CMD ["/usr/bin/supervisord"]

