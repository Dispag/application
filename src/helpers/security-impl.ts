import "reflect-metadata";
import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";

import { Security, SecurityParams, LoginParams } from "../domain/index";
import { TokenExpiradoError } from "../exceptions";

const secret = process.env.SECRET || "123456";

@Injectable()
export class SecurityImpl implements Security {
  params: SecurityParams;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  private async tokenExpirado(): Promise<boolean> {
    verify(this.params.headers.token, secret, function (err) {
      if (err) {
        throw new TokenExpiradoError("Token Expirado");
      }
    });
    return false;
  }

  private async haTokenEUuid(): Promise<boolean> {
    return (
      !this.params.headers ||
      !this.params.headers.token ||
      !this.params.headers.uuid
    );
  }

  public async exec(params: SecurityParams): Promise<boolean> {
    this.params = params;
    const haTokenEUuid = new Promise<boolean>(() => this.haTokenEUuid());
    const tokenExpirado = new Promise<boolean>(() => this.tokenExpirado());
    return await Promise.all<boolean>([haTokenEUuid, tokenExpirado]).then(
      (results) => results.reduce((result1, result2) => result1 && !result2)
    );
  }

  public gerarToken(params: LoginParams): string {
    return sign({ id: params.user, senha: params.senha }, secret, {
      expiresIn: 86400, // validade do token, 24hrs
    });
  }
}
