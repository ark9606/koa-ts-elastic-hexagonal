The focus of this project is to create an example of hexagonal architecture in TypeScript for backend application with usage of Elastic.
Some concepts (validation, errors handling, security, ...) were intentionally skipped for simplicity of example.

0. Setting up
```
npm install --global yarn
yarn install
```
1. Start containers
```
docker compose up -d
```

2. Run migrations
```
tsc
yarn run typeorm:migrate
```

Generating new migrations
```
tsc
npm run typeorm migration:generate ./src/migrations/Name -- -d dist/config/db/data-source.js
```


3. Generate authors with CLI:
```
yarn run start-cli:dev --entity=author --count=3
```
4. Generate stories for all authors with CLI:
```
yarn run start-cli:dev --entity=story
```

5. Start app locally
```
yarn run start-web:dev
```
### Load testing

0. Install artillery:
```
yarn add artillery -g
```

1. Install datadog agent:
https://app.datadoghq.eu/signup/agent#macos

2. Run tests:
start Datadog agent (usually starts at http://127.0.0.1:5002/)
```
datadog-agent run
```
start tests
```
artillery run tests/load/stories-load-test.yml
```
3. Results (https://app.datadoghq.eu/dashboard/lists)
Dashboard with metrics:
![dashboard](./docs/dashboard.png "Dashboard")

Example of metric - tolerated, frustrated, satisfied requests:
![metric1](./docs/metric1.png "Metric1")

Example of metric - response time:
![metric2](./docs/metric2.png "Metric2")

Example of metric - avg response time from ElasticSearch (10 ms) and PostgresSQL (5.2k ms):
![metric2](./docs/metric3.png "Metric3")

## Minikube:
Install via ```brew install minikube```

Run minikube
```
minikube start
minikube dashboard
```
Push local image to Docker hub:
```
docker tag koa-ts-elastic-hexagonal-nodeapp:latest ark9606/koa-ts-elastic-hex-repo
docker push ark9606/koa-ts-elastic-hex-repo
```

Create ConfigMap `kubectl apply -f ./k8s/postgresql-config.yml`

Create Secret `kubectl apply -f ./k8s/postgresql-secret.yml`

Create DB (deployment + service) `kubectl apply -f ./k8s/postgresql.yml`

Create Node.js app (deployment + service) `kubectl apply -f ./k8s/nodeapp.yml`

Check all parts with
```
kubectl get all
kubectl get configmap
kubectl get secret
```

Check logs from pod `kubectl logs nodeapp-deployment-58c74f6f5d-kz6g2`

Access to service via `minikube service --url nodeapp-service`

OR

List services to get the port of external service (NodePort from the output):
```
kubectl get service
```

Get IP of cluster to access the pod, via `minikube ip` or INTERNAL-IP from
```
kubectl get node -o wide
```

To access the app, execute `minikube service --url nodeapp-service`

Testing, got to http://127.0.0.1:64767 from `minikube service --url nodeapp-service`

Visit next url:

http://127.0.0.1:64767/ -> Not Found

http://127.0.0.1:64767/authors -> {"message":"relation \"Author\" does not exist"} - means that connection is established, need to run the migrations

Enter the pod and run migrations:
```
kubectl exec --stdin --tty nodeapp-deployment-58c74f6f5d-rn4xf -- /bin/sh
yarn run typeorm:migrate
```

Run again `minikube service --url nodeapp-service`

Visit http://127.0.0.1:64917

Go to http://127.0.0.1:64767/authors -> [] - means that table is empty

SUCCESS!

Link: https://iteritory.com/deploy-node-js-application-in-local-minikube-kubernetes-cluster/
