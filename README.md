The focus of this project is to create an example of hexagonal architecture in TypeScript for backend application with usage of Elastic.
Some concepts (validation, errors handling, security, ...) were intentionally skipped for simplicity of example.

npm install --global yarn
yarn install



Generate migrations
tsc
npm run typeorm migration:generate ./src/migrations/Name -- -d dist/config/db/data-source.js
Run migrations
tsc
yarn run typeorm:migrate


docker compose up -d


Generate authors with CLI:
yarn run start-cli:dev --entity=author --count=3

Generate stories for all authors with CLI:
yarn run start-cli:dev --entity=story