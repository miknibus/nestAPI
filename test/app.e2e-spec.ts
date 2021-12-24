import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Pokemon API');
  });

  describe('/pokemon', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/pokemon')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/pokemon')
        .send({ name: 'Test', dex: 999, moves: ['test'] })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/pokemon')
        .send({ name: 'Test', dex: 999, moves: ['test'], other: 'bad request' })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/pokemon').expect(404);
    });
  });

  describe('/pokemon/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/pokemon/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/pokemon/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/pokemon/1')
        .send({ name: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/pokemon/1').expect(200);
    });
  });
});
