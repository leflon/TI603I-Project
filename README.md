# Mist - Board games marketplace
## TI603I Project

### Installation

**Clone the repository**
```bash
git clone https://github.com/leflon/TI603I-Project.git
```

**Install dependencies**

This project was made using `Bun`. To ensure best performances and compatibility, we recommend you use it too.

If you really do not wish to install bun, you can use `node` & `npm` to run the project. (Note that in this case, the scripts will have to be modified accordingly)

```bash
# Run this command at the project root to install client, server, and workspace dependencies.  
bun install-all
```

**Initialize Database**

First, create the database in MySQL
```sql
CREATE DATABASE <your_db_name>
```

Then, run the initialization script found in `database/`
```bash
mysql -u <user> -p <your_db_name> < init.sql

```

**Populate env variables**

In both `client` and `server`, rename `.env.example` to `.env` and fill in the variables.

**Start the dev environment**

You can either run server and client separately:

*Server*
```bash
cd server && bun run dev
```

*Client*

```bash
cd client && bun run dev
```

Or run them concurrently in one terminal:

```bash
bun run dev
```
