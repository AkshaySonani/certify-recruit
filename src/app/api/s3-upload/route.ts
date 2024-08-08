import { v4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
} as any);

async function uploadFileToS3(Body: any, fileName: any, location = 'uploads') {
  const Key = `${location}/${v4()}${fileName}`;
  const command = new PutObjectCommand({
    Key,
    Body,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
  });
  await s3Client.send(command);
  return `https://marktoconnect.s3.ap-south-1.amazonaws.com/${Key}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const location = formData.get('location');

    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name, location);
    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json({ error });
  }
}
