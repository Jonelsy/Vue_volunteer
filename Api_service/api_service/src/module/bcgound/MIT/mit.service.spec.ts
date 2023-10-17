import { Test, TestingModule } from '@nestjs/testing';
import { MitService } from './mit.service';

describe('MitService', () => {
  let service: MitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MitService],
    }).compile();

    service = module.get<MitService>(MitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
