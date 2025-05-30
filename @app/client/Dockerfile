FROM node:20-alpine

# Set working directory
ARG APP_WORKDIR=/var/www
WORKDIR $APP_WORKDIR

# Enable Corepack
RUN corepack enable pnpm

# Copy only the necessary files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY @app/client ./@app/client

RUN --mount=type=cache,id=pnpm,target=$APP_WORKDIR/pnpm/store pnpm install

EXPOSE 5173

CMD [ "pnpm", "--filter", "@app/client", "dev", "--host" ]