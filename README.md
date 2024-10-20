# Planets - Three Astronauts

This application provides you with detailed information about the planets of the solar system. Through an intuitive search engine, you can easily explore the available planets.

Simply select a planet from the list to access comprehensive and fascinating information about it.

## Deploy

Link Deploy: [https://planets-tres-astronautas.vercel.app/?search=&sort=asc&page=1](https://planets-tres-astronautas.vercel.app/?search=&sort=asc&page=1)

## First steps

### Create a project in Supabase

To start and have your own planet database, log in to [Supabase](https://supabase.com/dashboard/sign-in).

If you are new to Supabase, when you log in, you will see the main screen to create a new project. If you have used Supabase before, the **New Project** button will appear. Select your organization and enter a name for your project. You can generate or enter a password for your database.

When you finish creating your project, it will start loading the configuration for your database in Supabase, and your **Project URL** and **Project API Keys** will appear right there.

If you miss this screen, you can go to the left side menu, enter **Project Settings**, then **API** , and you will see your **API Settings**.

### Create your table in the database

Here are the steps to create and insert the data in SUPABASE

1. Go to the left menu and go to **SQL Editor**. 2. Paste the first query to create your `planets` table go to this TXT file and copy the Create table Query
   [TXT query file](public/documentation/Querys.txt).
   When you paste it, you can click on the **Execute Selected** button.

2. Once you have your table, delete the **CREATE TABLE planets** query and add the following query to insert data into your table go into this TXT file and copy the QUERY Insert into planets.
   Once pasted, press the **EXECUTE SELECTED** button.

## Clone repository

Clone the repository and follow the steps below:

```bash
https://github.com/codewithsebas/planets-tres-astronautas.git
```

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

## Technologies used

React with Next.js was used for this test, integrating the frontend and backend y Supabase for the database.

In addition, Zustand was used to manage the global state of the application, as well as Tailwind CSS and the React Icons icon library. For the backend, the data inspiration came from api.le-systeme-solaire.net, an API that provides information about planets.

React Documentation: [https://react.dev/reference/react](https://react.dev/reference/react)

Nextjs Documentation:[https://nextjs.org/docs](https://nextjs.org/docs)

SUPABASE Documentation: [https://supabase.com/docs](https://supabase.com/docs)

Tailwindcss Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

Zustand Documentation: [https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/)

React Icons: [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/)

API system solaire: [https://api.le-systeme-solaire.net/rest/bodies](https://api.le-systeme-solaire.net/rest/bodies)
