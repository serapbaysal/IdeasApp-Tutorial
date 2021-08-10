import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {

    private logger = new Logger('IdeaController');

    constructor(private ideaService: IdeaService) { }


    @Get()
    showAllIdeas() {
        return this.ideaService.showAll();
    }


    @Post()
    @UsePipes(new ValidationPipe())
    createIdea(@Body() data: IdeaDTO) {
        this.logger.log(JSON.stringify(data))
        return this.ideaService.create(data);
    }


    @Get(':id')
    readIdea(@Param('id') id: string) {
        return this.ideaService.read(id);
    }


    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
        this.logger.log(JSON.stringify(data))
        return this.ideaService.update(id, data);
    }


    @Delete(':id')
    destroyIdea(@Param('id') id: string) {
        return this.ideaService.destroy(id)

    }
}
