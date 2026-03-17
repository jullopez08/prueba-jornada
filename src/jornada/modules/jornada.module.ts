import { Module } from "@nestjs/common";
import { JornadaController } from "../controllers/jornada.controller";
import { JornadaService } from '../services/jornada.service';

@Module({
  controllers: [JornadaController],
  providers: [JornadaService],
})
export class JornadaModule {}