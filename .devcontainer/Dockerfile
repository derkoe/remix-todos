ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

ENV DATABASE_URL=postgresql://todos:mypassword@localhost:5432/todos

RUN \
    apt update \
    && apt install -y postgresql-client \
    && apt clean -y && rm -rf /var/lib/apt/lists/*
