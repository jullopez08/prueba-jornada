import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JornadaModule } from './jornada/modules/jornada.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
     JornadaModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
