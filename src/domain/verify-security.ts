
interface Headers {

    token: string;
    uuid: string;
}

export interface VerifySecurityParams{

    headers: Headers
}

export interface VerifySecurity {

    exec(params: VerifySecurityParams):  Promise<Boolean>;

}