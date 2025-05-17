# lambda_function.py
import boto3
import json
from decimal import Decimal

def lambda_handler(event, context):
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("resume1")

    try:
        # Get current count
        get_response = table.get_item(Key={'id': '1'})
        current_count = get_response.get("Item", {}).get("cnt", 0)

        # Return response
        response = {
            "statusCode": 200,
            "body": json.dumps({"count": int(current_count)})
        }

        # Background update
        table.update_item(
            Key={'id': '1'},
            UpdateExpression="SET cnt = if_not_exists(cnt, :start) + :inc",
            ExpressionAttributeValues={":start": 0, ":inc": 1}
        )

        return response

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed", "error": str(e)})
        }
