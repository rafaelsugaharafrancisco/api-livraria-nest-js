import { Livro } from './livro.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LivroService {

    constructor(
        @InjectModel(Livro)
        private livroModel: typeof Livro
    ){}

    public async obterLivros(): Promise<Array<Livro>> {
        return this.livroModel.findAll();
    }

    public async obterUmLivro(id: number): Promise<Livro> {
        return this.livroModel.findByPk(id);
    }

    public async criarLivro(livro: Livro) {
        this.livroModel.create(livro);
    }

    public async  alterarLivro(livro: Livro): Promise<[number, Array<Livro>]> {
        return this.livroModel.update(livro, {
            where: { id: livro.id }
        });
    }

    public async removerLivro(id: number) {
        const livro = await this.obterUmLivro(id);
        livro.destroy();
    }
}