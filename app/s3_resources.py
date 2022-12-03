import boto3
from app.config import S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

def _get_s3_resource():
    # if S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY:
        # return boto3.resource(
            # 's3', 
            # aws_access_key_id = S3_ACCESS_KEY_ID, 
            # aws_seret_access_key = S3_SECRET_ACCESS_KEY
        # )
    # else:
    return boto3.resource('s3')

def get_bucket():
    s3_resource = _get_s3_resource()
    return s3_resource.Bucket(S3_BUCKET);

def upload_image_to_s3_bucket(image):
    s3_bucket = get_bucket()
    s3_bucket.Object(image.filename).put(Body=image)

def delete_file_from_s3_bucket(filename):
    s3_bucket = get_bucket()
    s3_bucket.Object(filename).delete()

def get_signed_url(filename):
    s3_client = boto3.client('s3')
    params = {'Bucket': S3_BUCKET, 'Key': filename}
    signed_url = s3_client.generate_presigned_url('get_object', params)
    return signed_url