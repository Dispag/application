import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, context) => {
        console.log('CHEGOU AQUI...');

        return " Test";
};