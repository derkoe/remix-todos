ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN \
    apt update \
    && apt install -y postgresql-client \
    && apt clean -y && rm -rf /var/lib/apt/lists/*
