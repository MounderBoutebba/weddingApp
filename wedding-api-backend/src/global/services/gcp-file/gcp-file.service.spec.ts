import { Test, TestingModule } from '@nestjs/testing';
import { GcpFileService } from './gcp-file.service';

describe('GcpFileService', () => {
  let service: GcpFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcpFileService],
    }).compile();

    service = module.get<GcpFileService>(GcpFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
