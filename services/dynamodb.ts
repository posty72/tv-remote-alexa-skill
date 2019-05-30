import { DynamoDB } from 'aws-sdk'

const ddb = new DynamoDB.DocumentClient()
const dbbTable = process.env.DYNAMODB_TABLE

export const addConnection = (connectionId: string, endpoint: string) =>
    ddb.put({
        TableName: dbbTable,
        Item: {
            connectionid: connectionId,
            endpoint,
        },
    }).promise()

export const removeConnectionId = (connectionId: string) =>
    ddb.delete({
        TableName: dbbTable,
        Key: {
            connectionid: connectionId
        }
    }).promise()

export const getConnectionIds = () =>
    ddb.scan({
        TableName: dbbTable,
        ProjectionExpression: 'connectionid, endpoint'
    }).promise()
