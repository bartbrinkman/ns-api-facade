import { Test, TestingModule } from '@nestjs/testing';
import { NsService } from './ns.service';

describe('NsService', () => {
  let service: NsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NsService],
    }).compile();

    service = module.get<NsService>(NsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
