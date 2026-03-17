import { Body, Controller, Post } from "@nestjs/common";
import { JornadaService } from "../services/jornada.service";

@Controller("jornada")
export class JornadaController {

  constructor(
    private service: JornadaService
  ) {}

  @Post("iniciar")
  iniciar(@Body("codigo") codigo: string) {
    return this.service.iniciar(codigo);
  }

  @Post("terminar")
  terminar(@Body("id") id: number) {
    return this.service.terminar(id);
  }

}