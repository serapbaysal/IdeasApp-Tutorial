import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaController } from './idea/idea.controller';
import { IdeaEntity } from './idea/idea.entity';
import { IdeaModule } from './idea/idea.module';
import { IdeaService } from './idea/idea.service';
import { Repository } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';


@Module({
  imports: [TypeOrmModule.forRoot(),TypeOrmModule.forFeature([IdeaEntity])],
  controllers: [AppController, IdeaController],
  providers: [AppService,IdeaService, {
    provide: APP_FILTER,
    useClass:HttpErrorFilter
  }],
})
export class AppModule {}
