import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from '../card.controller';
import { CardService } from '../card.service';

describe('CardService', () => {
  let service: CardService;

  const mockCardRepository = {
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
      .useValue(mockCardRepository)
      .compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a card', async () => {
    expect(
      await service.create({
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
