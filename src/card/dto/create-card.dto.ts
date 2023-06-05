import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'The name is used to display on your card.',
    example: 'Pedro Rezende',
  })
  @Length(3, 255)
  readonly name: string;

  @ApiProperty({
    description:
      'The job is your title and must be filled in to be displayed on your card.',
    example: 'Fullstack Developer',
  })
  @Length(3, 55)
  readonly job: string;

  @ApiProperty({
    description:
      'The phone is your main contact when accessed by phone, provide a valid number.',
    example: '+351 914 188 624',
  })
  @Length(3, 46)
  readonly phone: string;

  @ApiProperty({
    description:
      'Email is your primary contact when accessed from tablets or desktops, please provide a valid email address.',
    example: 'pedro.rezende@yourcompany.com',
  })
  @IsEmail()
  @Length(5, 55)
  readonly email: string;

  @ApiProperty({
    description: 'This field must contain the link to your linkedin profile.',
    example: 'https://www.linkedin.com/in/pedrohmrezende',
  })
  @Length(13, 255)
  @IsOptional()
  readonly linkedin?: string;

  @ApiProperty({
    description:
      'This field must contain a link to your portfolio or company website.',
    example: 'https://github.com/iPedroMR',
  })
  @Length(3, 255)
  @IsOptional()
  readonly site?: string;
}
