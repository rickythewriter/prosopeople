import boto3
from config import S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

def _get_s3_resource():
    if S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY:
        return boto3.resource(
            's3', 
            aws_access_key_id = S3_ACCESS_KEY_ID, 
            aws_seret_access_key = S3_SECRET_ACCESS_KEY
        )
    else:
        return boto3.resource('s3')

def get_bucket():
    s3_resource = _get_s3_resource()
    return s3_resource.Bucket(S3_BUCKET);