import { IsString } from 'class-validator'


export class IdeaDTO {  // Data transfer object
    @IsString()
    idea: string;

    @IsString()
    description: string;
}