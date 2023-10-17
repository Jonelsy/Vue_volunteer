import { Test, TestingModule } from '@nestjs/testing';
import { MitController } from './mit.controller';

describe('MitController', () => {
  let controller: MitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MitController],
    }).compile();

    controller = module.get<MitController>(MitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
