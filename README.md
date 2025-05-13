# Mist - Board games marketplace
## TI603I Project

### Installation

**Clone the repository**
```bash
git clone https://github.com/leflon/TI603I-Project.git
```

**Install dependencies**

This project was made using `Bun`. To ensure best performances and compatibility, we recommend you use it too.

If you really do not wish to install bun, you can use `node` & `npm` to run the project.


*Client*
```bash
cd client && bun install
```
*Server*
```bash
cd server && bun install
```

**Initialize Database**

First, create the database in MySQL
```sql
CREATE DATABASE <your_db_name>
```

Then, run the scripts found in `database/`
```bash
mysql -u <user> -p <your_db_name> < schemas.sql
mysql -u <user> -p <your_db_name> < populate.sql
mysql -u <user> -p <your_db_name> < functions.sql
mysql -u <user> -p <your_db_name> < indexes.sql
mysql -u <user> -p <your_db_name> < views.sql
mysql -u <user> -p <your_db_name> < triggers.sql
```


**Populate env variables**

In both `client` and `server`, rename `.env.example` to `.env` and fill in the variables.

**Start the dev environment**

*Server*
```bash
bun run dev
```

*Client*

```bash
bun run dev
```
