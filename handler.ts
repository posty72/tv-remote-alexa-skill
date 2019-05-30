import { Callback, Context } from 'aws-lambda'
import * as tvCommands from './config/tv-commands'
import { createConnectionPost, createTextResponse, sendCommand } from './services/api-gateway'
import { addConnection, removeConnectionId } from './services/dynamodb'

export async function connect(event: any, _context: Context, callback: Callback) {
    const connectionId = event.requestContext.connectionId
    const endpoint = `https://${event.requestContext.domainName}/${event.requestContext.stage}`

    await addConnection(connectionId, endpoint)

    callback(null, {
        statusCode: 201,
    })
}

export async function disconnect(event: any, _context: Context, callback: Callback) {
    const connectionId = event.requestContext.connectionId

    await removeConnectionId(connectionId)

    callback(null, {
        statusCode: 204,
    })
}

export async function main(event: any, _context: Context, callback: Callback) {
    const endpoint = `https://${event.requestContext.domainName}/${event.requestContext.stage}`
    const connectionid = event.requestContext.connectionId
    const payload = `echo route received: ${event.body}`

    await createConnectionPost(endpoint, connectionid, payload)

    callback(null, {
        statusCode: 200,
    })
}

export async function remoteCommands(event: any, _context: Context, callback: Callback) {
    const intent = event.request.intent
    let amount: number, channel: number,
        response = createTextResponse('Hmm, I don\'t think the remote can do that yet.')

    try {
        switch (intent.name) {
            case 'on':
                response = await sendCommand(tvCommands.turnOn())
                break
            case 'off':
                response = await sendCommand(tvCommands.turnOff())
                break
            case 'mute':
                response = await sendCommand(tvCommands.mute())
                break
            case 'volume_up':
                amount = Number(intent.slots.amount.value)
                response = await sendCommand(tvCommands.volumeUp(amount))
                break
            case 'volume_down':
                amount = Number(intent.slots.amount.value)
                response = await sendCommand(tvCommands.volumeDown(amount))
                break
            case 'set_channel':
                channel = intent.slots.channel.value
                response = await sendCommand(tvCommands.setChannel(channel))
                break
            case 'cycle_input':
                response = await sendCommand(tvCommands.cycleInput())
                break
            case 'AMAZON.FallbackIntent':
            default:
        }
    } catch (error) {
        console.error(error)
    }

    callback(null, response)
}
