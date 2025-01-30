import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
        const pokemon = await this.pokemonModel.create(createPokemonDto);
        return pokemon;
    }
    catch (error){
         this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
     
    let pokemon: Pokemon | null = null; ;

    if(!isNaN(+term)) {
       pokemon = await this.pokemonModel.findOne({no: term});
    }

    if(!pokemon && isValidObjectId(term))
    {
      pokemon = await this.pokemonModel.findById(term);
    }
    //Name
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase().trim()});
    }


    if(!pokemon) throw new NotFoundException(`Pokemon with id,name or no "${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    console.log(updatePokemonDto.name);

    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try{
        await pokemon.updateOne(updatePokemonDto);
    }catch (error){
      this.handleException(error);
    }

    return {...pokemon.toJSON(),...updatePokemonDto};
  } 

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //return {id};
    //const result = await this.pokemonModel.findByIdAndDelete(id);

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    
    if(deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    
    return;
  }


  private handleException(error:any)
  {
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon ya existe en la base de datos ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Pokemon no se puede crear - Revisar logs del Servidor`);
  }
}
