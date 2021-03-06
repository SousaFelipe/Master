/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'


export default Env.rules({

    APP_NAME: Env.schema.string(),

    PORT: Env.schema.number(),
    HOST: Env.schema.string({ format: 'host' }),
    NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),
    APP_KEY: Env.schema.string(),

    DRIVE_DISK: Env.schema.enum(['local'] as const),
    SESSION_DRIVER: Env.schema.string(),
    CACHE_VIEWS: Env.schema.boolean(),
})
