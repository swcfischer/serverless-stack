import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);

  if (!result.Items) {
    // will have to get a property on the object
    throw new Error('No items returned');
    return;
  }

  return result.Items;
});
