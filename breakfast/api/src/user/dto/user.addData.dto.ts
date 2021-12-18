import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserAddDataValidator {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(0)
    @MaxLength(1200)
    birthDate: string;// dd-mm-yyyy
  }
  