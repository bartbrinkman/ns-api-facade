import { Test, TestingModule } from '@nestjs/testing';
import { NsController } from './ns.controller';

describe('NsController', () => {
  let controller: NsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NsController],
    }).compile();

    controller = module.get<NsController>(NsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
