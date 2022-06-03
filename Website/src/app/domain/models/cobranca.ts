import { Carteira } from "./carteira";
import { User } from "./user";

export class Cobranca{
   id: number;
   valor: number;
   descricao: string;
   data: Date;

   fromUserId: string;
   fromUser: User;

   toUserId: string;
   toUser: User;

   fromCarteiraId: number;
   fromCarteira: Carteira;

   toCarteiraId: number;
   toCarteira: Carteira;

   cobrancaAtiva: Boolean;

   constructor(id: number, Valor: number, Descricao: string, Data: Date, FromUserId: string, FromUser: User, ToUserId: string, ToUser: User, FromCarteiraId: number, FromCarteira: Carteira, ToCarteiraId: number, ToCarteira: Carteira, CobrancaAtiva: Boolean){ 
      this.id = id;
      this.valor = Valor;
      this.descricao = Descricao;
      this.data = Data;

      this.fromUserId = FromUserId;
      this.fromUser = FromUser;

      this.toUserId = ToUserId;
      this.toUser = ToUser;

      this.fromCarteiraId = FromCarteiraId;
      this.fromCarteira = FromCarteira;

      this.toCarteiraId = ToCarteiraId;
      this.toCarteira = ToCarteira;

      this.cobrancaAtiva = CobrancaAtiva;
   }
}