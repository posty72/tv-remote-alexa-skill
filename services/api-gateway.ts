import { ApiGatewayManagementApi } from 'aws-sdk'
import { getConnectionIds } from './dynamodb'

export function createConnectionPost(endpoint: string, connectionId: string, data: string): Promise<any> {
    return new ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint
    })
        .postToConnection({
            ConnectionId: connectionId,
            Data: data
        })
        .promise()
}

export async function sendCommand({
    command,
    amount,
    successText,
    errorText,
}: any): Promise<any> {
    const payload = JSON.stringify({
        command,
        amount,
    })

    const connectionItems = await getConnectionIds()
    const ids = connectionItems.Items || []

    return new Promise(async (resolve) => {
        try {
            const listeners = ids.map(({ connectionid, endpoint }) => createConnectionPost(endpoint, connectionid, payload))

            await Promise.all(listeners)

            resolve(createTextResponse(successText))
        } catch (error) {
            console.error(JSON.stringify(error))

            resolve(createTextResponse(errorText))
        }
    })
}

export function createTextResponse(text: string) {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text,
            },
            shouldEndSession: true,
        },
    }
}