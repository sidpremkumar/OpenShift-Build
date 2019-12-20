FROM fedora:latest

RUN dnf -y install \
    git \
    python3-pip \
    python3-requests

COPY . .

RUN python3 test_data/test.py