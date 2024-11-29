## Backend

Routine-this backend is built with Deno using npm packages loading them as cache, like `mongoose` this has been built using the MVC structure, backend wise the structure is very clear

Before you continue make sure you have [Deno](https://deno.com/) installed

```bash
src
|-model # Schemas from the mongoDB database
|-controller # Routes/endpoints for REST API
|-environment # Here the environment variables will be set
|-middleware # Middleware like loggers or jwt will be here
|-util # Functions that provide some utility to the project
```

## How to run

Nothing crazy has been done so you can just do.

```bash
deno task dev
``` 

And the project will run, just don't forget to add environment variables, you can find their names at `/environment/environment.ts`, their are named as the variable name, it's self explanatory

