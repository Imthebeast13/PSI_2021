// Conectar ao computador da FCUL

> ssh psi014@appserver.alunos.di.fc.ul.pt

pass: habibi2021

// Ligar ao mongo no computador da FCUL

> mongo --username psi014 --password --authenticationDatabase psi014 appserver.alunos.di.fc.ul.pt/psi014

// Transferir um ficheiro por ssh

> scp _FICHEIRO_A_TRANSFERIR_ psi014@appserver.alunos.di.fc.ul.pt:/home/psi014/_FICHEIRO_A_RECEBER_

// Transferir pasta por ssh

> scp -r _PASTA_A_TRANSFERIR_ psi014@appserver.alunos.di.fc.ul.pt:/home/psi014/_PASTA_A_RECEBER_

// Primeira execução no computador da FCUL

Assegurar que o package _nodemon_ foi removido visto que é desnecessário:

> npm uninstall nodemon

e remover o _nodemon_ dos scripts de execução do backend.
Além disso, fazer os seguintes comandos na pasta _backend_ e _frontend_:

> npm install
> npm install pm2

// Iniciar frontend

> ng serve --port 3014 --host 0.0.0.0 --disableHostCheck true

// Iniciar backend

> npm run serverstart

// PM2

Em cada respectiva pasta do _backend_ e _frontend_:

> ./node_modules/.bin/pm2 start start.sh --name frontend --watch
> ./node_modules/.bin/pm2 start start.sh --name backend --watch

Guardar:

> ./node_modules/.bin/pm2 save

Parar:

> ./node_modules/.bin/pm2 stop [PROCESS-NAME]

Delete:

> ./node_modules/.bin/pm2 delete [PROCESS-NAME]

// Endereços

Frontend:

http://appserver.alunos.di.fc.ul.pt:3014/

Backend:

http://appserver.alunos.di.fc.ul.pt:3064/
