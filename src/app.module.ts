import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { Mongoose } from 'mongoose';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath:  join(__dirname,'..','public'),
    }),
    //MongooseModule.forRoot('mongodb://lobo.local:27017/nest-pokemon'),
    MongooseModule.forRoot(process.env.MONGODB || '', {dbName:'pokemonsdb'}),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {}
