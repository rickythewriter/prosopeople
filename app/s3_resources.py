import boto3
from app.config import S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY

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

def upload_image_to_s3_bucket(image, bucket):
    bucket.upload_fileobj(image, S3_BUCKET, image.filename)

def delete_file_from_s3_bucket(filename, bucket):
    bucket.Object(S3_BUCKET, filename).delete()

def get_signed_url(filename):
    params = {'Bucket': S3_BUCKET, 'KEY': filename}
    response = s3.generate_presigned_url('get_object', params)
    end_idx = response.index("?")
    image_url = response[0:end_idx]
    return image_url