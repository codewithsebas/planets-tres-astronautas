# Planets - Three Astronauts
This application provides you with detailed information about the planets of the solar system. Through an intuitive search engine, you can easily explore the available planets.

Simply select a planet from the list to access comprehensive and fascinating information about it.

## First steps

### Create a project in Supabase
To start and have your own planet database, log in to [Supabase](https://supabase.com/dashboard/sign-in).

You will find a **New project** button; select your organization and enter a name for your project. You can generate or enter a password for your database.

When you finish creating your project, it will start loading the configuration for your database in Supabase, and your **Project URL** and **Project API Keys** will appear right there.

If you miss this screen, you can go to the left side menu, enter **Project Settings**, then **API** , and you will see your **API Settings**.

### Create your table in the database

Here is the link to download the queries needed for the following steps:
[TXT Query File](public/documentation/Querys.txt)

1. Enter the left side menu and go to **SQL Editor**. Paste the first query to create your `planets` table.
   When you paste it, you can click on the **Run selected** button.

2. Once you have your table, comment out the **CREATE TABLE planets** query and add the following query to insert data into your table.
   Once you paste it, you can click on the **Run selected** button.

## Configure your local project
Create a `.env.local` file and define the environment variables.
`.env.local`

Once you have your environment variables, paste your **Project URL** as `NEXT_PUBLIC_SUPABASE_URL` and your **Project API Keys** as `NEXT_PUBLIC_SUPABASE_ANON_KEY`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## You can now run the project 
By executing the following commands
```bash
npm run dev
```

And now open [http://localhost:3000](http://localhost:3000) and you can use the App.
