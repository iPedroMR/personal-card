import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'mongoose';

import { DatabaseService } from './../src/database/database.service';
import { CreateCardDto } from './../src/card/dto/create-card.dto';
import { Card } from './../src/card/schemas/card.schema';
import { AppModule } from './../src/app.module';

const cardStub = (): Card => {
  return {
    name: 'Pedro Rezende',
    job: 'Fullstack Developer',
    phone: '+351 914 188 624',
    email: 'pedro.rezende@yourcompany.com',
    linkedin: 'https://www.linkedin.com/in/pedrohmrezende',
    site: 'https://github.com/iPedroMR',
  };
};

describe('CardController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  afterAll(async () => {
    await dbConnection.close();
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('cards').deleteMany({});
  });

  describe('List Cards', () => {
    it('should return an array of cards', async () => {
      await dbConnection.collection('cards').insertOne(cardStub());
      const response = await request(app.getHttpServer()).get('/card');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([cardStub()]);
    });
  });

  describe('Create Card', () => {
    it('should create a card', async () => {
      const createCardDto: CreateCardDto = cardStub();
      const response = await request(app.getHttpServer())
        .post('/card')
        .send(createCardDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createCardDto);

      const card = await dbConnection
        .collection('cards')
        .findOne({ email: createCardDto.email });
      expect(card).toMatchObject(createCardDto);
    });

    it('400 on validation email error', async () => {
      const invalidEmailCard: Card = {
        name: 'Pedro Rezende',
        job: 'Fullstack Developer',
        phone: '+351 914 188 624',
        email: 'invalid_email.com',
      };

      await request(app.getHttpServer())
        .post('/card')
        .send(invalidEmailCard)
        .expect(400, {
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        });
    });
  });

  describe('Delete Card', () => {
    it('should delete a card', async () => {
      const createCardDto: CreateCardDto = cardStub();
      const response = await request(app.getHttpServer())
        .post('/card')
        .send(createCardDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createCardDto);

      const deletedCard = await request(app.getHttpServer()).delete(
        '/card/' + response.body._id,
      );
      expect(deletedCard.status).toBe(200);
      expect(response.body).toMatchObject(createCardDto);
    });
  });
});
