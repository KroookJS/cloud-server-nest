import { ApiProperty } from "@nestjs/swagger";

// Тут мы описываем какеи свойства мы ожидаем от фронта!!!
export class CreateUserDto {
    @ApiProperty({
        default: "bos"
    })
    fullname: string;
    
    @ApiProperty({
        default: "bos@mail.com"
    })
    email: string;
    @ApiProperty({
        default: '12345'
    })
    password: string
}
