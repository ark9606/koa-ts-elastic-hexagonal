The focus of this project is to create an example of hexagonal architecture in TypeScript for backend application with usage of Elastic.
Some concepts (validation, errors handling, security, ...) were intentionally skipped for simplicity of example.

npm install --global yarn
yarn install



Generate migrations
npm run typeorm migration:generate ./migrations/Name -- -d src/config/db/data-source.ts


docker compose up -d
