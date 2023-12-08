The focus of this project is to create an example of hexagonal architecture in TypeScript for backend application with usage of Elastic.
Some concepts (validation, security, ...) were intentionally skipped for simplicity of example.

npm install --global yarn
yarn install



Generate migrations
npm run typeorm migration:generate ./migrations/Name -- -d src/data-source.t
