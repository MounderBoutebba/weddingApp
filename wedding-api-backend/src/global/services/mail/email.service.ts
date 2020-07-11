import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../presentation/config/config-service';
const configService: ConfigService = new ConfigService();
@Injectable()
export class EmailService {
	constructor() {}

	public sendMmail(content: string, email: string) {
		const mailjet = require('node-mailjet').connect(
			configService.get(`MAIL_USER`),
			configService.get(`MAIL_PASSWORD`)
		);
		const request = mailjet.post('send', { version: 'v3.1' }).request({
			Messages: [
				{
					From: {
						Email: 'rebouh.n@transfonum.com',
						Name: 'WINWEZ SUPPORT'
					},
					To: [
						{
							Email: `${email}`
						}
					],
					Subject: 'Winwez support',
					TextPart: content,
					HTMLPart: `
             <div style="text-align: center;">
                <h4> ${content}</h4>
             </div>
            `
				}
			]
		});
		request
			.then(result => {
				console.log(result.body);
			})
			.catch(err => {
				console.log(err.statusCode);
			});
	}
}
