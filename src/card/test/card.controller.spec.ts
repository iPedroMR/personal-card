import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from '../card.controller';
import { CardService } from '../card.service';

describe('CardController', () => {
  let controller: CardController;

  const mockCardService = {
    create: jest.fn((dto) =>
      Promise.resolve({
        _id: Date.now().toString(),
        ...dto,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [CardService],
    })
      .overrideProvider(CardService)
      .useValue(mockCardService)
      .compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    expect(
      await controller.create({
        name: 'Pedro Rezende',
        job: 'Fullstack Developer',
        phone: '+351 914 188 624',
        email: 'pedro.rezende@yourcompany.com',
      }),
    ).toEqual({
      _id: expect.any(String),
      name: 'Pedro Rezende',
      job: 'Fullstack Developer',
      phone: '+351 914 188 624',
      email: 'pedro.rezende@yourcompany.com',
    });
  });
});
