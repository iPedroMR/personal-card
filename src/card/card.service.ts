import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './schemas/card.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = await this.cardModel.create(createCardDto);
    return createdCard;
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async findOne(id: string): Promise<Card> {
    return this.cardModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCard = await this.cardModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCard;
  }
}
