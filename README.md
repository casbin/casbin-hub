casbin-dashboard
====

Casbin-dashboard is the official web UI (admin portal) for Casbin models and policies. A security administrator can use it to view & edit Casbin models and policy rules.

## Demo

https://dashboard.casbin.org/

## Architecture

Casbin-dashboard contains 2 parts:

Name | Description | Language | Source code
----|------|----|----
Frontend | Web frontend UI for Casbin-dashboard | Javascript + React + Ant Design | https://github.com/casbin/casbin-dashboard/tree/master/web
Backend | RESTful API backend for Casbin-dashboard | Golang + Beego + MySQL | https://github.com/casbin/casbin-dashboard

## Installation

- Get the code:

```shell
go get github.com/casbin/casbin-dashboard
```

- Setup database:

Casbin-dashboard will store its metadata in a MySQL database named: `casbin_metadata`, will create it if not existed. The DB connection string can be specified at: https://github.com/casbin/casbin-dashboard/blob/master/conf/app.conf

```ini
dataSourceName = root:123@tcp(localhost:3306)/
```

Casbin-dashboard uses XORM to connect to DB, so all DBs supported by XORM can also be used.

- Run backend (in port 8000) and frontend (in the same machine's port 3030):

```
npm install
cd web
npm install
cd ..
npm run dev
 ```
<!-- go run main.go -->
<!-- - Run frontend (in the same machine's port 3030):

```
cd web
npm install
npm start
``` -->

- Open browser:

http://localhost:3030/
