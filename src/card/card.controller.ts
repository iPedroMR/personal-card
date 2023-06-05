import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './schemas/card.schema';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly cardsService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.create(createCardDto);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cardsService.delete(id);
  }
}
