import os
import boto3
from botocore.client import Config
from dotenv import load_dotenv

load_dotenv()

# Environment variables
RABBITMQ_HOST = os.getenv('RABBITMQ_HOST')
TRANSCODE_QUEUE_NAME = os.getenv('TRANSCODE_QUEUE_NAME')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
S3_BUCKET_ENCODED_NAME = os.getenv('S3_BUCKET_ENCODED_NAME')
STATUS_QUEUE_NAME = os.getenv('STATUS_QUEUE_NAME')
S3_ENDPOINT = os.getenv('S3_ENDPOINT')
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY")

# Initialize the S3 client
s3_client = boto3.client(
    's3',
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY,
    config=Config(signature_version="s3v4")
)
