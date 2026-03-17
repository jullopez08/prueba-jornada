import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Jornada } from '../models/jornada.model';

@Injectable()
export class JornadaService {
  async iniciar(codigo: string) {
    if (!codigo) {
      throw new BadRequestException('Codigo requerido');
    }
    const abierta = await Jornada.findOne({
      where:{
        codigoEmpleado: codigo,
        horaSalida: null,
      },
    });
     if(abierta){
      throw new BadRequestException(
        'Ya cuenta con un cronometro iniciado'
      );
     }

    const jornada = await Jornada.create({
      codigoEmpleado: codigo,
      horaEntrada: new Date(),
      horaSalida: null,
      tiempoTotal: null,
    });

    return jornada;
  }

  async terminar(id: number) {
    const jornada = await Jornada.findByPk(id);

    if (!jornada) {
      throw new NotFoundException('No existe');
    }
 
    const salida = new Date();

    const entreda = jornada.getDataValue('horaEntrada');
    const diffMs = salida.getTime() - entreda.getTime();
    const totalMin = diffMs / 1000 / 60;
    const horas = Math.floor(totalMin / 60);
    const minutos = totalMin % 60;
    let tiempoTexto = ' ';
    if (horas === 0) {
      tiempoTexto = `${minutos}m`;
    } else {
      tiempoTexto = `${horas}h ${minutos.toString().padStart(2, '0')}m`;
    }

    jornada.set('horaSalida', salida);
    jornada.set('tiempoTotal', tiempoTexto);

    await jornada.save();

    return jornada;
  }
}
