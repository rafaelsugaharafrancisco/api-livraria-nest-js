import { Livro } from './livro.model';
import { LivroService } from './livro.service';

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

@Controller('livros')
export class LivrosController { 

    constructor(private livroService: LivroService){}

    @Get()
    public async obterTodos(): Promise<Array<Livro>> {
        return this.livroService.obterLivros();
    }

    @Get(':id')
    public async obterUm(@Param() params): Promise<Livro> {
        return this.livroService.obterUmLivro(params.id);
    }

    @Post()
    public async criar(@Body() livro: Livro) {
        this.livroService.criarLivro(livro);
    }

    @Put(':id')
    public async alterar(@Body() livro, @Param() param): Promise<[number, Array<Livro>]> {
        return this.livroService.alterarLivro(livro);
    }

    @Delete(':id')
    @HttpCode(204)
    public async remover(@Param() param) {
        this.livroService.removerLivro(param.id);
    }
}