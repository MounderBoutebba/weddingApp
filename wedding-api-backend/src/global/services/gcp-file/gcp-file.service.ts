import { Injectable } from '@nestjs/common';
import * as googleCloudStorage from '@google-cloud/storage';
import { ConfigService } from '../../../presentation/config/config-service';
import { resolve } from 'path';

@Injectable()
export class GcpFileService {

	private readonly configService: ConfigService = new ConfigService();
	private storage = new googleCloudStorage.Storage({
		projectId: this.configService.get('GCLOUD_PROJECT'),
		keyFilename: resolve(this.configService.get('GCS_KEYFILE'))
	});

	public async uploadFile(bucketName, filename: any, gcsname: string) {
		const file = this.storage.bucket(bucketName).file(gcsname);
		const stream = file.createWriteStream({
			metadata: {
				contentType: filename.mimetype
			},
			resumable: false
		});
		stream.on('error', (err) => {
			return 'error upload';
		});

		stream.on('finish', () => {
			return 'sucess upload';
		});

		stream.end(filename.buffer);
		/*
		await this.storage.bucket(bucketName).upload(file, {
			// Support for HTTP requests made with `Accept-Encoding: gzip`
			gzip: true,
			// By setting the option `destination`, you can change the name of the
			// object you are uploading to a bucket.
			metadata: {
				// Enable long-lived HTTP caching headers
				// Use only if the contents of the file will never change
				// (If the contents will change, use cacheControl: 'no-cache')
				cacheControl: 'public, max-age=31536000',
			},
		});*/
		//  console.log(`${filename} uploaded to ${bucketName}.`);
	}

	public async getUrlFile(gcsname: string) {
		const file = this.storage
			.bucket(this.configService.get('GCS_BUCKET'))
			.file(gcsname);

		return await file.getSignedUrl({
			action: 'read',
			expires: '03-09-2491'
		});
	}

	public async removeFile(gcsname: string) {
		const name = gcsname.split('/');
		if (name.length >= 4) {
			const file = this.storage
				.bucket(this.configService.get('GCS_BUCKET'))
				.file((gcsname.split('/')[4]).split('?')[0])
				.delete();
			return await file;
		}
		return;

	}
}
