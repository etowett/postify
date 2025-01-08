import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make config service available to all other modules
      envFilePath: process.env.ENV === 'local' ? '.dev.env' : '.test.env',
      ignoreEnvFile:
        process.env.ENV === 'prod' ||
        process.env.ENV === 'dev' ||
        process.env.ENV === 'stage',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:
        process.env.ENV === 'local'
          ? join(process.cwd(), 'src/schema.gql')
          : true,
      sortSchema: true,
      debug: true,
      playground: false,
      cache: 'bounded',
      context: ({ req }) => ({ req }),
      plugins: [
        process.env.ENV === 'prod'
          ? ApolloServerPluginLandingPageProductionDefault({
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      minPoolSize: 10,
      maxPoolSize: 100,
      dbName: process.env.DB_NAME,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
