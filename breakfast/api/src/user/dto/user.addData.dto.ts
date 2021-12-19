import { IsDate, IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserAddDataValidator {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    firstName: string;
  
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
    @IsDateString()
    birthDate: string;// dd-mm-yyyy 11-12-2021
  }
  