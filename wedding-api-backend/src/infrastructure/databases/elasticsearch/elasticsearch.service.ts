import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ConfigService } from '../../../presentation/config/config-service';

const configService = new ConfigService();

@Injectable()
export class ElasticsearchService {
	private readonly esclient: elasticsearch.Client;

	constructor() {
		this.esclient = new elasticsearch.Client({
			host: configService.get(`ELASTIC_HOST`)
		});
		this.esclient.indices
			.create({ index: 'categories' })
			.then(res => res)
			.catch(e => e);
		this.esclient.indices
			.create({ index: 'reservations' })
			.then(res => res)
			.catch(e => e);
		this.esclient.indices
			.putMapping({
				index: 'categories',
				type: '_doc',
				includeTypeName: true,
				body: {
					properties: {
						totalNotes: {
							type: 'float'
						},
						location: {
							properties: {
								geo: {
									type: 'geo_point'
								}
							}
						}
					}
				}
			})
			.then(res => {
				this.esclient.indices
					.putSettings({
						index: 'categories',
						body: {
							'index.mapping.total_fields.limit': 2000
						}
					})
					.then();
			});

		this.esclient.indices
			.putMapping({
				index: 'reservations',
				type: '_doc',
				includeTypeName: true,
				body: {
					properties: {
						location: {
							properties: {
								geo: {
									type: 'geo_point'
								}
							}
						}
					}
				}
			})
			.then(res => res);
	}

	async bulkInsert(index: string, type: string, dataToStore: any) {
		return await this.esclient.index({
			id: dataToStore.userid,
			index,
			type: '_doc',
			body: dataToStore
		});
	}

	async searchIndex(indexP: string, typeP: string, qP: string) {
		const bodyC = {
			query: {
				match_all: {}
			}
		};
		return await this.esclient
			.search({ index: indexP, type: '_doc', body: bodyC })
			.then(res => {
				return res.hits.hits;
			})
			.catch(err => {
				throw new HttpException(err, 500);
			});
	}

	async searchIndexByFileds(indexP: string, typeP: string, qP: string, fieldsP: string[]) {
		const bodyC = {
			query: {
				multi_match: {
					query: qP,
					fields: fieldsP
				}
			}
		};
		return await this.esclient
			.search({ index: indexP, type: '_doc', body: bodyC })
			.then(res => {
				return res.hits.hits;
			})
			.catch(err => {
				throw new HttpException(err, 500);
			});
	}

	async deleteIndexById(indexP: string, typeP: string, idP: string) {
		return await this.esclient
			.delete({ index: indexP, type: '_doc', id: idP })
			.then(res => {
				return res;
			})
			.catch(err => {
				throw new HttpException(err, 500);
			});
	}

	async updateIndexById(indexP: string, typeP: string, idP: string, dataToUpdate: any) {
		try {
			return await this.esclient.update({
				index: indexP,
				type: '_doc',
				id: idP,
				body: { doc: dataToUpdate },
				refresh: 'true',
				retryOnConflict: 10
			});
		} catch (err) {
			throw new HttpException(err, 400);
		}
	}

	async findById(indexP: string, typeP: string, idP: string) {
		try {
			return await this.esclient.get({
				index: indexP,
				type: '_doc',
				id: idP
			});
		} catch (err) {
			throw new HttpException(err, 400);
		}
	}

	async searchByQuery(type: string, query: any[], page: number = 0) {
		try {
			let ranges = [];
			const filterLocation = [];
			const filtert = query
				.map(([key, value]) => {
					if (key === 'ranges') {
						ranges = value;
						return null;
					} else if (key === 'rangeMust') {
						return { range: value };
					} else if (key === 'locationFilter') {
						filterLocation.push(value);
						return null;
					} else if (key === 'topRatedProviders') {
						return value;
					} else if (key === 'verifiedProvider') {
						return value;
					} else if (key === 'securePayment') {
						return value;
					} else if (key === 'terms') {
						return { [key]: value };
					} else {
						return { match: { [key]: value } };
					}
				})
				.filter(value => !!value);

			const size = 10;
			const bodyC = {
				size,
				from: page * size,
				query: {
					bool: {
						must: filtert,
						should: ranges,
						filter: filterLocation
					}
				}
			};

			return await this.esclient.search({
				index: 'categories',
				body: bodyC
			});
		} catch (err) {
			throw new HttpException(err, 400);
		}
	}

	public async normaleearch(index: string, query: any, page: number = 0, sort = []) {
		try {
			const size = 10;
			return await this.esclient.search({
				index,
				type: '_doc',
				body: {
					from: page * size,
					size,
					sort,
					query
				}
			});
		} catch (err) {
			throw new HttpException(err, 400);
		}
	}

	async insert(index: string, dataToStore: any, id) {
		return await this.esclient.index({
			id,
			index,
			type: '_doc',
			body: dataToStore
		});
	}
}
